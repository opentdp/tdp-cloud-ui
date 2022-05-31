import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

export default {
    base: './',
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    plugins: [
        vue(),
        ElementPlus({
            useSource: true,
        })
    ]
}
