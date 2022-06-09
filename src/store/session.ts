import { defineStore } from 'pinia';

export default defineStore('session', {
    state() {
        return {
            keyid: 0,
            token: '',
            username: '',
            secretList: [],
        };
    },
    actions: {
        // 密钥列表更新
        setSecrets(data: any[]) {
            this.secretList = data;
            if (data.length > 0 && this.keyid < 1) {
                this.keyid = data[0].Id;
            }
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'vt_session',
                storage: localStorage,
            },
        ],
    },
});
