import "@/helper/globals"
import "@/theme/main.scss"

import { createApp } from "vue"

import App from "@/app.vue"

import setupPinia from "@/setup/pinia"

import setupRoute from "@/setup/route"
import setupRouter from "@/setup/router"

import setupTDesign from "@/setup/tdesign"

import setupEcharts from "@/setup/echarts"
import setupHighlight from "@/setup/highlight"

const app = createApp(App)

setupPinia(app)

setupRoute(app)
setupRouter(app)

setupTDesign(app)

setupEcharts(app)
setupHighlight(app)

app.mount("#app")
