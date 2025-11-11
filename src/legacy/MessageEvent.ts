// @ts-nocheck

import type { NapCatClient } from "../NapCatClient"
import { Message } from "./Message"

export class Sender {
    id: number
    name: string
    sex: "male" | "female" | undefined
    age: number | undefined
    nickname: string | undefined
    level: string | undefined
    title: string | undefined
    role: "owner" | "admin" | "member" | undefined
    constructor(id: number, sender: any) {
        this.id = id
        this.name = sender.nickname
        this.nickname = sender.card || sender.nickname
        this.sex = (() => {
            if (sender.sex === "unknown") return undefined
            return sender.sex
        })()
        this.age = sender.age
        this.level = sender.level
        this.role = sender.role
        this.title = sender.title
    }
}

export enum SourceType {
    Group = "group",
    Private = "private"
}

export class Target {
    type: SourceType
    userId: number | undefined = undefined;
    groupId: number | undefined = undefined;

    constructor(source: Source)
    constructor(type: SourceType, id: number)
    constructor(...args: any[]) {
        if (args.length === 1) {
            const source: Source = args[0]
            this.type = source.type
            this.groupId = source.groupId
            this.userId = source.userId
        } else {
            const type: SourceType = args[0]
            const id: number = args[1]
            this.type = type
            if (type === SourceType.Group) {
                this.groupId = id
            } else {
                this.userId = id
            }
        }
    }
}

export class Source {
    type: SourceType
    groupId?: number
    userId: number

    constructor(type: SourceType, userId: number, groupId?: number) {
        this.type = type
        this.userId = userId
        this.groupId = groupId
    }

    equals(source: Source) {
        if (source.type !== this.type
            || source.userId !== this.userId
            || source.groupId !== this.groupId) return false
        return true
    }
}

export class MessageEvent {
    public timestamp: number
    public source: Source
    public messageId: number
    public message: Message
    public sender: Sender
    public session: Session

    constructor(event: any, client: NapCatClient) {
        this.timestamp = event.timestamp
        this.source = new Source(event.message_type, event.user_id, event.group_id)
        this.messageId = event.message_id
        this.message = Message.fromJSON(event.message)
        this.sender = new Sender(event.user_id, event.sender)
        this.session = new Session(this.source, client)
    }
}

export class Session {
    private client: NapCatClient
    private source: Source
    private target: Target

    constructor(source: Source, client: NapCatClient) {
        this.client = client
        this.source = source
        this.target = new Target(this.source)
    }

    async reply(message: Message | string) {
        return await this.client.LegacyMessage.sendMessage(this.target, message)
    }

    waitAnswer(timeout: number): Promise<{ message: Message; messageId: number}  | null> {
        return new Promise((resolve) => {
            this.client.LegacyMessage.sessionList.add(this.source)
            const handle = (event: any) => {
                const messageEvent = new MessageEvent(event, this.client)
                if (this.source.equals(messageEvent.source)) {
                    this.client.LegacyMessage.sessionList.delete(this.source)
                    this.client.offEvent("message", handle)
                    resolve({ message: messageEvent.message, messageId: messageEvent.messageId })
                }
            }
            this.client.onEvent("message", handle)
            setTimeout(() => {
                this.client.LegacyMessage.sessionList.delete(this.source)
                this.client.offEvent("message", handle)
                resolve(null)
            }, timeout)
        })
    }

    async inquire(message: Message | string, timeout: number) {
        const inquireId = await this.reply(message)
        const answer = await this.waitAnswer(timeout)
        return {
            inquireId,
            answer
        }
    }
}