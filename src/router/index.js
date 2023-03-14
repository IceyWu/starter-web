import { createRouter, createWebHashHistory } from 'vue-router'
// component: () => import('@/layout/layout.vue'),
import Layout from '~/layout/layout.vue'

const baseRouters = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
  // },
  // 404
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   redirect: '/404',
  //   component: Layout,
  //   meta: {
  //     title: '404',
  //     keepAlive: false,
  //     isShowBreadcrumb: false,
  //   },
  //   children: [
  //     {
  //       path: '/404',
  //       name: '404',
  //       component: () =>
  //         import(/* webpackChunkName: "404" */ '@/views/error/404'),
  //       meta: {
  //         title: '404',
  //         keepAlive: false,
  //         isShowBreadcrumb: false,
  //       },
  //     },
  //   ],
  // },
]
const routes = [
  {
    path: '/',
    name: 'base',
    redirect: '/index',
    component: Layout,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "Index" */ '~/pages/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRouters, ...routes],
})

export { routes, router }
