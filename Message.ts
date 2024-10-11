import { MessageSegment, Text, Image, At, Face, MessageSegmentType } from "./MessageSegment"

export class Message {
    private segments: MessageSegment[]

    constructor(...segments: MessageSegment[]) {
        this.segments = segments
    }

    getLength() {
        return this.segments.length
    }

    addSegment(segment: MessageSegment): this {
        this.segments.push(segment)
        return this
    }

    getSegment(n: number): MessageSegment {
        return this.segments[n-1]
    }

    getSegments(): MessageSegment[] {
        return this.segments
    }

    toJSON(): object[] {
        return this.segments.map(segment => segment.toJSON())
    }

    static fromJSON(jsonSegments: object[]): Message {
        const segments = jsonSegments.map(segmentJson => {
            const type = segmentJson.type
            switch (type) {
                case MessageSegmentType.Text:
                    return new Text((segmentJson.data as any).text)
                case MessageSegmentType.Image:
                    return new Image((segmentJson.data as any).file)
                case MessageSegmentType.At:
                    return new At((segmentJson.data as any).qq)
                case MessageSegmentType.Face:
                    return new Face((segmentJson.data as any).id)
                default:
            }
        })

        return new Message(...segments)
    }
}