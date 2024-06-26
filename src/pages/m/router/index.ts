import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from '@/store'
import Layout from '../layout/Index.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: '',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "chunk-m" */ '../views/Home/Home.vue'),
      },
      {
        path: '/blocks',
        name: 'blocks',
        component: () =>
          import(
            /* webpackChunkName: "chunk-m" */ '../views/Blocks/Blocks.vue'
            ),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let endTid = setTimeout(function () {})
  // @ts-ignore
  for (let i = 0; i <= endTid; i++) {
    clearTimeout(i)
    clearInterval(i)
  }
  store.commit('INIT_MSG_CONFIG')
  next()
})
router.beforeEach((to, from, next) => {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    next()
  } else {
    ;(window as any).location.href = process.env.VUE_APP_WEB_URL + '/m'
  }
})
export default router;
