// https://cn.vitejs.dev/config/

import { UserConfig } from "vite"

import vue from "@vitejs/plugin-vue"
import replace from "./vite-plugin-replace"

export const config: UserConfig = {
    base: "./",
    build: {
        outDir: "build",
        assetsDir: "assets",
        manifest: false,
    },
    plugins: [
        vue(),
        replace([
            {
                file: /tdesign-.+\.js/,
                source: /https:\/\/[^"']+\/fonts\/index\.js/g,
                target: './assets/icon.js',
            },
        ])
    ],
    resolve: {
        alias: {
            "@": "/src",
            "~": "/node_modules",
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/variable.scss";',
            },
        },
    },
}