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
                path: "/task/history",
                name: "task-history",
                meta: {
                    title: "任务记录",
                    login: true,
                },
                component: () => import("@/apps/task/history.vue"),
            },
            {
                path: "/task/script",
                name: "task-script",
                meta: {
                    title: "脚本管理",
                    login: true,
                },
                component: () => import("@/apps/task/script.vue"),
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
                path: "/vendor/list",
                name: "vendor-list",
                meta: {
                    title: "公有云",
                    login: true,
                },
                component: () => import("@/apps/vendor/list.vue"),
            },
            //////
            {
                path: "/vendor/bind/worker",
                name: "vendor-bind-worker",
                meta: {
                    title: "子节点",
                    login: true,
                },
                component: () => import("@/apps/vendor/bind_worker.vue"),
            },
            {
                path: "/vendor/bind/qcloud/:id",
                name: "vendor-bind-qcloud",
                meta: {
                    title: "腾讯云",
                    login: true,
                },
                component: () => import("@/apps/vendor/bind_qcloud.vue"),
            },
            {
                path: "/vendor/bind/cloudflare/:id",
                name: "vendor-bind-cloudflare",
                meta: {
                    title: "Cloudflare",
                    login: true,
                },
                component: () => import("@/apps/vendor/bind_cloudflare.vue"),
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
