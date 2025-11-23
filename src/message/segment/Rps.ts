import { defineEnum, type anyobject, type EnumKeys } from "@ceale/util"
import { MessageSegment } from "../MessageSegment"

export const RpsState = defineEnum("ROCK", "SCISSORS", "PAPER")
export type RpsState = EnumKeys<typeof RpsState>

export class Rps extends MessageSegment {

    constructor(public state?: RpsState) {
        super()
    }

    toJSON() {
        let result = undefined
        switch (this.state) {
            case RpsState.ROCK:
                result = 1
                break
            case RpsState.SCISSORS:
                result = 2
                break
            case RpsState.PAPER:
                result = 3
                break
        }
        return {
            type: "dice",
            data: {
                result
            }
        }
    }

    static fromJSON(json: anyobject) {
        let state = undefined
        switch (json?.data?.result) {
            case 1:
                state = RpsState.ROCK
                break
            case 2:
                state = RpsState.SCISSORS
                break
            case 3:
                state = RpsState.PAPER
                break
        }
        const obj = new this(state)
        return obj
    }
}
