import createVuePlugin from "@vitejs/plugin-vue"

import { defineConfig } from "vite"

export default defineConfig({
    base: "./",
    build: {
        outDir: "build",
        assetsDir: "assets",
        manifest: false,
    },
    plugins: [createVuePlugin()],
    resolve: {
        alias: {
            "@": "/src",
            "~": "/node_modules",
        },
    },
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
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/variable.scss";',
            },
        },
    },
})
