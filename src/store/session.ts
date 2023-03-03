import { defineStore } from "pinia"

export default defineStore("session", {
    state() {
        return {
            Username: "",
            AppId: "",
            Token: "",
            Email: "",
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
