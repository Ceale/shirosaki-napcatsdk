import { type anyobject } from "@ceale/util"
import type { MessageSegment } from "./MessageSegment"
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

export class Segment {
    static fromJSON(json: anyobject): MessageSegment | undefined {
        switch (json?.type) {
            case "text":
                return Text.fromJSON(json)
            case "at":
                return At.fromJSON(json)
            case "reply":
                return Reply.fromJSON(json)

            case "face":
                return Face.fromJSON(json)
            case "rps":
                return Rps.fromJSON(json)
            case "dice":
                return Dice.fromJSON(json)

            case "image": 
                if (json?.data?.sub_type === 1) return Sticker.fromJSON(json)
                if (Object.hasOwn(json?.data ?? {}, "emoji_id")) return Mface.fromJSON(json)
                return Image.fromJSON(json)

            case "poke":
                return Poke.fromJSON(json)

            default:
                return undefined
        }
    }
    
    static text(...params: ConstructorParameters<typeof Text>) {
        return new Text(...params)
    }
    static at(...params: ConstructorParameters<typeof At>) {
        return new At(...params)
    }
    static reply(...params: ConstructorParameters<typeof Reply>) {
        return new Reply(...params)
    }

    static face(...params: ConstructorParameters<typeof Face>) {
        return new Face(...params)
    }
    static rps(...params: ConstructorParameters<typeof Rps>) {
        return new Rps(...params)
    }
    static dice(...params: ConstructorParameters<typeof Dice>) {
        return new Dice(...params)
    }

    static image(...params: ConstructorParameters<typeof Image>) {
        return new Image(...params)
    }
    static sticker(...params: ConstructorParameters<typeof Sticker>) {
        return new Sticker(...params)
    }
    static mface(...params: ConstructorParameters<typeof Mface>) {
        return new Mface(...params)
    }
    
    static poke(...params: ConstructorParameters<typeof Poke>) {
        return new Poke(...params)
    }
}