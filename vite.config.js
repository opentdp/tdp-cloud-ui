import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

export default {
    base: './',
    build: {
        outDir: 'build',
        assetsDir: 'assets',
        manifest: false
    },
    plugins: [
        vue(),
        ElementPlus({
            useSource: true,
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrgin: true,
            }
        }
    }
}
