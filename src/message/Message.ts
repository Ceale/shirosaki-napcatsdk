import type { anyobject } from "@ceale/util"
import { MessageBuilder } from "./MessageBuilder"
import { Segment } from "./Segment"
import { MessageSegment } from "./MessageSegment"
import { Text } from "./segment/Text"
import { Face } from "./segment/Face"


export class Message {

    static builder(): MessageBuilder {
        return new MessageBuilder()
    }

    static template(...params: Parameters<MessageBuilder["template"]>): Message {
        return Message.builder().template(...params).build()
    }

    static create(...segments: (string | MessageSegment)[]): Message {
        return new Message(segments.map(segment => {
            return typeof segment === "string"
                ? new Text(segment)
                : segment
        }))
    }

    static fromJSON(json: anyobject[] | string): Message {
        if (typeof json === "string") {
            return new Message([new Text(json)])
        }
        if (!Array.isArray(json)) {
            throw new TypeError("消息段必须是 array 或 string")
        }
        const segments = json
            .map(segment => Segment.fromJSON(segment))
            .filter(segment => segment !== undefined)
        return new Message(segments)
    }

    
    private segments: MessageSegment[] = []
    getAllSegment(): MessageSegment[] {
        return this.segments
    }
    getSegment(index: number): MessageSegment | null {
        return this.segments[index] ?? null
    }

    get length(): number {
        return this.segments.length
    }

    constructor(segments: MessageSegment[]) {
        this.segments = segments
    }

    [Symbol.iterator](): Iterator<MessageSegment> {
        return this.segments[Symbol.iterator]()
    }

    toJSON() {
        return this.segments.map(segment => segment.toJSON())
    }

    clone(): Message {
        return new Message(this.segments.map(segment => segment.clone()))
    }
    cloneToBuilder() {
        return Message.builder().append(...this.clone().segments)
    }

    /**
     * 
     * @param start 可以为负，负就是从尾部开始
     * @param deleteCount 
     * @param segments 
     */
    splice(start: number, deleteCount: number, ...segments: MessageSegment[]) {    // 处理负索引
        const normalizedStart = start < 0 
            ? Math.max(this.segments.length + start, 0)
            : Math.min(start, this.segments.length)
        
        // 处理删除数量
        const actualDeleteCount = Math.max(
            0,
            Math.min(deleteCount, this.segments.length - normalizedStart)
        )
        
        // 执行删除和插入
        const deleted = this.segments.splice(normalizedStart, actualDeleteCount, ...segments)
        
        return deleted
    }

    text() {
        return this.segments
            .filter(segment => segment instanceof Text)
            .map(segment => segment.text)
            .join("")
    }

    hasSegment(predicate: (segment: MessageSegment, index: number) => boolean) {
        return this.segments.some(predicate)
    }
    hasSegmentByType<T extends typeof MessageSegment>(type: T) {
        return this.segments.some(segment => segment instanceof type)
    }
    
    findSegment(predicate: (segment: MessageSegment, index: number) => boolean): MessageSegment | null {
        return this.segments.find(predicate) ?? null
    }
    findSegmentByType<T extends typeof MessageSegment>(type: T): InstanceType<T> | null {
        // @ts-expect-error 返回的segment只能是T或者undefined，但是ts是个铸币，推导不出来
        return this.segments.find(segment => segment instanceof type) ?? null
    }

    findAllSegment(predicate: (segment: MessageSegment, index: number) => boolean): MessageSegment[] {
        return this.segments.filter(predicate)
    }
    findAllSegmentByType<T extends typeof MessageSegment>(type: T): InstanceType<T>[] {
        // @ts-expect-error 注意到，segment的类型显然是type
        return this.segments.filter(segment => segment instanceof type)
    }

    equals(other: Message) {
        return this.length === other.length
            && this.constructor === other.constructor
            && this.segments.every((segment, index) =>
                other.segments[index]
                && segment?.equals?.(other.segments[index])
            )
    }
}