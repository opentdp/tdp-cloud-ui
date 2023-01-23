import { defineStore } from "pinia"

import type { VendorItem } from "@/api/local/vendor"

export default defineStore("session", {
    state() {
        return {
            // 会话信息
            token: "",
            // 用户信息
            appid: "",
            username: "",
            description: "",
            vendorList: [] as VendorItem[],
        }
    },
    actions: {
        // 更新厂商列表
        setVendor(data: VendorItem[]) {
            this.vendorList = data
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
