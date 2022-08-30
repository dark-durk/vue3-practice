import { RouteRecordRaw } from 'vue-router'

const directiveRoutes: Array<RouteRecordRaw> = [
  {
    path: '/directives/hideTips',
    des: 'hideTips指令测试',
    component: () => import('@/views/directivesTest/DirectivesTest1.vue'),
  },
]

export default directiveRoutes
