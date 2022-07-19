import { _RouteRecordBase } from 'vue-router'
/**
 * 拓展vue-router模块声明
 */
declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean | string | number
    des?: string
  }
}
// export * from 'vue-router'
// declare module 'vue-router' {
//   export interface _RouteRecordBase {
//     des: string
//   }
// }

// declare global {
//   interface Window {
//     /** 兼容之前写法的类型声明 */
//     messageModal: any
//     renameFun: any
//   }
// }
// export {}
