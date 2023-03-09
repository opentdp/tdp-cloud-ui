import { defineStore } from "pinia"

import { NaApi } from "@/api"

export default defineStore("layout", {
    state: () => ({
        Version: "",
        Register: false,
        // 侧边栏折叠
        Collapse: false,
    }),
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.Collapse = data
        },
        // 获取前端配置
        initUIConfig() {
            NaApi.config.ui().then(res => {
                Object.assign(this, res)
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
