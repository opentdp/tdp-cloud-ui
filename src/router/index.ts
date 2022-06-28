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

    const isLogin = !!session.token
    const isSecret = session.keyid > 0

    if (to.meta.login && !isLogin) {
        next("/member/login")
        return
    }

    if (to.meta.secret && !isSecret) {
        next("/member/secret")
        return
    }

    next()
})

export default (app: App) => {
    app.use(router)
}
