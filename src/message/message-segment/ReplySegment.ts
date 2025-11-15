import type { anyobject } from "@ceale/util"
import { MessageSegment, MessageSegmentType } from "../MessageSegment"


export class ReplySegment extends MessageSegment {

    override type = MessageSegmentType.REPLY

    constructor(public id: string) {
        super()
    }

    toJSON() {
        return {
            type: "reply",
            data: {
                id: this.id
            }
        }
    }

    static fromJSON(obj: anyobject) {
        return new this(obj?.data?.id)
    }
}
