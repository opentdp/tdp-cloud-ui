import { defineStore } from "pinia"

export default defineStore("session", {
    state() {
        return {
            username: "",
            appid: "",
            token: "",
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
