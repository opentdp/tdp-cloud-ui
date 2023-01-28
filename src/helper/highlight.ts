/**
 * 代码高亮组件
 * https://www.npmjs.com/package/@highlightjs/vue-plugin
 */

import type { App, Plugin } from 'vue'

import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

const plugin: Plugin = {
    install: (app: App) => {
        app.directive('highlight', (el) => {
            el.className = "highlight"
            el.innerHTML = el.innerHTML.trim()
            el.innerHTML = el.innerHTML.replace(/[\n\s]+(<code>)/g, "$1")
            el.querySelectorAll('code').forEach(hljs.highlightElement)
        })
    },
}

export default (app: App) => {
    app.use(plugin)
}
