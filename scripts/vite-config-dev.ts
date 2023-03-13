// https://cn.vitejs.dev/config/

import { UserConfig } from "vite"

import vue from "@vitejs/plugin-vue"
import replace from "./vite-plugin-replace"

export const config: UserConfig = {
    plugins: [
        vue(),
        replace([
            {
                file: /tdesign-.+\.js/,
                source: /https:\/\/[^"']+\/fonts\/index\.js/g,
                target: 'src/assets/icon.js',
            },
        ])
    ],
    server: {
        port: 7900,
        open: false,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:7800",
            },
            "/wsi": {
                target: "http://127.0.0.1:7800",
                ws: true
            },
        },
    },
}
