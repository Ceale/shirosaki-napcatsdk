import WebSocket from "ws"
import type { Logger } from "./util/Logger"
import { type EnumKeys, defineEnum, tryCatch, wait } from "@ceale/util"
import { BindThis } from "./util/AutoBind"


const WS_STATE = defineEnum(
    "CONNECT",
    "ACTIVE",
    "CLOSE"
)

const WSM_STATE = defineEnum(
    "OPEN",
    "CLOSE"
)

export class WebSocketManager {
    constructor(
        private wsParams: [any?, any?, any?],
        public dataHandler: (data: any) => void,
        private retryCfg: {
            interval: number
            limit: number
        },
        private logger: Logger
    ) {}

    /** WebSocketManager状态 */
    public wsmState: EnumKeys<typeof WSM_STATE> = WSM_STATE.CLOSE
    /** WebSocketManager状态判断 */
    private wsmStateIs = (value: EnumKeys<typeof WSM_STATE>) => this.wsmState === value
    /** 等待关闭的Promise */
    private waitCloseResolve?: () => void

    /**
     * 连接成功返回true，失败返回false。如果当前已经是连接的，则返回true
     */
    @BindThis
    public async open() {
        this.logger.debug("@WebSocketManager.open()")
        
        // 如果已经连接，则返回true
        if (this.wsmState === WSM_STATE.OPEN) return true
        // 设置状态
        this.wsmState = WSM_STATE.OPEN
        // 调用连接函数

        const isConnect = await this.connect()
        // 如果状态变为关闭，则返回false
        if (this.wsmStateIs(WSM_STATE.CLOSE)) {
            this.waitCloseResolve?.()
            return false
        // 没连接成功则进入重连
        } else if (isConnect) {
            return true
        } else {
            return await this.retry()
        }
    }

    /**
     * 重连
     */
    @BindThis
    private async retry() {
        this.logger.debug("@WebSocketManager.retry()")

        // 正整数为重试次数，0为不重试，-1为无限重试
        const { interval, limit } = this.retryCfg
        const isInfinity = limit === -1
        for (
            let count = 0;
            isInfinity || (count < limit);
            count++
        ) {

            this.logger.debug(`将在 ${interval}ms 后进行第 ${count + 1} 次重连`)

            await wait(this.retryCfg.interval)

            // 如果状态变为关闭，则返回false，避免进入重连
            if (this.wsmStateIs(WSM_STATE.CLOSE)) {
                this.waitCloseResolve?.()
                return false
            }
            
            // 重新连接
            this.logger.debug(`重新连接中`)
            if (await this.connect()) return true
        }
        return false
    }

    /**
     * 断开成功返回true，失败返回false。如果当前已经是断开的，则返回true
     * 
     */
    @BindThis
    public async close() {
        this.logger.debug("@WebSocketManager.close()")
        
        // 如果已经关闭，则返回true
        if (this.wsmState === WSM_STATE.CLOSE) {
            return true
        }
        this.wsmState = WSM_STATE.CLOSE
        
        // 关闭ws对象
        this.ws?.close()
        // 等待关闭
        await new Promise<void>(resolve => {
            this.waitCloseResolve = resolve
        })
        return true
    }

    /** WebSocket状态 */
    public wsState: EnumKeys<typeof WS_STATE> = WS_STATE.CLOSE
    private ws: WebSocket | null = null
    /** 等待WS连接完成（成功或失败）*/
    private waitActiveResolve?: (value: boolean) => void
    private waitActiveTimeout?: NodeJS.Timeout

    @BindThis
    private connect() {
        return new Promise<boolean>(resolve => { 
            this.logger.debug("@WebSocketManager.connect()")

            // 创建ws对象
            this.ws = new WebSocket(...this.wsParams)
            this.wsState = WS_STATE.CONNECT
            this.waitActiveResolve = resolve
            this.logger.info("正在建立WebSocket连接")
    
            this.ws.addEventListener("open", () => {

                this.waitActiveTimeout = setTimeout(() => {
                    this.logger.warn("建立连接时发生错误：等待超时")
                    this.ws?.close()
                }, 5 * 1000)

                this.ws?.addEventListener("message", this.onceMsg, { once: true })
            })
            this.ws.addEventListener("close", this.onClose)
        })
    }

    /**
     * 发送数据
     * @param data 任意js对象
     * @returns 
     */
    @BindThis
    public sendData(data: any) {
        if (!this.ws) {
            this.logger.warn("发送数据时发生错误：WebSocket暂未连接")
            return
        }
        this.ws.send(JSON.stringify(data))
    }

    @BindThis
    private onceMsg(event: WebSocket.WebSocketEventMap["message"]) {
        // 停止超时检测等待
        clearTimeout(this.waitActiveTimeout)
        // 解析数据
        const [ data ] = tryCatch(() => JSON.parse(event.data.toString()))
        // 判断是不是OneBot的连接事件
        const isMetaConnectPacket = data?.post_type === "meta_event"
            && data?.meta_event_type === "lifecycle"
            && data?.sub_type === "connect"
        if (isMetaConnectPacket) {
            this.dataHandler(data)
            this.onActive()
        } else {
            this.logger.warn("建立连接时发生错误：首个数据包不是 OneBot.meta_event.connect")
            this.ws?.close()
        }
    }

    @BindThis
    private onActive() {
        this.wsState = WS_STATE.ACTIVE
        this.waitActiveResolve?.(true)
        this.ws?.addEventListener("message", this.onMsg)
        this.logger.info("连接成功")
    }
    
    @BindThis
    private onMsg(event: WebSocket.WebSocketEventMap["message"]) {   
        const [ data, error ] = tryCatch(() => JSON.parse(event.data.toString()))
        if (data) {
            this.dataHandler(data)
        } else {
            this.logger.warn("接收数据时发生错误：解析数据失败")
            this.logger.warn(event.data?.toString())
            this.logger.warn(error)
        }
    }

    @BindThis
    private onClose(event: WebSocket.WebSocketEventMap["close"]) {
        clearTimeout(this.waitActiveTimeout)
        if (this.wsState === WS_STATE.CONNECT) {
            this.waitActiveResolve?.(false)
            this.logger.warn("建立连接失败：", event.code, event.reason)
        } else if (this.wsState === WS_STATE.ACTIVE) {
            if (this.wsmState === WSM_STATE.OPEN) {
                this.logger.warn("连接已断开：", event.code, event.reason)
                this.retry()        
            } else if (this.wsmState === WSM_STATE.CLOSE) {
                this.waitCloseResolve?.()
            }
            
        }
        
        this.wsState = WS_STATE.CLOSE
        this.ws = null
    }
}