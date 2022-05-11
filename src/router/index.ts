import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Index from '@/views/index.vue'

type RouteRecordRawWrap = RouteRecordRaw

// 配置路由信息
const routes: Array<RouteRecordRawWrap> = [
  { path: '/login',des:'登录', component: () => import('@/views/login/index.vue') },
  { path: '/store',des:'store' ,component: () => import('@/views/store/index.vue') },
  {
    path: '/:pathMatch(.*)',
    components: {
      routerNav: Index
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export {routes}
export default router
