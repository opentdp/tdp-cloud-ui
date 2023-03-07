import { defineStore } from "pinia"

import { LoginResult } from "@/api/native/passport"

export default defineStore("session", {
    state() {
        return {
            AppId: "",
            AppKey: "",
            Username: "",
            Email: "",
            Token: "",
        }
    },
    actions: {
        update(res: LoginResult) {
            Object.assign(this, res)
            this.parseToken()
        },
        parseToken() {
            const parts = this.Token.split(".")
            if (parts[1]) {
                const data = JSON.parse(atob(parts[1]))
                this.AppKey = data.AppKey
            }
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
