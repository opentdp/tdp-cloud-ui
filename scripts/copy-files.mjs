// 复制静态文件

import { copyFileSync } from "fs"

copyFileSync("src/assets/icon.js", "build/assets/icon.js")
