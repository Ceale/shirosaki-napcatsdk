import type { anyobject } from "@ceale/util"


export abstract class MessageSegment {
    constructor(...params: any[]) {}
    abstract toJSON(): anyobject
    abstract clone(): MessageSegment
    abstract equals(other: MessageSegment): boolean
}
