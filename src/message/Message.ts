import type { anyobject } from "@ceale/util"
import { MessageBuilder } from "./MessageBuilder"
import { Segment } from "./Segment"
import { MessageSegment } from "./MessageSegment"
import { Text } from "./segment/Text"


export class Message {

    static builder(): MessageBuilder {
        return new MessageBuilder()
    }

    static create(text: string): Message;
    static create(...segments: MessageSegment[]): Message;
    static create(param1: string | MessageSegment, ...params: MessageSegment[]): Message {
        return (typeof param1 === "string")
            ? new Message([new Text(param1)])
            : new Message([param1, ...params])
    }

    static fromJSON(json: anyobject[] | string): Message {
        if (typeof json === "string") {
            return new Message([new Text(json)])
        }
        if (!Array.isArray(json)) {
            throw new TypeError("消息段必须是 array 或 string")
        }
        const segments = json
            .map(segment => Segment.fromJSON(segment))
            .filter(segment => segment !== undefined)
        return new Message(segments)
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