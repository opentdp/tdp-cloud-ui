import { RouteRecordRaw } from "vue-router"

import layout from "@/apps/layout/index.vue"

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/dashboard",
    },
    //////
    {
        path: "/",
        name: "home",
        component: layout,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "系统首页",
                    login: true,
                },
                component: () => import("@/apps/dashboard/index.vue"),
            },
            //////
            {
                path: "/domain/list",
                name: "domain-list",
                meta: {
                    title: "域名列表",
                    login: true,
                },
                component: () => import("@/apps/domain/list.vue"),
            },
            {
                path: "/domain/detail/:id",
                name: "domain-detail",
                meta: {
                    title: "域名详情",
                    login: true,
                },
                component: () => import("@/apps/domain/detail.vue"),
            },
            //////
            {
                path: "/machine/list",
                name: "machine-list",
                meta: {
                    title: "主机列表",
                    login: true,
                },
                component: () => import("@/apps/machine/list.vue"),
            },
            {
                path: "/machine/detail/:id",
                name: "machine-detail",
                meta: {
                    title: "主机详情",
                    login: true,
                },
                component: () => import("@/apps/machine/detail.vue"),
            },
            {
                path: "/machine/worktask",
                name: "machine-worktask",
                meta: {
                    title: "任务记录",
                    login: true,
                },
                component: () => import("@/apps/machine/worktask.vue"),
            },
            {
                path: "/machine/vnc/:id",
                name: "machine-vnc",
                meta: {
                    title: "主机 VNC",
                    login: true,
                },
                component: () => import("@/apps/machine/vnc.vue"),
            },
            //////
            {
                path: "/terminal/ssh/:addr*",
                name: "terminal-ssh",
                meta: {
                    title: "SSH 连接",
                    login: true,
                },
                component: () => import("@/apps/terminal/ssh.vue"),
            },
            {
                path: "/terminal/sshkey",
                name: "terminal-sshkey",
                meta: {
                    title: "SSH 密钥",
                    login: true,
                },
                component: () => import("@/apps/terminal/sshkey.vue"),
            },
            //////
            {
                path: "/tat/history",
                name: "tat-history",
                meta: {
                    title: "历史记录 - 自动化助手",
                    login: true,
                },
                component: () => import("@/apps/tat/history.vue"),
            },
            {
                path: "/tat/script",
                name: "tat-script",
                meta: {
                    title: "命令列表 - 自动化助手",
                    login: true,
                },
                component: () => import("@/apps/tat/script.vue"),
            },
            //////
            {
                path: "/member/info",
                name: "member-info",
                meta: {
                    title: "个人中心",
                    login: true,
                },
                component: () => import("@/apps/member/info.vue"),
            },
            {
                path: "/member/password",
                name: "member-password",
                meta: {
                    title: "修改密码",
                    login: true,
                },
                component: () => import("@/apps/member/password.vue"),
            },
            //////
            {
                path: "/vendor/qcloud",
                name: "vendor-secret",
                meta: {
                    title: "腾讯云 - 厂商",
                    login: true,
                },
                component: () => import("@/apps/vendor/qcloud.vue"),
            },
            {
                path: "/vendor/worker",
                name: "vendor-worker",
                meta: {
                    title: "子节点",
                    login: true,
                },
                component: () => import("@/apps/vendor/worker.vue"),
            },
            //////
            {
                path: "/qcloud/bind/:vid",
                name: "qcloud-bind",
                meta: {
                    title: "腾讯云 - 绑定资源",
                    login: true,
                },
                component: () => import("@/apps/qcloud/bind.vue"),
            },
            //////
            {
                path: "/error/403",
                name: "error-403",
                meta: {
                    title: "没有权限",
                    login: true,
                },
                component: () => import("@/apps/error/403.vue"),
            },
            {
                path: "/error/404",
                name: "error-404",
                meta: {
                    title: "找不到页面",
                    login: true,
                },
                component: () => import("@/apps/error/404.vue"),
            },
        ],
    },
    //////
    {
        path: "/member/login",
        name: "member-login",
        meta: {
            title: "登录",
        },
        component: () => import("@/apps/member/login.vue"),
    },
    {
        path: "/member/register",
        name: "member-register",
        meta: {
            title: "注册",
        },
        component: () => import("@/apps/member/register.vue"),
    },
    //////
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        meta: {
            title: "找不到页面",
            login: true,
        },
        component: () => import("@/apps/error/404.vue"),
    },
]
