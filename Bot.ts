import { WebSocket } from "ws"
import Logger from "./Log.ts"
import { generateRandomHex, wait } from "./Util.ts"
import { Message } from "./Message.ts"
import { At, MessageSegmentType, Text } from "./MessageSegment.ts"
import { error, log } from "node:console"

declare global {
    interface Array<T> {
        includes(value: any): boolean
    }
}
const logger = new Logger("bot")

export type EventCallback<EventData> = (eventData: EventData) => void

export enum EventType {
    Message = "message",
    Notice = "notice",
    Request = "request",
    Meta = "meta"
}

export class Sender {
    id: number
    name: string
    sex: "male"|"female"| undefined
    age: number | undefined
    nickname: string | undefined
    level: string | undefined
    title: string | undefined
    role: "owner"|"admin"|"member" | undefined
    constructor(id, sender) {
        this.id = id
        this.name = sender.nickname
        this.nickname = sender.card || sender.nickname
        this.sex = (()=>{
            if (sender.sex === "unknown") return undefined
            return sender.sex
        })()
        this.age = sender.age
        this.level = sender.level
        this.role = sender.role
        this.title = sender.title

    }
}

export enum SouceType {
    Group = "group",
    Private = "private"
}

export class Target {
    type: SouceType
    userId: number | undefined = undefined
    groupId: number | undefined = undefined

    constructor(souce: Source);
    constructor(type: SouceType, id: number);
    constructor(...args: any[]) {
        if (args.length === 1) {
            const souce: Source = args[0]
            this.type = souce.type
            this.groupId = souce.groupId
            this.userId = souce.userId
        } else {
            const type: SouceType = args[0]
            const id: number = args[1]
            this.type = type
            if (type === SouceType.Group) {
                this.groupId = id
            } else {
                this.userId = id
            }
        }
    }

    
}

export class Source {
    type: SouceType
    groupId?: number
    userId: number

    constructor(type, userId, groupId?) {
        this.type = type
        this.userId = userId
        this.groupId = groupId
    }

    equals(souce: Source) {
        if (
            souce.type !== this.type
            || souce.userId !== this.userId
            || souce.groupId !== this.groupId
        ) return false
        return true
    }
}

export class MessageEvent {
    private bot: Bot

    public timestamp: number
    
    public source: Source
    
    public messageId: number
    public message: Message
    
    public sender: Sender
    
    public session: Session

    constructor(event, bot) {
        this.timestamp = event.timestamp
        this.source = new Source(event.message_type, event.user_id, event.group_id)
        
        this.messageId = event.message_id,
        this.message = Message.fromJSON(event.message),

        this.sender = new Sender(event.user_id, event.sender)
        this.session = new Session(this.source, bot)
    }
}

export class Session {
    
    private bot: Bot
    private source: Source
    private target: Target

    constructor(souce: Source, bot: Bot) {
        this.bot = bot
        this.source = souce
        this.target = new Target(this.source)
    }
    
    async reply(message: Message| string) {
        return await this.bot.sendMessage(this.target, message)
    }
    waitAnswer(timeout: number): Promise<{message: Message, messageId: number}|null> {
        return new Promise((resolve) => {
            this.bot.sessionList.add(this.source)
            const handle = (event) => {
                const messageEvent = new MessageEvent(event, this.bot)
                if (this.source.equals(messageEvent.source)) {
                    this.bot.sessionList.delete(this.source)
                    this.bot.offEvent(EventType.Message, handle)
                    resolve({message: messageEvent.message, messageId: messageEvent.messageId})
                }
            }
            this.bot.onEvent(EventType.Message, handle)
            setTimeout(() => {
                this.bot.sessionList.delete(this.source)
                this.bot.offEvent(EventType.Message, handle)
                resolve(null)
            }, timeout)
        })
    }
    async inquire(message: Message| string, timeout: number) {
        const inquireId = await this.reply(message)
        const answer = await this.waitAnswer(timeout)
        return {
            inquireId,
            answer
        }
    }
}

export class NoticeEventData {
    constructor() {
        
    }
    timestamp: number
    selfid: number

}

export class RequestEventData {
    constructor() {
        
    }
    timestamp: number
    selfid: number

}

export class MetaEventData {
    timestamp: number
    selfid: number

}

export default class Bot {
    private options: {
        url: string,
        debug: boolean
        retryInterval: number
    }
    private connection: WebSocket

    private id: number
    private name: string
    public getBotInfo() {
        return {
            id: this.id,
            name: this.name
        }
    }

    public constructor(options: {
        url: string,
        debug?: boolean
        retryInterval?: number
    }) {

        this.options = (()=>{
            return {
                url: options.url,
                debug: options.debug || false,
                retryInterval: options.retryInterval || 5000,
            }
        })()

        this.eventListenerList.set(EventType.Message, new Set())
        this.eventListenerList.set(EventType.Notice, new Set())
        this.eventListenerList.set(EventType.Request, new Set())
        this.eventListenerList.set(EventType.Meta, new Set())
    }

