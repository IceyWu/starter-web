import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/layout.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        name: "index",
        path: "/index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/index"),
        meta: {
          title: "主页",
        },
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/views/user"),
    meta: {
      title: "会员中心",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
