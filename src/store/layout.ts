import { defineStore } from 'pinia';

import { NaApi } from '@/api';
import * as vars from '@/helper/const';

export default defineStore('layout', {
    state: () => ({
        // 侧栏折叠
        Collapse: false,
        // 主题模式
        ThemeMode: '',
        // 功能开关
        Registrable: false,
        // 后端版本
        Version: '',
        BuildVersion: '',
        // 前端版本
        UIVersion: vars.Version,
        UIBuildVersion: vars.BuildVersion,
        // 前端配置
        SiteName: vars.SiteName,
        SiteLogo: vars.SiteLogo,
        SiteIcon: vars.SiteIcon,
        Copylink: vars.Copylink,
        Copytext: vars.Copytext,
        IcpCode: vars.IcpCode,
        Analytics: vars.Analytics,
    }),
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.Collapse = data;
        },
        // 设置主题模式
        setThemeMode(mode: 'dark' | 'light' | 'classic') {
            this.ThemeMode = mode;
            this.applyConfig();
        },
        // 获取前端配置
        async fetchConfig() {
            const res = await NaApi.config.ui();
            Object.keys(res).forEach(k => {
                const v = res[k].trim();
                v && Object.assign(this, { [k]: v });
            });
            // 修正参数类型
            this.Registrable = res.Registrable == 'true';
            // 安装统计代码
            if (this.Analytics) {
                this.runScript(this.Analytics);
            }
            // 应用前端配置
            this.applyConfig();
        },
        // 应用布局设置
        applyConfig() {
            if (document.body.clientWidth < 1000) {
                this.setCollapse(true);
            }
            document.documentElement.setAttribute('theme-mode', this.ThemeMode);
        },
        // 执行行内脚本
        runScript(code: string) {
            const script = document.createElement('script');
            script.innerHTML = code; // 写入行内脚本
            document.body.appendChild(script);
            document.body.removeChild(script);
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'tdp/layout',
                storage: sessionStorage,
            },
        ],
    },
});
