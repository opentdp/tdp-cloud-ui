import { defineStore } from 'pinia';

export default defineStore({
    id: 'main',

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
        setTabsItem(data) {
            this.tabsList.push(data);
        },
        delTabsItem(data) {
            this.tabsList.splice(data.index, 1);
        },
        clearTabs() {
            this.tabsList = [];
        },
        closeTabsOther(data) {
            this.tabsList = data;
        },
        closeCurrentTag(data) {
            for (let i = 0, len = this.tabsList.length; i < len; i++) {
                const item = this.tabsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data.$router.push(this.tabsList[i + 1].path);
                    } else if (i > 0) {
                        data.$router.push(this.tabsList[i - 1].path);
                    } else {
                        data.$router.push('/');
                    }
                    this.tabsList.splice(i, 1);
                    break;
                }
            }
        },
        // 密钥列表更新
        setSecrets(data: any[]) {
            this.secretList = data;
            if (data.length > 0 && +localStorage.getItem('vt_keyid') < 1) {
                localStorage.setItem('vt_keyid', data[0].ID);
            }
        },
    },
});
