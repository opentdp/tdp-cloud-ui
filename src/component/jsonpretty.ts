/**
 * JSON 格式化组件
 */

import { App } from "vue"

import VueJsonPretty from "vue-json-pretty"
import "vue-json-pretty/lib/styles.css"

export default (app: App) => {
    app.component("JsonPretty", VueJsonPretty)
}
