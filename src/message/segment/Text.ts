import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Text extends MessageSegment {

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
        return new this(obj?.data?.text ?? "")
    }

    clone() {
        return new Text(this.text)
    }

    equals(other: Text) {
        return this.text === other?.text
    }
}
