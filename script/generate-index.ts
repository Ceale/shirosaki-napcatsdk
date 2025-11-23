import fs from "fs/promises"
import { uri } from "@ceale/util"

const ignore = [ "src/index.ts" ]
const fileList: string[] = []

const traverse = async (dir: string) => {
    const items = await fs.readdir(dir)

    for (const item of items) {
        const fullPath = uri.join(dir, item)
        if ((await fs.stat(fullPath)).isDirectory()) {
            await traverse(fullPath)
        } else if (item.endsWith('.ts')) {
            fileList.push(fullPath)
        }
    }
}

await traverse("src/")
const fileList1 = fileList.filter(file => {
    return !ignore.includes(file)
})

const exportStr = fileList1.map(file => {
    return `export * from "${ "./" + file.removePrefix("src/") }"`
})

exportStr.push(`/**`)
exportStr.push(` * 生成于：${new Date().toLocaleString()}`)
exportStr.push(` */`)

fs.writeFile("src/index.ts", exportStr.join("\n"))