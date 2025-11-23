import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Dice extends MessageSegment {

    constructor(public state?: 1|2|3|4|5|6) {
        super()
    }
    
    static fromJSON(json: anyobject) {
        const obj = new this(json?.data?.result ?? undefined)
        return obj
    }

    toJSON() {
        return {
            type: "dice",
            data: {
                result: this.state
            }
        }
    }

    clone() {
        return new Dice(this.state)
    }
}
