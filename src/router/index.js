import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '@/layout/layout.vue'

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
          import(/* webpackChunkName: "Index" */ '@/views/index.vue'),
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
  routes
})

export default router
