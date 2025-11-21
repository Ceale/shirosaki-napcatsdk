import type { anyobject } from "@ceale/util"
import { MessageBuilder } from "./MessageBuilder"
import { MessageSegment, MessageSegmentType } from "./MessageSegment"
import { TextSegment } from "./message-segment/TextSegment"
import { AtSegment } from "./message-segment/AtSegment"
import { FaceSegment } from "./message-segment/FaceSegment"
import { ReplySegment } from "./message-segment/ReplySegment"
import { StickerSegment } from "./message-segment/StickerSegment"

export const MessageSegmentMap = {
    "text": TextSegment,
    "at": AtSegment,
    "reply": ReplySegment,
    "face": FaceSegment,
    "sticker": StickerSegment
}


export class Message {

    static builder(): MessageBuilder {
        return new MessageBuilder()
    }

    static create(text: string): Message;
    static create(...segments: MessageSegment[]): Message;
    static create(param1: string | MessageSegment, ...params: MessageSegment[]): Message {
        return (typeof param1 === "string")
            ? new Message([new TextSegment(param1)])
            : new Message([param1, ...params])
    }

    static fromJSON(json: anyobject[] | string): Message {
        if (typeof json === "string") {
            return new Message([new TextSegment(json)])
        }
        if (!Array.isArray(json)) {
            throw new TypeError("jsonSegments must be an array or string")
        }
        const a = json
            .map(segment => {
                const SegmentClass = MessageSegmentMap[segment?.type?.toUpperCase() as keyof typeof MessageSegmentMap]
                if (!SegmentClass) return null
                return SegmentClass.fromJSON(segment)
            })
            .filter(segment => segment !== null)
        return new Message(a)
    }
    
    private segments: MessageSegment[] = []

    constructor(segments: MessageSegment[]) {
        this.segments = segments
    }

    toJSON() {
        return this.segments.map(segment => segment.toJSON())
    }

    // getSegments(): MessageSegment[] {
    //     return this.segments
    // }

    getSegment(index: number): MessageSegment | null {
        return this.segments[index] ?? null
    }
}