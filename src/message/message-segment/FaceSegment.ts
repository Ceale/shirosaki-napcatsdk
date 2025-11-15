import type { anyobject } from "@ceale/util"
import { MessageSegment, MessageSegmentType } from "../MessageSegment"


export class FaceSegment extends MessageSegment {

    override type = MessageSegmentType.FACE

    constructor(public id: string) {
        super()
    }

    toJSON() {
        return {
            type: "face",
            data: {
                id: this.id
            }
        }
    }

    static fromJSON(obj: anyobject) {
        return new this(obj?.data?.id)
    }
}
