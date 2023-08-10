import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("../views/home.vue"),
      meta: {
        title: "Home",
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import("../views/setting.vue"),
      meta: {
        title: "Setting",
      }
    },
    {
      path: '/backup',
      name: 'Backup',
      component: () => import("../views/backup.vue"),
      meta: {
        title: "Backup",
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
})
router.afterEach((to, from) => { })

export default router;