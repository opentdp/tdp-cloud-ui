import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

export default {
    base: './',
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
