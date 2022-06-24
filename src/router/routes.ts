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
                    secret: true,
                },
                component: () => import("@/apps/dashboard/index.vue"),
            },
            {
                path: "/dnspod/index",
                name: "dnspod-index",
                meta: {
                    title: "域名解析",
                    login: true,
                    secret: true,
                },
                component: () => import("@/apps/dnspod/index.vue"),
            },
            {
                path: "/lighthouse/index",
                name: "lighthouse-index",
                meta: {
                    title: "轻量服务器",
                    login: true,
                    secret: true,
                },
                component: () => import("@/apps/lighthouse/index.vue"),
            },
            {
                path: "/lighthouse/detail/:zone/:instanceId",
                name: "lighthouse-detail",
                meta: {
                    title: "轻量服务器详情",
                    login: true,
                    secret: true,
                },
                component: () => import("@/apps/lighthouse/detail.vue"),
            },
            {
                path: "/user/info",
                name: "user-info",
                meta: {
                    title: "个人中心",
                    login: true,
                },
                component: () => import("@/apps/user/info.vue"),
            },
            {
                path: "/user/password",
                name: "user-password",
                meta: {
                    title: "修改密码",
                    login: true,
                },
                component: () => import("@/apps/user/password.vue"),
            },
            {
                path: "/user/secret",
                name: "user-secret",
                meta: {
                    title: "密钥管理",
                    login: true,
                },
                component: () => import("@/apps/user/secret.vue"),
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
        path: "/user/login",
        name: "user-login",
        meta: {
            title: "登录",
        },
        component: () => import("@/apps/user/login.vue"),
    },
    {
        path: "/user/register",
        name: "user-register",
        meta: {
            title: "注册",
        },
        component: () => import("@/apps/user/register.vue"),
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
