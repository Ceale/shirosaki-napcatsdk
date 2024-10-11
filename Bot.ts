import { WebSocket } from "ws"
import Logger from "./Log.ts"
import { wait } from "./Util.ts"
import { Message } from "./Message.ts"
import { MessageSegmentType } from "./MessageSegment.ts"
import { error, log } from "node:console"

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

export class Souce {
    // type: SouceType
    // groupId?: number
    // userId: number

    constructor(
        // type, userId, groupId?
        public type: SouceType,
        public userId: number,
        public groupId?: number
    ) {
    }

    equal(souce: Souce) {
        if (
            souce.type !== this.type
            || souce.userId !== this.userId
            || souce.groupId !== this.groupId
        ) return false
        return true
    }
}

export class MessageEvent {
    timestamp: number
    selfId: number
    
    souce: Souce
    
    messageid: number
    message: Message
    rawMessage: string
    
    sender: Sender
    
    session: Session

    constructor(event) {
        this.timestamp = event.timestamp
        this.selfId = event.self_id
        this.souce = new Souce(event.post_type, event.user_id, event.group_id)
        
        this.messageid = event.message_id,
        this.rawMessage = event.raw_message,
        this.message = Message.fromJSON(event.message),

        this.sender = new Sender(event.user_id, event.sender)
    }
}

class Session {
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
    private connect: WebSocket

    public constructor(url, debug = true) {
        this.eventListenerList.set(EventType.Message, new Set())
        this.eventListenerList.set(EventType.Notice, new Set())
        this.eventListenerList.set(EventType.Request, new Set())
        this.eventListenerList.set(EventType.Meta, new Set())

        this.initializeConnection(url, debug)
    }

    private initializeConnection(url, debug) {
        this.connect = new WebSocket(url)
        this.connect.on("error", err => {
            error("WebSocket Error:", err)
        })

        this.connect.on("open", () => {
            logger.info("连接中...")
        })
        
        this.connect.on("message", rawData => {
            const data = JSON.parse(rawData.toString())
            if ("post_type" in data) {
                this.handleEvent(data)
            } else {
                this.handleResponse(data)
            }
            if (debug === true) logger.debug("接受数据："+rawData.toString())
        })

        this.connect.on("close", async () => {
            logger.info("连接已断开，5秒后重连")
            await wait(5000)
            this.initializeConnection(url, debug)
        })
    }

    private eventListenerList = new Map<EventType, Set<EventCallback<any>>>()

    public onEvent(eventType: EventType, callback: EventCallback<any>/*, options: EventOptions*/) {
        let listenerList = this.eventListenerList.get(eventType)
        listenerList!.add(callback)
    }

    // public onceEvent(eventType: EventType, callback: EventCallback<any>) {
    //     const handle = (eventData) => {
    //         callback(eventData)
    //         this.offEvent(eventType, handle)
    //     }
    //     this.onEvent(eventType, handle)
    // }

    private handleEvent(event: any) {
        if (event.post_type === "message") {
            this.eventListenerList.get(EventType.Message)!.forEach(callback=>callback(event))
        }
        if (event.post_type === "notice") {
            this.eventListenerList.get(EventType.Notice)!.forEach(callback=>callback(event))
        }
        if (event.post_type === "request") {
            this.eventListenerList.get(EventType.Request)!.forEach(callback=>callback(event))
        }
        if (event.post_type === "meta_event") {
            this.eventListenerList.get(EventType.Meta)!.forEach(callback=>callback(event))
        }
    }

    public offEvent(eventType: EventType, callback: EventCallback<any>) {
        let listenerList = this.eventListenerList.get(eventType)
        listenerList!.delete(callback)
    }

    requestsList = new Map()
    
    public send(action, params) {
        return new Promise((resolve, reject) => {
            const requestId = Math.floor(Math.random()*100000000).toString().padStart(8, "0")
            this.requestsList.set(requestId, { resolve, reject })
            this.connect.send(Buffer.from(JSON.stringify({
                action: action,
                params: params,
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

    public onMessage(callback: EventCallback<MessageEvent>, options?: {
        once?: boolean,
        at?: boolean,
        type?: SouceType
    }) {
        const handle = (eventData) => {
            const messageEvent = new MessageEvent(eventData)

            // 实现options: at
            if (options?.at === true) {
                const at = messageEvent.message.getSegment(1)
                if (at === undefined) return
                if (at.Type !== MessageSegmentType.At || at.qq !== messageEvent.selfId.toString()) return
            }

            callback(messageEvent)

            // 实现options: once
            if (options?.once === true) this.offEvent(EventType.Message, handle)
        }
        this.onEvent(EventType.Message, handle)
    }
}