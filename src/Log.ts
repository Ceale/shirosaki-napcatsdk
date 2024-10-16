export class Logger {
    private name: string
    constructor(name: string) {
        this.name = name
    }

    debug(str: string) {
        console.debug(this.#format(str, "debug"))
    }

    info(str: string) {
        console.info(this.#format(str, "info"))
    }

    warn(str: string) {
        console.warn(this.#format(str, "warn"))
    }
    
    error(str: string) {
        console.error(this.#format(str, "error"))
    }
    
    #format(str: string, mode: "debug"|"info"|"warn"|"error") {
        const date = new Date()
        const dateText = `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        return `[${dateText}] [${this.name}/${mode}] ${str}`
    }
}
