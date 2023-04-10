import { RouteRecordRaw } from "vue-router"

import LayoutConsole from "./layout/console.vue"
import LayoutContent from "./layout/content.vue"

import HomeIndex from "./home/index.vue"

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "portal",
        component: LayoutContent,
        children: [
            {
                path: "/",
                name: "home-index",
                meta: {
                    title: "首页",
                },
                component: HomeIndex,
            },
        ],
    },
    //////
    {
        path: "/",
        name: "console",
        component: LayoutConsole,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "系统首页",
                    login: true,
                },
                component: () => import("./dashboard/index.vue"),
            },
            {
                path: "/user/list",
                name: "user-list",
                meta: {
                    title: "用户管理",
                    admin: true,
                    login: true,
                },
                component: () => import("./user/list.vue"),
            },
            {
                path: "/config/system",
                name: "config-system",
                meta: {
                    title: "系统参数",
                    admin: true,
                    login: true,
                },
                component: () => import("./config/system.vue"),
            },
            //////
            {
                path: "/certbot/list",
                name: "certbot-list",
                meta: {
                    title: "证书列表",
                    login: true,
                },
                component: () => import("./certbot/list.vue"),
            },
            {
                path: "/certbot/detail/:id",
                name: "certbot-detail",
                meta: {
                    title: "证书详情",
                    login: true,
                },
                component: () => import("./certbot/detail.vue"),
            },
            {
                path: "/certbot/deploy",
                name: "certbot-deploy",
                meta: {
                    title: "证书部署",
                    login: true,
                },
                component: () => import("./certbot/deploy.vue"),
            },
            //////
            {
                path: "/domain/list",
                name: "domain-list",
                meta: {
                    title: "域名列表",
                    login: true,
                },
                component: () => import("./domain/list.vue"),
            },
            {
                path: "/domain/detail/:id",
                name: "domain-detail",
                meta: {
                    title: "域名详情",
                    login: true,
                },
                component: () => import("./domain/detail.vue"),
            },
            //////
            {
                path: "/machine/list",
                name: "machine-list",
                meta: {
                    title: "主机列表",
                    login: true,
                },
                component: () => import("./machine/list.vue"),
            },
            {
                path: "/machine/detail/:id",
                name: "machine-detail",
                meta: {
                    title: "主机详情",
                    login: true,
                },
                component: () => import("./machine/detail.vue"),
            },
            {
                path: "/machine/vnc/:id",
                name: "machine-vnc",
                meta: {
                    title: "主机 VNC",
                    login: true,
                },
                component: () => import("./machine/vnc.vue"),
            },
            //////
            {
                path: "/passport/profile",
                name: "passport-profile",
                meta: {
                    title: "个人资料",
                    login: true,
                },
                component: () => import("./passport/profile.vue"),
            },
            //////
            {
                path: "/script/list",
                name: "script-list",
                meta: {
                    title: "脚本管理",
                    login: true,
                },
                component: () => import("./script/list.vue"),
            },
            //////
            {
                path: "/taskline/list",
                name: "taskline-list",
                meta: {
                    title: "任务记录",
                    login: true,
                },
                component: () => import("./taskline/list.vue"),
            },
            //////
            {
                path: "/terminal/ssh/:addr*",
                name: "terminal-ssh",
                meta: {
                    title: "SSH 连接",
                    login: true,
                },
                component: () => import("./terminal/ssh.vue"),
            },
            {
                path: "/keypair/list",
                name: "keypair-list",
                meta: {
                    title: "密钥管理",
                    login: true,
                },
                component: () => import("./keypair/list.vue"),
            },
            //////
            {
                path: "/vendor/alibaba",
                name: "vendor-alibaba",
                meta: {
                    title: "阿里云",
                    login: true,
                },
                component: () => import("./vendor/alibaba.vue"),
            },
            {
                path: "/vendor/alibaba/:id",
                name: "vendor-alibaba-bind",
                meta: {
                    title: "阿里云",
                    login: true,
                },
                component: () => import("./vendor/alibaba_bind.vue"),
            },
            {
                path: "/vendor/cloudflare",
                name: "vendor-cloudflare",
                meta: {
                    title: "Cloudflare",
                    login: true,
                },
                component: () => import("./vendor/cloudflare.vue"),
            },
            {
                path: "/vendor/cloudflare/:id",
                name: "vendor-cloudflare-bind",
                meta: {
                    title: "Cloudflare",
                    login: true,
                },
                component: () => import("./vendor/cloudflare_bind.vue"),
            },
            {
                path: "/vendor/tencent",
                name: "vendor-tencent",
                meta: {
                    title: "腾讯云",
                    login: true,
                },
                component: () => import("./vendor/tencent.vue"),
            },
            {
                path: "/vendor/tencent/:id",
                name: "vendor-tencent-bind",
                meta: {
                    title: "腾讯云",
                    login: true,
                },
                component: () => import("./vendor/tencent_bind.vue"),
            },
            {
                path: "/workhub/worker",
                name: "workhub-worker-bind",
                meta: {
                    title: "节点管理",
                    login: true,
                },
                component: () => import("./workhub/worker_bind.vue"),
            },
            //////
            {
                path: "/error/403",
                name: "error-403",
                meta: {
                    title: "没有权限",
                    login: true,
                },
                component: () => import("./error/403.vue"),
            },
            {
                path: "/error/404",
                name: "error-404",
                meta: {
                    title: "找不到页面",
                    login: true,
                },
                component: () => import("./error/404.vue"),
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
        component: () => import("./passport/login.vue"),
    },
    {
        path: "/passport/register",
        name: "passport-register",
        meta: {
            title: "注册",
        },
        component: () => import("./passport/register.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        meta: {
            title: "找不到页面",
            login: true,
        },
        component: () => import("./error/404.vue"),
    },
]
