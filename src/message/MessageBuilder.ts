import { MessageSegment } from "./MessageSegment"
import { TextSegment } from "./message-segment/TextSegment"
import { AtSegment } from "./message-segment/AtSegment"
import { Message } from "./Message"
import { ReplySegment } from "./message-segment/ReplySegment"
import { FaceSegment } from "./message-segment/FaceSegment"
import { StickerSegment } from "./message-segment/StickerSegment"

export class MessageBuilder {
    private segments: MessageSegment[] = []

    build(): Message {
        return new Message(this.segments)
    }

    text(...params: ConstructorParameters<typeof TextSegment>) {
        this.segments.push(new TextSegment(...params))
        return this
    }

    at(...params: ConstructorParameters<typeof AtSegment>) {
        this.segments.push(new AtSegment(...params))
        return this
    }

    reply(...params: ConstructorParameters<typeof ReplySegment>) {
        this.segments.push(new ReplySegment(...params))
        return this
    }

    face(...params: ConstructorParameters<typeof FaceSegment>) {
        this.segments.push(new FaceSegment(...params))
        return this
    }

    sticker(...params: ConstructorParameters<typeof StickerSegment>) {
        this.segments.push(new StickerSegment(...params))
        return this
    }
}