/**
 * 中后台组件
 * https://element-plus.org/zh-CN
 * https://github.com/rehiy/vue-admin-template
 */

import { App } from "vue"

import ElementPlus from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"

import * as Icons from "@element-plus/icons-vue"

// export default

export default (app: App) => {
    app.use(ElementPlus, { locale: zhCn })
    for (const icon of Object.entries(Icons)) {
        app.component(...icon)
    }
}