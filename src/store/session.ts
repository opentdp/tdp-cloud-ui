import { defineStore } from "pinia"

import { LoginResult } from "@/api/native/passport"

export default defineStore("session", {
    state: () => ({
        UserId: 0, //用户ID
        Username: "", //用户名
        Avatar: "", //头像
        Level: 0, //用户组
        AppId: "", //应用ID
        Email: "", //用户邮箱
        Token: "", //会话令牌
        Expire: 0, //令牌过期时间
        Loading: 0, //网络请求计数
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
