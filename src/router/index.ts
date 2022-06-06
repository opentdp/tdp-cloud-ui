import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import vHome from '@/apps/home/index.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'home',
        component: vHome,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                },
                component: () => import('@/apps/dashboard.vue'),
            },
            {
                path: '/user/info',
                name: 'user-info',
                meta: {
                    title: '个人中心',
                },
                component: () => import('@/apps/user/info.vue'),
            },
            {
                path: '/error/403',
                name: 'error-403',
                meta: {
                    title: '没有权限',
                },
                component: () => import('@/apps/error/403.vue'),
            },
            {
                path: '/error/404',
                name: 'error-404',
                meta: {
                    title: '找不到页面',
                },
                component: () => import('@/apps/error/404.vue'),
            },
        ],
    },
    {
        path: '/user/login',
        name: 'user-login',
        meta: {
            title: '登录',
        },
        component: () => import('@/apps/user/login.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - TDP Cloud`;

    const token = localStorage.getItem('vt_token');
    const keyid = localStorage.getItem('vt_keyid');

    if ((!token || !keyid) && to.path !== '/user/login') {
        next('/user/login');
    } else {
        next();
    }
});

export default router;
