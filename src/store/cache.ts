import { defineStore } from 'pinia';

import { NaApi } from '@/api';
import { VendorItem } from '@/api/native/vendor';

export default defineStore('cache', {
    state: () => ({
        vendorOnce: false,
        vendorList: {} as Record<number, VendorItem>,
    }),
    actions: {
        async initVendorList() {
            if (this.vendorOnce) {
                return; // 防抖
            }
            this.vendorOnce = true;
            const res = await NaApi.vendor.list({});
            res.Items.forEach(v => this.vendorList[v.Id] = v);
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'tdp/cache',
                storage: sessionStorage,
            },
        ],
    },
});
