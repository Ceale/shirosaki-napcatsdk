import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Reply extends MessageSegment {

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
        return new this(obj?.data?.id ?? "0")
    }

    clone() {
        return new Reply(this.id)
    }

    equals(other: Reply) {
        return this.id === other.id
    }
}
