/**
 * 路由指令
 */

import { App } from "vue"

export default (app: App) => {

    app.directive('route', (el, binding) => {

        el.style.cursor = 'pointer'

        el.addEventListener('click', (evt: Event) => {
            const { value } = binding
            if (typeof value === 'string') {
                app.config.globalProperties.$router.push(value)
            }
            evt.stopPropagation()
        })

    })


}
