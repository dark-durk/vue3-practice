import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import cssAttrsRoutes from './cssAttrs'
import domAttrsRoutes from './domAttrs'
import directiveRoutes from './directives'

// 配置路由信息
let routes: Array<RouteRecordRaw> = [
  { path: '/login', des: '登录', component: () => import('@/views/login/index.vue') },
  { path: '/store', des: 'store', component: () => import('@/views/store/index.vue') },
  {
    path: '/:pathMatch(.*)',
    des: '路由导航',
    components: {
      routerNav: () => import('@/views/login/index.vue'),
    },
  },
]
routes = routes.concat(cssAttrsRoutes).concat(domAttrsRoutes).concat(directiveRoutes)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export { routes }
export default router
