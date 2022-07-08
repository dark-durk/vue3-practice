export * from 'vue-router'
declare module 'vue-router' {
  export interface _RouteRecordBase {
    des: string
  }
}

declare global {
  interface Window {
    /** 兼容之前写法的类型声明 */
    messageModal: any
    renameFun: any
  }
}
// export {}
