import { defineStore } from "pinia"

import { NaApi } from "@/api"

export default defineStore("layout", {
    state: () => ({
        Collapse: false,
        Register: false,
    }),
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.Collapse = data
        },
        // 获取前端配置
        initUIConfig() {
            NaApi.config.ui().then(res => {
                this.Register = res.Register
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
