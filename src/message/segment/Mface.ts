import type { anyobject } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"
import { randomBytes } from "node:crypto"

export class Mface extends MessageSegment {

    public key: string = randomBytes(8).toString("hex")
    public url?: string
    
    constructor(
        public emojiId: string,
        public emojiPackageId: string,
        public summary?: string
    ) {
        super()
    }
    
    static fromJSON(json: anyobject) {
        const obj = new this(
            json?.data?.emoji_package_id ?? "0",
            json?.data?.emoji_id ?? "0",
            json?.data?.summary ?? undefined
        )
        obj.key = json?.data?.key ?? obj.key
        obj.url = json?.data?.url ?? obj.url
        return obj
    }

    toJSON() {
        return {
            type: "mface",
            data: {
                emoji_package_id: this.emojiPackageId,
                emoji_id: this.emojiId,
                key: this.key,
                summary: this.summary ?? undefined,
            }
        }
    }
    
    clone() {
        const obj = new Mface(
            this.emojiPackageId,
            this.emojiId,
            this.summary
        )
        obj.key = this.key
        return obj
    }

    equals(other: Mface) {
        return this.emojiPackageId === other?.emojiPackageId
            && this.emojiId === other?.emojiId
    }
}
