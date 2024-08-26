export default class Logger {
    constructor(name) {
        this.name = name
    }

    debug(str) {
        console.debug(this.#format(str, "debug"))
    }

    info(str) {
        console.info(this.#format(str, "info"))
    }

    warn(str) {
        console.warn(this.#format(str, "warn"))
    }
    
    error(str) {
        console.error(this.#format(str, "error"))
    }
    
    #format(str, mode) {
        const date = new Date()
        const dateText = `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        return `[${dateText}] [${this.name}/${mode}] ${str}`
    }
}
