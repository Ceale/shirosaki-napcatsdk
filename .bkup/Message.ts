import { MessageSegment, Text, Image, At, Face, MessageSegmentType, Mface } from "./MessageSegment"

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
        return this.segments[n-1]!
    }

    getSegments(): MessageSegment[] {
        return this.segments
    }

    toJSON(): object[] {
        return this.segments.map(segment => segment.toJSON())
    }

    static fromJSON(jsonSegments: object[]): Message {
        const segments = jsonSegments.map((segmentJson: any) => {
            const type: MessageSegmentType = segmentJson.type
            if (type === "text") {
                return new Text((segmentJson.data as any).text)
            }
            if(type === "face") {
                return new Face((segmentJson.data as any).id)
            }
            if (type === "image" && segmentJson.data?.sub_type === 0) {
                return new Image((segmentJson.data as any).url)
            }
            if (type === "at") {
                return new At((segmentJson.data as any).qq)
            }
            if (type === "image" && segmentJson.data?.sub_type === 1) {
                return new Mface((segmentJson.data as any).url)
            }
            return null
        }).filter(segment => segment !== null)
        return new Message(...(segments as MessageSegment[]))
    }
}