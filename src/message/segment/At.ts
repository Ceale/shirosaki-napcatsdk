import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class At extends MessageSegment {

    public target: string

    constructor(target: string&{} | number | "all") {
        super()
        this.target = String(target)
    }

    static fromJSON(obj: anyobject) {
        return new this(obj?.data?.qq ?? 0)
    }

    toJSON() {
        return {
            type: "at",
            data: {
                qq: this.target
            }
        }
    }

    clone() {
        return new At(this.target)
    }

    equals(other: At) {
        return this.target === other.target
    }
}
