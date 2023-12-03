import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import layoutStore from '@/store/layout';
import sessionStore from '@/store/session';

import { routes } from '@/apps/routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const layout = layoutStore();
    const session = sessionStore();

    // 设置页面标题
    document.title = `${to.meta.title} - ${layout.SiteName}`;

    // 未登录跳转到登录页
    if (to.meta.login && !session.validToken()) {
        next('/passport/login');
        return;
    }

    // 非管理员提示无权限
    if (to.meta.admin && session.Level != 1) {
        next('/error/403');
        return;
    }

    next();
});

// export default

export default (app: App) => {
    app.use(router);
};
