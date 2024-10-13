export async function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export function generateRandomHex(length: number = 8) {
    return Array.from({length: length}, () => ('0' + Math.floor(Math.random() * 16).toString(16)).slice(-1)).join('')
}