import { RouteRecordRaw } from "vue-router"

import layout from "@/apps/layout/index.vue"

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/dashboard",
    },
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
                    cloud: true,
                },
                component: () => import("@/apps/dashboard/index.vue"),
            },
            {
                path: "/dnspod/index",
                name: "dnspod-index",
                meta: {
                    title: "域名解析",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/dnspod/index.vue"),
            },
            {
                path: "/dnspod/detail/:domain",
                name: "dnspod-detail",
                meta: {
                    title: "域名详情",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/dnspod/detail.vue"),
            },
            {
                path: "/lighthouse/index",
                name: "lighthouse-index",
                meta: {
                    title: "轻量服务器",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/lighthouse/index.vue"),
            },
            {
                path: "/lighthouse/detail/:zone/:instanceId",
                name: "lighthouse-detail",
                meta: {
                    title: "轻量服务器详情",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/lighthouse/detail.vue"),
            },
            {
                path: "/lighthouse/vnc/:zone/:instanceId",
                name: "lighthouse-vnc",
                meta: {
                    title: "轻量服务器 VNC",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/lighthouse/vnc.vue"),
            },
            {
                path: "/terminal/ssh/:addr*",
                name: "terminal-ssh",
                meta: {
                    title: "SSH 终端",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/terminal/ssh.vue"),
            },
            {
                path: "/tat/index",
                name: "tat-index",
                meta: {
                    title: "TAT",
                    login: true,
                    cloud: true,
                },
                component: () => import("@/apps/tat/index.vue"),
            },
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
            {
                path: "/keypod/secret",
                name: "keypod-secret",
                meta: {
                    title: "密钥管理",
                    login: true,
                },
                component: () => import("@/apps/keypod/secret.vue"),
            },
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
