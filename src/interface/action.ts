import type { ActionMap } from "./action-map"
export type { ActionMap } from "./action-map"

// 使用条件类型根据 action 名推断参数和返回类型
export type ActionParams<T extends keyof ActionMap> = ActionMap[T]["params"]
export type ActionResp<T extends keyof ActionMap> = ActionMap[T]["response"]