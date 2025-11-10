import type { Logger } from "src/util/Logger"
import type { NapCatClient } from "src/NapCatClient"
import { BindThis } from "src/util/AutoBind"

// 移植旧版类型
enum SourceType {
  Private = "private",
  Group = "group"
}

class Source {
  constructor(
    public type: SourceType,
    public userId: number,
    public groupId?: number
  ) {}

  equals(other: Source): boolean {
    return this.type === other.type && 
           this.userId === other.userId && 
           this.groupId === other.groupId
  }
}

class Target {
  constructor(
    public type: SourceType,
    public userId?: number,
    public groupId?: number
  ) {}
}

class MessageEvent {
  constructor(
    public rawData: any,
    public bot: any
  ) {}

  get source(): Source {
    const data = this.rawData
    if (data.message_type === "private") {
      return new Source(SourceType.Private, data.user_id)
    } else {
      return new Source(SourceType.Group, data.user_id, data.group_id)
    }
  }

  get message(): any {
    return this.rawData.message
  }
}

interface MessageEventOption {
  once?: boolean
  at?: boolean
  type?: SourceType
  filter?: {
    groupId?: number[]
    userId?: number[]
  }
}

/**
 * 旧版消息功能的适配器，用于兼容旧代码
 * 新代码请使用 NCMessage
 */
export class LegacyMessageAdapter {
  private sessionList = new Set<Source>()

  constructor(
    private client: NapCatClient,
    private logger: Logger,
    private debug: any
  ) {}

  @BindThis
  public async sendMessage(target: Target, message: any | string): Promise<number> {
    const messageObj = typeof message === "string" ? message : message
    
    if (target.type === SourceType.Group) {
      const result = await this.client.sendAction("send_group_msg", {
        group_id: target.groupId,
        message: messageObj
      })
      return result?.message_id
    } else {
      const result = await this.client.sendAction("send_private_msg", {
        user_id: target.userId,
        message: messageObj
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
        // 这里需要根据实际的消息段实现调整
      }

      // 实现 options: type
      if (options?.type !== undefined && options.type !== messageEvent.source.type) {
        return
      }

      // 实现 options: filter
      if (options?.filter !== undefined) {
        if (options.filter?.groupId !== undefined && 
            !options.filter.groupId.includes(messageEvent.source.groupId!)) {
          return
        }
        if (options.filter?.userId !== undefined && 
            !options.filter.userId.includes(messageEvent.source.userId)) {
          return
        }
      }

      callback(messageEvent)

      // 实现 options: once
      if (options?.once === true) {
        this.client.offEvent("message", handle)
      }
    }

    this.client.onEvent("message", handle)
  }
}