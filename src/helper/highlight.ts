/**
 * 代码高亮组件
 * https://www.npmjs.com/package/highlight.js
 */

import type { App, Plugin } from 'vue'

import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

const plugin: Plugin = {
    install: (app: App) => {
        app.directive('highlight', (el) => {
            el.querySelectorAll('code').forEach(hljs.highlightElement)
        })
    },
}

export default (app: App) => {
    app.use(plugin)
}
