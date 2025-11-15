import type { anyobject } from "@ceale/util"
import { MessageSegment, MessageSegmentType } from "../MessageSegment"


export class StickerSegment extends MessageSegment {

    override type = MessageSegmentType.STICKER

    constructor(public data: string) {
        super()
    }

    toJSON() {
        return {
            type: "image",
            data: {
                file: "https://ceale.moe/assets/icon-COygE_Qg.png",
                sub_type: 1
            }
        }
    }

    static fromJSON(obj: anyobject) {
        return new this(obj?.data?.id)
    }
}
