import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}

type Merge<F, S> = IntersectionToObj<Omit<F, keyof S> & S>
interface MyParams {
  des: string
}
type RouteRecordRawWrap = Merge<MyParams, RouteRecordRaw>

// 配置路由信息
const routes: Array<RouteRecordRawWrap> = [
  { path: '/login', des: '登录', component: () => import('@/views/login/index.vue') },
  { path: '/store', des: 'store', component: () => import('@/views/store/index.vue') },
  {
    path: '/:pathMatch(.*)',
    des: '路由导航',
    components: {
      routerNav: () => import('@/views/index.vue'),
    },
  },
  {
    path: '/dom-attrs',
    des: 'tabindex',
    component: () => import('@/views/domAttrs/TestTabindex.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export { routes }
export default router
