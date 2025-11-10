import type { Logger } from "../util/Logger"
import type { NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"
import { Message } from "./Message"
import { MessageEvent, Source, Target, SourceType } from "./MessageEvent"
import * as MessageSegment from "./MessageSegment"

export interface MessageEventOption {
    once?: boolean
    at?: boolean
    type?: SourceType
    filter?: {
        groupId?: number[]
        userId?: number[]
    }
}

/**
 * 旧版消息功能适配器，完整移植原有功能
 */
export class LegacyMessageAdapter {
    public sessionList = new Set<Source>()

    constructor(
        private client: NapCatClient,
        private logger: Logger,
        private debug: any
    ) {}

    @BindThis
    public async sendMessage(target: Target, message: Message | string): Promise<number> {
        const messageObj = (() => {
            if (typeof message === "string") {
                return new Message(new MessageSegment.Text(message))
            }
            return message
        })()

        if (target.type === SourceType.Group) {
            const result = await this.client.sendAction("send_group_msg", {
                group_id: target.groupId,
                message: messageObj.toJSON()
            })
            return result?.message_id
        } else {
            const result = await this.client.sendAction("send_private_msg", {
                user_id: target.userId,
                message: messageObj.toJSON()
            })
            return result?.message_id
        }
    }

    @BindThis
    public onMessage(callback: (event: MessageEvent) => void, options?: MessageEventOption) {
        const handle = (eventData: any) => {
            const messageEvent = new MessageEvent(eventData, this.client)

            // 会话去重
            for (const source of this.sessionList) {
                if (messageEvent.source.equals(source)) return
            }

            // 实现 options: at
            if (options?.at === true) {
                const at = messageEvent.message.getSegment(1)
                if (at === undefined) return
                if (!at.isAt() || (at as any).target !== this.client.Self.selfInfo?.user_id) return
            }

            // 实现 options: type
            if (options?.type !== undefined && options.type !== messageEvent.source.type) return

            // 实现 options: filter
            if (options?.filter !== undefined) {
                if (options.filter?.groupId !== undefined && !options.filter.groupId.includes(messageEvent.source.groupId!)) return
                if (options.filter?.userId !== undefined && !options.filter.userId.includes(messageEvent.source.userId)) return
            }

            callback(messageEvent)

            // 实现 options: once
            if (options?.once === true) this.client.offEvent("message", handle)
        }

        this.client.onEvent("message", handle)
    }

    // 便捷方法
    @BindThis
    public async sendPrivateMessage(userId: number, message: Message | string): Promise<number> {
        return this.sendMessage(new Target(SourceType.Private, userId), message)
    }

    @BindThis
    public async sendGroupMessage(groupId: number, message: Message | string): Promise<number> {
        return this.sendMessage(new Target(SourceType.Group, groupId), message)
    }
}