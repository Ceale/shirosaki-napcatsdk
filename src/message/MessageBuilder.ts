import { MessageSegment } from "./MessageSegment"
import { Message } from "./Message"
import { Text } from "./segment/Text"
import { At } from "./segment/At"
import { Reply } from "./segment/Reply"
import { Face } from "./segment/Face"
import { Sticker } from "./segment/Sticker"
import { Image } from "./segment/Image"
import { Mface } from "./segment/Mface"
import { Rps } from "./segment/Rps"
import { Dice } from "./segment/Dice"
import { Poke } from "./segment/Poke"

export class MessageBuilder {
    private segments: MessageSegment[] = []

    build(): Message {
        return new Message(this.segments)
    }

    template(strings: TemplateStringsArray, ...values: (string | number | boolean | bigint | MessageSegment)[]) {
        strings.forEach((str, i) => {
            if (str !== "") this.segments.push(new Text(str))
            if (values[i] !== undefined) {
                if (values[i] instanceof MessageSegment) this.segments.push(values[i])
                else this.segments.push(new Text(String(values[i])))
            }
        })
        return this
    }

    append(...segments: MessageSegment[]) {
        this.segments.push(...segments)
        return this
    }

    text(...params: ConstructorParameters<typeof Text>) {
        this.segments.push(new Text(...params))
        return this
    }
    at(...params: ConstructorParameters<typeof At>) {
        this.segments.push(new At(...params))
        return this
    }
    reply(...params: ConstructorParameters<typeof Reply>) {
        this.segments.push(new Reply(...params))
        return this
    }

    face(...params: ConstructorParameters<typeof Face>) {
        this.segments.push(new Face(...params))
        return this
    }
    rps(...params: ConstructorParameters<typeof Rps>) {
        this.segments.push(new Rps(...params))
        return this
    }
    dice(...params: ConstructorParameters<typeof Dice>) {
        this.segments.push(new Dice(...params))
        return this
    }

    image(...params: ConstructorParameters<typeof Image>) {
        this.segments.push(new Image(...params))
        return this
    }
    sticker(...params: ConstructorParameters<typeof Sticker>) {
        this.segments.push(new Sticker(...params))
        return this
    }
    mface(...params: ConstructorParameters<typeof Mface>) {
        this.segments.push(new Mface(...params))
        return this
    }
    
    poke(...params: ConstructorParameters<typeof Poke>) {
        this.segments.push(new Poke(...params))
        return this
    }
}