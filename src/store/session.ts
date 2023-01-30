import { defineStore } from "pinia"

export default defineStore("session", {
    state() {
        return {
            // 会话信息
            token: "",
            // 用户信息
            appid: "",
            username: "",
            description: "",
        }
    },
    actions: {
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
