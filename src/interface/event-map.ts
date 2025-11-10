// import type { EventName } from "./event-name"

// interface EventMap限定 {
//     [key: EventName]: any
// }

// interface EventMap定义 implements EventMap限定 {
//     "message_sent.private.friend": TypeA
//     "message_sent.private.group": TypeB
// }

// interface EventMap extends EventMap定义 {
//     "all": EventMap定义["message_sent.private.friend"]
// }