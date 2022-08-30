import { RouteRecordRaw } from 'vue-router'

const DomAttrsIndex = () => import('@/views/domAttrs/index.vue')

const domAttrsRoutes: Array<RouteRecordRaw> = [
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
]
export default domAttrsRoutes
