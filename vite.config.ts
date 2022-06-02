import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue';


export default defineConfig({
    base: './',
    build: {
        outDir: 'build',
        assetsDir: 'assets',
        manifest: false,
    },
    plugins: [createVuePlugin()],
    resolve: {
        alias: {
            '@': '/src',
            '~': '/node_modules',
        },
    },
    server: {
        port: 7900,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7800'
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
});
