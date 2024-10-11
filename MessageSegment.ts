export abstract class MessageSegment {
    public readonly Type: MessageSegmentType 

    abstract toJSON(): object
}

export enum MessageSegmentType {
    Text = "text",
    Image = "image",
    At = "at",
    Face = "face"
}


export class Text implements MessageSegment {
    Type = MessageSegmentType.Text

    constructor(public text: string) {
    }

    toJSON(): object {
        return {
            type: this.Type,
            data: { text: this.text }
        }
    }
}

export class Image implements MessageSegment {
    Type = MessageSegmentType.Image

    public file: string

    constructor(urlOrData: string | Buffer) {
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
            type: this.Type,
            data: { file: this.file }
        }
    }
    
}

export class At implements MessageSegment {
    Type = MessageSegmentType.At

    constructor(public qq: string | "all") {
    }

    toJSON(): object {
        return {
            type: this.Type,
            data: { qq: this.qq }
        }
    }
}

export class Face implements MessageSegment {
    Type = MessageSegmentType.Face

    constructor(public id: number) {
    }

    toJSON(): object {
        return {
            type: this.Type,
            data: { id: this.id }
        }
    }
}