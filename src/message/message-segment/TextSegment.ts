import type { anyobject } from "@ceale/util"
import { MessageSegment, MessageSegmentType } from "../MessageSegment"


export class TextSegment extends MessageSegment {

    override type = MessageSegmentType.TEXT

    constructor(public text: string) {
        super()
    }

    toJSON() {
        return {
            type: "text",
            data: {
                text: this.text
            }
        }
    }

    static fromJSON(obj: anyobject) {
        return new this(obj?.data?.text)
    }
}
