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
            '~': '/node_modules',
            '@': '/src'
        }
    },
    server: {
        port: 7900,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7800',
                changeOrgin: true,
            }
        }
    }
}
