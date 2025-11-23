import type { anyobject } from "@ceale/util"


export abstract class MessageSegment {
    abstract toJSON(): anyobject
}
