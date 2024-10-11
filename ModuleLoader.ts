import path from "node:path"
import fs from "node:fs"

export async function moduleLoader(dirs: string|string[], params: any[]) {

    let moduleDirs: string[]
    if (typeof dirs === "string") {
        moduleDirs = [formatDirectoryPath(dirs) ]
    } else {
        moduleDirs = dirs.map(formatDirectoryPath)
    }

    for (const moduleDir of moduleDirs) {
        if (!fs.existsSync(moduleDir) || !fs.lstatSync(moduleDir).isDirectory()) {
            console.log(`${moduleDir}目录不存在`)
            continue
        }
        console.log(`正在从${moduleDir}目录加载模块`)
        let successCount = 0
        for (const module of fs.readdirSync(moduleDir)) {
            const modulePath = path.join(moduleDir, module)
            try {
                let module
                if (fs.lstatSync(modulePath).isFile()) {
                    module = await import(path.resolve(modulePath))
                } else {
                    module = await import(path.resolve(path.join(modulePath, "main.ts")))
                }
                module.default(...params)
                console.log(`✓ ${module.name || path.parse(modulePath).name} [${modulePath}]`)
                successCount++
            } catch(e) {
                console.error(e)
            }
        }
        console.log(`共从${moduleDir}目录加载${successCount}个模块`)
    }
}

function formatDirectoryPath(dir: string): string {
    const normalizedPath = path.normalize(dir)
    if (normalizedPath !== path.sep && !normalizedPath.endsWith(path.sep)) {
        return normalizedPath + path.sep
    }
    return normalizedPath;
}