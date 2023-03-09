import "@/helper/globals"

import { createApp } from "vue"

import App from "@/app.vue"
import "@/assets/style.scss"

import setupStore from "@/store/index"

import setupRoute from "@/router/route"
import setupRouter from "@/router/index"

import setupEcharts from "@/component/echarts"
import setupElement from "@/component/element"
import setupHighlight from "@/component/highlight"

const app = createApp(App)

setupStore(app)

setupRoute(app)
setupRouter(app)

setupEcharts(app)
setupElement(app)
setupHighlight(app)

app.mount("#app")
