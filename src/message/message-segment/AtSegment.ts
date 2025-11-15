import type { anyobject } from "@ceale/util"
import { MessageSegment, MessageSegmentType } from "../MessageSegment"


export class AtSegment extends MessageSegment {

    override type = MessageSegmentType.AT

    constructor(public target: (string & {}) | "all") {
        super()
    }

    static fromJSON(obj: anyobject) {
        return new AtSegment(obj.target)
    }

    toJSON() {
        return {
            type: "at",
            data: {
                qq: this.target
            }
        }
    }
}
