export abstract class MessageSegment {

    public abstract getType(): MessageSegmentType
    public abstract toJSON(): object

    isText(): this is Text {
        return this.getType() === MessageSegmentType.Text;
    }

    isImage(): this is Image {
        return this.getType() === MessageSegmentType.Image;
    }

    isAt(): this is At {
        return this.getType() === MessageSegmentType.At;
    }

    isFace(): this is Face {
        return this.getType() === MessageSegmentType.Face;
    }

    isMface(): this is Mface {
        return this.getType() === MessageSegmentType.Mface;
    }
}

export enum MessageSegmentType {
    Text = "text",
    Image = "image",
    At = "at",
    Face = "face",
    Mface = "mface"
}


export class Text extends MessageSegment {
    getType() {
        return MessageSegmentType.Text
    }
    public text: string

    constructor(text: string) {
        super()
        this.text = text
    }

    toJSON(): object {
        return {
            type: "text",
            data: { text: this.text }
        }
    }
}

export class Image extends MessageSegment {
    getType() {
        return MessageSegmentType.Image
    }

    public file: string

    constructor(urlOrData: string | Buffer) {
        super()
        if (typeof urlOrData === "string") {
            this.file = urlOrData
        } else if (Buffer.isBuffer(urlOrData)) {
            this.file = "base64://" + urlOrData.toString("base64")
        } else {
            this.file = ""
        }
    }

    toJSON(): {
        type: string
        data: { file: string }
    } {
        return {
            type: "image",
            data: { file: this.file }
        }
    }
    
}

export class At extends MessageSegment {
    getType() {
        return MessageSegmentType.At
    }
    public target: number | "all"

    constructor(target: string | "all") {
        super()
        this.target = target === "all" ? "all" : parseInt(target)
    }

    toJSON(): object {
        return {
            type: "at",
            data: { qq: this.target }
        }
    }
}

export class Face extends MessageSegment {
    getType() {
        return MessageSegmentType.Face
    }

    constructor(public id: number) {
        super()
    }

    toJSON(): object {
        return {
            type: "face",
            data: { id: this.id }
        }
    }
}

export class Mface extends MessageSegment {
    getType() {
        return MessageSegmentType.Mface
    }
    
    public file: string
    
    constructor(urlOrData: string | Buffer) {
        super()
        if (typeof urlOrData === "string") {
            this.file = urlOrData
        } else if (Buffer.isBuffer(urlOrData)) {
            this.file = "base64://" + urlOrData.toString("base64")
        } else {
            this.file = ""
        }
    }

    toJSON() {
        return {
            type: "image",
            data: {
                file: this.file,
                sub_type: 1
            }
        }
    }
}