    public connect(): Promise<void> {
        this.initializeConnection()
        return new Promise(resolve => {
            this.onEvent(EventType.Meta, (event) => {
                if (event.meta_event_type === "lifecycle" && event.sub_type === "connect") {
                    logger.info("已连接")
                    resolve()
                    this.callApi("get_login_info").then((botInfo: any) => {
                        this.id = botInfo.user_id
                        this.name = botInfo.nickname
                    })
                    
                }
            })
        })
    }

    public disconnect(): Promise<void> {
        return new Promise(resolve => {
            const connection = this.connection
            this.connection = null
            connection.on("close", () => {
                resolve()
            })
            connection.close()
        })
    }

    private initializeConnection() {
        this.connection = new WebSocket(this.options.url)
        logger.info("连接中...")

        this.connection.on("error", err => {
            error("WebSocket Error:", err)
        })

        this.connection.on("message", rawData => {
            const data = JSON.parse(rawData.toString())
            if ("post_type" in data) {
                this.handleEvent(data)
            } else {
                this.handleResponse(data)
            }
            if (this.options.debug === true) logger.debug("接收数据："+rawData.toString())
        })

        this.connection.on("close", async () => {
            if (this.connection === null) {
                logger.info("连接已断开")
                return
            }
            logger.info(`连接已断开，将在${this.options.retryInterval}ms后重连`)
            await wait(this.options.retryInterval)
            this.initializeConnection()
        })
    }

    private eventListenerList = new Map<EventType, Set<EventCallback<any>>>()

    public onEvent(eventType: EventType, callback: EventCallback<any>/*, options: EventOptions*/) {
        let listenerList = this.eventListenerList.get(eventType)
        listenerList!.add(callback)
    }

    private handleEvent(event: any) {
        if (event.post_type === "message") {
            [...this.eventListenerList.get(EventType.Message)!].forEach(callback=>callback(event))
        }
        if (event.post_type === "notice") {
            [...this.eventListenerList.get(EventType.Notice)!].forEach(callback=>callback(event))
        }
        if (event.post_type === "request") {
            [...this.eventListenerList.get(EventType.Request)!].forEach(callback=>callback(event))
        }
        if (event.post_type === "meta_event") {
            [...this.eventListenerList.get(EventType.Meta)!].forEach(callback=>callback(event))
        }
    }

    public offEvent(eventType: EventType, callback: EventCallback<any>) {
        let listenerList = this.eventListenerList.get(eventType)
        listenerList!.delete(callback)
    }

    private requestsList = new Map()
    
    public callApi(action, params?): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestId = generateRandomHex(8)
            this.requestsList.set(requestId, { resolve, reject })
            this.connection.send(Buffer.from(JSON.stringify({
                action: action,
                params: params || {},
                echo: requestId
            })))
        })
    }

    private handleResponse(response) {
        const requestId = response.echo
        if (this.requestsList.has(requestId)) {
            const { resolve, reject } = this.requestsList.get(requestId)
            const data = response.data
            if (response.status === "ok") {
                resolve(data)
            } else {
                reject(data)
            }
            this.requestsList.delete(requestId)
        }
    }

    public async sendMessage(target: Target, message: Message|string): Promise<number> {
        message = (()=>{
            if (typeof message === "string") {
                return new Message(new Text(message))
            }
            return message
        })()
        if (target.type === SouceType.Group) {
            return (await this.callApi("send_group_msg", {
                group_id: target.groupId,
                message: message.toJSON()
            }))?.message_id
        } else {
            return (await this.callApi("send_private_msg", {
                user_id: target.userId,
                message: message.toJSON()
            }))?.message_id
        }
    }

    public sessionList = new Set<Source>()

    public onMessage(callback: EventCallback<MessageEvent>, options?: {
        once?: boolean,
        at?: boolean,
        type?: SouceType,
        filter?: {
            groupId?: number[],
            userId?: number[]
        }
    }) {
        const handle = (eventData) => {
            const messageEvent = new MessageEvent(eventData, this)

            for (const souce of this.sessionList) {
                if (messageEvent.source.equals(souce)) return
            }

            // 实现options: at
            if (options?.at === true) {
                const at = messageEvent.message.getSegment(1)
                if (at === undefined) return
                if (!at.isAt() || at.target !== this.getBotInfo().id) return
            }

            // 实现options: type
            if (options?.type !== undefined && options.type !== messageEvent.source.type) return

            // 实现options: filter
            if (options?.filter !== undefined) {
                if (options.filter?.groupId !== undefined && !options.filter.groupId.includes(messageEvent.source.groupId)) return
                if (options.filter?.userId !== undefined && !options.filter.userId.includes(messageEvent.source.userId)) return
            }

            callback(messageEvent)

            // 实现options: once
            if (options?.once === true) this.offEvent(EventType.Message, handle)
        }
        this.onEvent(EventType.Message, handle)
    }
}