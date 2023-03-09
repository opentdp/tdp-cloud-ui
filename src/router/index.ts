import { App } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"

import sessionStore from "@/store/session"

import { routes } from "./routes"

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - TDP Cloud`

    const session = sessionStore()

    const isLogin = !!session.Token

    if (to.meta.login && !isLogin) {
        next("/passport/login")
        return
    }

    next()
})

// export default

export default (app: App) => {
    app.use(router)
}
