import { defineStore } from 'pinia';

export default defineStore('layout', {
    state() {
        return {
            collapse: false,
            tabsList: [],
            secretList: [],
        };
    },
    actions: {
        // 侧边栏折叠
        handleCollapse(data) {
            this.collapse = data;
        },
        // 多窗口操作
        clearTabs() {
            this.tabsList = [];
        },
        openTabsItem(data) {
            this.tabsList.push(data);
        },
        closeTabsItem(data) {
            this.tabsList.splice(data.index, 1);
        },
        closeTabsOther(data) {
            this.tabsList = data;
        },
        // 密钥列表更新
        setSecrets(data: any[]) {
            this.secretList = data;
            if (data.length > 0 && +localStorage.getItem('vt_keyid') < 1) {
                localStorage.setItem('vt_keyid', data[0].Id);
            }
        },
    },
});
