import { type anyobject, tryCatch } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export class Image extends MessageSegment {

    constructor(
        public data: string | Buffer,
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
        const data = Buffer.isBuffer(this.data)
            ? "data:application/octet-stream;base64," + this.data.toString("base64")
            : this.data
        return {
            type: "image",
            data: {
                file: data,
                summary: this.summary ?? undefined,
            }
        }
    }

    async getData() {
        if (Buffer.isBuffer(this.data)) {
            return this.data
        } else {
            const [ data ] = await tryCatch((await fetch(this.data)).arrayBuffer())
            if (data) {
                return Buffer.from(data)
            } else {
                return Buffer.alloc(0)
            }
        }
    }
}
