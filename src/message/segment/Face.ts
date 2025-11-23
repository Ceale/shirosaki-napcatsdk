import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Face extends MessageSegment {

    constructor(public id: string, public rawData: anyobject = {}) {
        super()
    }

    toJSON() {
        return {
            type: "face",
            data: {
                ...this.rawData,
                id: this.id
            }
        }
    }

    static fromJSON(json: anyobject) {
        const obj = new this(json?.data?.id ?? "0", json?.data ?? {})
        return obj
    }
}
