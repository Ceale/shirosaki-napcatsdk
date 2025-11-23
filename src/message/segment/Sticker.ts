import { type anyobject, tryCatch } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Sticker extends MessageSegment { 
    
    constructor(
        public urlOrData: string | Buffer,
        public summary?: string
    ) {
        super()
    }
    
    static fromJSON(json: anyobject) {
        return new this(
            json?.data?.url ?? "",
            json?.data?.summary ?? undefined
        )
    }

    toJSON() {
        const data = Buffer.isBuffer(this.urlOrData)
            ? "data:application/octet-stream;base64," + this.urlOrData.toString("base64")
            : this.urlOrData
        return {
            type: "image",
            data: {
                sub_type: 1,
                file: data,
                summary: this.summary ?? undefined,
            }
        }
    }

    async getData() {
        if (Buffer.isBuffer(this.urlOrData)) {
            return this.urlOrData
        } else {
            const [ data ] = await tryCatch((await fetch(this.urlOrData)).arrayBuffer())
            if (data) {
                return Buffer.from(data)
            } else {
                return Buffer.alloc(0)
            }
        }
    }

    clone() {
        return new Sticker(this.urlOrData, this.summary)
    }

    equals(other: Sticker) {
        return this.urlOrData === other.urlOrData
    }
}