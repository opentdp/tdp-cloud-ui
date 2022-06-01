import { createRouter, createWebHashHistory } from 'vue-router'

import vHome from '@/apps/home/index.vue'

const routes = [
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
        path: '/user',
        name: 'user',
        meta: {
          title: '个人中心',
        },
        component: () => import('@/apps/user.vue'),
      },
      {
        path: '/403',
        name: '403',
        meta: {
          title: '没有权限',
        },
        component: () => import('@/apps/error/403.vue'),
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面',
        },
        component: () => import('@/apps/error/404.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/apps/login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - TDP Cloud`
  const username = localStorage.getItem('vt_username')
  const password = localStorage.getItem('vt_password')
  if ((!username && !password) && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
