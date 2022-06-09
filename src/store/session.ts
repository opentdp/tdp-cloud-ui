import { defineStore } from 'pinia';

export default defineStore('session', {
    state() {
        return {
            secretList: [],
        };
    },
    actions: {
        // 密钥列表更新
        setSecrets(data: any[]) {
            this.secretList = data;
            if (data.length > 0 && +localStorage.getItem('vt_keyid') < 1) {
                localStorage.setItem('vt_keyid', data[0].Id);
            }
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'vt_layout',
                storage: localStorage,
            },
        ],
    },
});
