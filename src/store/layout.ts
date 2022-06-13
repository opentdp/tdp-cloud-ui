import { defineStore } from 'pinia';

export default defineStore('layout', {
    state() {
        return {
            collapse: false,
        };
    },
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.collapse = data;
        },
    },
});
