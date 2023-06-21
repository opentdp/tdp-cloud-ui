import { defineStore } from "pinia"

import { LoginResult } from "@/api/native/passport"

export default defineStore("session", {
    state: () => ({
        UserId: 0,
        Username: "",
        Avatar: "",
        Level: 0,
        AppId: "",
        Email: "",
        Token: "",
        Expire: 0,
    }),
    actions: {
        update(res: LoginResult) {
            Object.assign(this, res)
            if (res.Token) {
                this.updateToken(res.Token)
            }
        },
        updateToken(token: string) {
            const payload = this.Token.split(".")[1]
            const data = JSON.parse(atob(payload))
            this.Expire = data.exp
            this.Token = token
        },
        validToken() {
            return this.Expire > Date.now() / 1000
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
