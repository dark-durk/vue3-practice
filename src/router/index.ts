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

const DomAttrsIndex = () => import('@/views/domAttrs/index.vue')
const CssAttrsIndex = () => import('@/views/cssAttrs/index.vue')

// 配置路由信息
const routes: Array<RouteRecordRawWrap> = [
  { path: '/login', des: '登录', component: () => import('@/views/login/index.vue') },
  { path: '/store', des: 'store', component: () => import('@/views/store/index.vue') },
  {
    path: '/:pathMatch(.*)',
    des: '路由导航',
    components: {
      routerNav: () => import('@/views/login/index.vue'),
    },
  },
  {
    path: '/dom-attrs',
    des: 'dom属性',
    component: DomAttrsIndex,
    children: [
      {
        path: '/dom-attrs/tabindex',
        component: () => import('@/views/domAttrs/TestTabindex.vue'),
        des: 'tabindex属性',
      },
    ],
  },
  {
    path: '/css-attrs',
    des: 'css属性',
    component: CssAttrsIndex,
    children: [
      {
        path: '/css-attrs/shape-outside',
        component: () => import('@/views/cssAttrs/TestShapeOutside.vue'),
        des: 'shape-outside',
      },
      {
        path: '/css-attrs/irregular-shape',
        component: () => import('@/views/cssAttrs/TestIrregularShape.vue'),
        des: '不规则图形绘制',
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export { routes }
export default router
