/**
 * 代码高亮组件
 * https://github.com/highlightjs/highlight.js
 */

import type { App, Plugin } from "vue"

import hljs from "highlight.js"
import "highlight.js/styles/agate.css"

const plugin: Plugin = {
    install: (app: App) => {
        app.directive("highlight", (el) => {
            el.classList.add("highlight")
            el.querySelectorAll("code").forEach((code: HTMLElement) => {
                hljs.highlightElement(code)
            })
        })
    },
}

// export default

export default (app: App) => {
    app.use(plugin)
}
