import { defineStore } from "pinia"

import { NaApi } from "@/api"

export default defineStore("layout", {
    state() {
        return {
            collapse: false,
            register: false,
        }
    },
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.collapse = data
        },
        // 获取前端配置
        getOption() {
            NaApi.config.ui().then(res => {
                this.register = res.register
            })
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "tdp/layout",
                storage: sessionStorage,
            },
        ],
    },
})
