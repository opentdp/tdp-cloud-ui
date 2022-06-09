import { createRouter, createWebHashHistory } from 'vue-router';

import sessionStore from '@/store/session';

import { routes } from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - TDP Cloud`;

    const session = sessionStore();

    const isLogin = !!session.token;
    const isSecret = session.keyid > 0;

    if (to.meta.login && !isLogin) {
        next('/user/login');
        return;
    }

    if (to.meta.secret && !isSecret) {
        next('/user/secret');
        return;
    }

    next();
});

export default (app: any) => {
    app.use(router);
};
