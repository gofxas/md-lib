import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
        path: '/',
        name:'Home',
        component: () => import("../views/home.vue"),
        meta: {
          title: "home",
        }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
})
router.afterEach((to, from) => {})

export default router;