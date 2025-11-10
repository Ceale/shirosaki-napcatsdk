import EventEmitter from "node:events"
import { WebSocketManager } from "./WebSocketManager"
import { AutoBind } from "./util/AutoBind"
import { assert, tryCatch } from "@ceale/util"
import type { Logger } from "./util/Logger"
import console from "node:console"
import type { ActionMap, ActionParams, ActionResp } from "./interface/action"
import type { EventName } from "./interface/event-name"


export interface ClientOption {
    token?: string
    retryInterval?: number
    retryLimit?: number
    debug?: boolean
    logger?: Logger
}

export class NapCatClient /* extends EventEmitter */ {
    private url: string
    private token: string | null
    private debug: boolean
    private logger: Logger
    private wsManager: WebSocketManager

    constructor(url: string, options?: ClientOption) {
        // super()
        if (url === undefined) throw new TypeError("url参数是必须的")
        this.url = url
        this.token = options?.token ?? null
        this.debug = options?.debug ?? false

        const baseLogger = options?.logger ?? console
        this.logger = {
            debug: this.debug ? baseLogger.debug : () => {},
            info: baseLogger.info,
            warn: baseLogger.warn,
            error: baseLogger.error
        }

        const headers = {
            ...(this.token ? { Authorization: this.token } : {})
        }
        this.wsManager = new WebSocketManager(
            [this.url, { headers }],
            this.dataHandler,
            {
                interval: options?.retryInterval ?? 5000,
                limit: options?.retryLimit ?? 5
            },
            this.logger
        )
    }

    // public connect = async () => {
    @AutoBind
    public async connect() {
        return await this.wsManager.open()
    }

    @AutoBind
    public async disconnect () {
        return await this.wsManager.close()
    }


    @AutoBind
    public sendData(data: any) {
        this.logger.debug("发送数据", data)
        return this.wsManager.sendData(data)
    }

    @AutoBind
    private dataHandler(data: any) {
        this.logger.debug("接收数据", data)
        if (data.hasOwnProperty("post_type")) {
            // 上报数据
            this.postDataHandler(data)
        } else {
            // Action 响应数据
            this.actionRespHandler(data)
        }
    }


    private actionMap = new Map<string, ((data: any) => void)>()

    public sendAction<T extends keyof ActionMap>(
        action: T, 
        params: ActionParams<T>
    ): Promise<ActionResp<T>>;
    public sendAction(action: string, params?: object): Promise<any>;
    @AutoBind
    public sendAction(action: string, params: object = {}) {
        return new Promise(resolve => {
            const id = (Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0,12).padEnd(12, "x")
            this.actionMap.set(id, resolve)
            this.sendData({
                action,
                params,
                echo: id
            })
        })
    }

    @AutoBind
    private actionRespHandler(data: any) {
        this.actionMap.get(data.echo)?.(data)
        this.actionMap.delete(data.echo)
    }

    
    private eventMap = new Map<string, Set<(data: any) => void>>()

    @AutoBind
    private postDataHandler(data: any) {
        const eventNamePath = []

        // post_type
        if (data?.post_type) eventNamePath.push(data?.post_type)
        // { post_type }_type
        const postTypeKey = data.post_type + "_type"
        if (data[postTypeKey]) eventNamePath.push(data[postTypeKey]) 
        // sub_type
        if (data?.sub_type) eventNamePath.push(data?.sub_type)
            
        this.logger.debug("接收到事件：", eventNamePath)

        // 触发事件
        // 构建事件字符串，逐级递减 notice.xxx -> notice -> all
        for (let i = eventNamePath.length; i > 0; i--) {
            const eventName = eventNamePath.slice(0, i).join(".")
            this.eventMap.get(eventName)?.forEach(handler => handler(data))
        }
        this.eventMap.get("all")?.forEach(handler => handler(data))
    }

    public onEvent(handler: (data: any) => void): void;
    public onEvent(eventName: EventName, handler: (data: any) => void): void;
    @AutoBind
    public onEvent(arg1: any, arg2?: any) {
        const [ eventName, handler ] = arg2 ? [ arg1, arg2 ] :  [ "all", arg2 ]
        assert<string>(eventName)
        assert< (data: any) => void>(handler)

        let eventSet = this.eventMap.get(eventName)
        if (!eventSet) {
            eventSet = new Set()
            this.eventMap.set(eventName, eventSet)
        }
        eventSet.add(handler)
    }

    public offEvent(handler: (data: any) => void): void;
    public offEvent(eventName: string, handler: (data: any) => void): void;
    @AutoBind
    public offEvent(arg1: any, arg2?: any) {
        const [ eventName, handler ] = arg2 ? [ arg1, arg2 ] :  [ "all", arg2 ]
        assert<string>(eventName)
        assert< (data: any) => void>(handler)

        let eventSet = this.eventMap.get(eventName)
        if (eventSet) {
            eventSet.delete(handler)
        }
    }
}
