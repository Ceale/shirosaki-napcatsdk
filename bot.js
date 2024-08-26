import WebSocket from "ws"
import { EventEmitter } from "node:events"
import Logger from "./log.js"

const logger = new Logger("bot")

export default class Bot extends EventEmitter {
    constructor(url, debug = false) {
        super()
        this.ws = new WebSocket(url)
        this.ws.on("error", err => {
            logger.error("WebSocket Error:", err)
        })

        this.ws.on("open", () => {
            logger.info("连接中...")
        })

        this.ws.on("message", rawData => {
            const data = JSON.parse(rawData.toString())
            
            if (debug === true) logger.debug("接受数据："+rawData.toString())

            if ("post_type" in data) {

                if (data.post_type === "meta_event" && data.meta_event_type === "lifecycle") {
                    if (data.sub_type === "connect") {
                        logger.info("已连接！")
                        this.emit("open")
                    }
                    if (data.sub_type === "enable") {
                        logger.info("bot已启用。")
                        this.emit("enable")
                    }
                    if (data.sub_type === "disable") {
                        logger.info("bot已停用。")
                    }
                    return
                }
            
                this.emit(data.post_type, data)
                return
            }

            // Handle responses here if needed
            this.#handleResponse(data)
        })
    }

    #handleResponse(response) {
        const requestId = response.echo
        if (this.pendingRequests.has(requestId)) {
            const { resolve, reject } = this.pendingRequests.get(requestId)
            if (response.status === "ok") {
                resolve(response)
            } else {
                reject(response)
            }
            this.pendingRequests.delete(requestId)
        }
    }

    // Method to send a request and get a promise back
    send(action, params) {
        return new Promise((resolve, reject) => {
            const requestId = Math.floor(Math.random()*100000000).toString().padStart(8, "0")
            this.pendingRequests.set(requestId, { resolve, reject })
            this.ws.send(Buffer.from(JSON.stringify({
                action: action,
                params: params,
                echo: requestId
            })))
        })
    }

    // Map to store pending requests
    pendingRequests = new Map()
}