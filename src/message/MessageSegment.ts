import { defineEnum, type anyobject, type EnumKeys } from "@ceale/util"
import { AtSegment } from "./message-segment/AtSegment"
import { TextSegment } from "./message-segment/TextSegment"

export const MessageSegmentType = defineEnum(
    "TEXT",
    "AT",
    "REPLY",
    "FACE",
    "STICKER"
)

export type MessageSegmentType = EnumKeys<typeof MessageSegmentType>

export abstract class MessageSegment {
    abstract type: MessageSegmentType
    abstract toJSON(): anyobject
}