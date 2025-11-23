import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Poke extends MessageSegment {

    constructor(
        public type: string,
        public id: string
    ) {
        super()
    }

    toJSON() {
        return {
            type: "poke",
            data: {
                type: this.type,
                id: this.id
            }
        }
    }

    static fromJSON(obj: anyobject) {
        return new this(
            obj?.data?.type ?? "",
            obj?.data?.id ?? ""
        )
    }

    clone() {
        return new Poke(this.type, this.id)
    }
}
