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
                path: "/certbot/list",
                name: "certbot-list",
                meta: {
                    title: "证书列表",
                    login: true,
                },
                component: () => import("@/apps/certbot/list.vue"),
            },
            {
                path: "/certbot/detail/:id",
                name: "certbot-detail",
                meta: {
                    title: "证书详情",
                    login: true,
                },
                component: () => import("@/apps/certbot/detail.vue"),
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
                path: "/passport/profile",
                name: "passport-profile",
                meta: {
                    title: "个人资料",
                    login: true,
                },
                component: () => import("@/apps/passport/profile.vue"),
            },
            //////
            {
                path: "/script/list",
                name: "script-list",
                meta: {
                    title: "脚本管理",
                    login: true,
                },
                component: () => import("@/apps/script/list.vue"),
            },
            //////
            {
                path: "/taskline/list",
                name: "taskline-list",
                meta: {
                    title: "任务记录",
                    login: true,
                },
                component: () => import("@/apps/taskline/list.vue"),
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
                path: "/keypair/list",
                name: "keypair-list",
                meta: {
                    title: "密钥管理",
                    login: true,
                },
                component: () => import("@/apps/keypair/list.vue"),
            },
            //////
            {
                path: "/vendor/alibaba",
                name: "vendor-alibaba",
                meta: {
                    title: "阿里云",
                    login: true,
                },
                component: () => import("@/apps/vendor/alibaba.vue"),
            },
            {
                path: "/vendor/alibaba/:id",
                name: "vendor-alibaba-bind",
                meta: {
                    title: "阿里云",
                    login: true,
                },
                component: () => import("@/apps/vendor/alibaba_bind.vue"),
            },
            {
                path: "/vendor/cloudflare",
                name: "vendor-cloudflare",
                meta: {
                    title: "Cloudflare",
                    login: true,
                },
                component: () => import("@/apps/vendor/cloudflare.vue"),
            },
            {
                path: "/vendor/cloudflare/:id",
                name: "vendor-cloudflare-bind",
                meta: {
                    title: "Cloudflare",
                    login: true,
                },
                component: () => import("@/apps/vendor/cloudflare_bind.vue"),
            },
            {
                path: "/vendor/tencent",
                name: "vendor-tencent",
                meta: {
                    title: "腾讯云",
                    login: true,
                },
                component: () => import("@/apps/vendor/tencent.vue"),
            },
            {
                path: "/vendor/tencent/:id",
                name: "vendor-tencent-bind",
                meta: {
                    title: "腾讯云",
                    login: true,
                },
                component: () => import("@/apps/vendor/tencent_bind.vue"),
            },
            {
                path: "/vendor/worker",
                name: "vendor-worker-bind",
                meta: {
                    title: "节点管理",
                    login: true,
                },
                component: () => import("@/apps/vendor/worker_bind.vue"),
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
        path: "/passport/login",
        name: "passport-login",
        meta: {
            title: "登录",
        },
        component: () => import("@/apps/passport/login.vue"),
    },
    {
        path: "/passport/register",
        name: "passport-register",
        meta: {
            title: "注册",
        },
        component: () => import("@/apps/passport/register.vue"),
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
