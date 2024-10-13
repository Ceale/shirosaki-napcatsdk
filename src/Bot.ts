import { WebSocket } from "ws"
import Logger from "./Log"
import { generateRandomHex, wait } from "./Util"
import { Message } from "./Message"
import { At, MessageSegmentType, Text } from "./MessageSegment"
import { error, log } from "node:console"
import { Target, SouceType, Source, MessageEvent } from "./MessageEvent"

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

// export class NoticeEventData {
//     constructor() {
        
//     }
//     timestamp: number
//     selfid: number

// }

// export class RequestEventData {
//     constructor() {
        
//     }
//     timestamp: number
//     selfid: number

// }

// export class MetaEventData {
//     timestamp: number
//     selfid: number

// }

export class OneBot {
    private options: {
        url: string,
        debug: boolean
        retryInterval: number
    }
    private connection: WebSocket | null = null

    private id: number | undefined
    private name: string | undefined
    public getBotInfo() {
        if (this.connection === null) throw new Error("当前未连接")
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
        if (this.connection !== null) throw new Error("当前已连接")
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
        if (this.connection === null) throw new Error("当前未连接")
        return new Promise(resolve => {
            if (this.connection === null) return
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
    
    public callApi(action: string, params?: object): Promise<any> {
        if (this.connection === null) throw new Error("当前未连接")
        return new Promise((resolve, reject) => {
            const requestId = generateRandomHex(8)
            this.requestsList.set(requestId, { resolve, reject })
            this.connection!.send(Buffer.from(JSON.stringify({
                action: action,
                params: params || {},
                echo: requestId
            })))
        })
    }

    private handleResponse(response: any) {
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
        const handle = (eventData: any) => {
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