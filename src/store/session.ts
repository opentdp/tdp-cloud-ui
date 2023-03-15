import { defineStore } from "pinia"

import { LoginResult } from "@/api/native/passport"

export default defineStore("session", {
    state: () => ({
        AppId: "",
        Username: "",
        UserLevel: 0,
        Email: "",
        Token: "",
    }),
    actions: {
        update(res: LoginResult) {
            Object.assign(this, res)
            this.parseToken()
        },
        getAppKey() {
            return this.parseToken().AppKey
        },
        parseToken() {
            const parts = this.Token.split(".")
            if (parts[1]) {
                const data = JSON.parse(atob(parts[1]))
                this.UserLevel = data.UserLevel
                return data
            }
            return {}
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "tdp/session",
                storage: localStorage,
            },
        ],
    },
})
