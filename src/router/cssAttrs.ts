import { RouteRecordRaw } from 'vue-router'
const CssAttrsIndex = () => import('@/views/cssAttrs/index.vue')

const cssAttrsRoutes: Array<RouteRecordRaw> = [
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
      {
        path: '/css-attrs/black-white-fish',
        component: () => import('@/views/cssAttrs/BlackWhiteFish.vue'),
        des: '太极黑白鱼',
      },
    ],
  },
]
export default cssAttrsRoutes
