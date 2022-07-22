import { ErrMessageMode } from '@/utils/axios/checkStatus'

/*
 * 自定义request配置,可在独立的接口中覆盖
 */
export interface RequestOptions {
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean
  // 是否过滤code，msg属性，默认为true，不返回code，msg属性；如果改为false需要自己处理code！==200的error
  isTransformResponse?: boolean
  // 是否使用cancelToken
  ignoreCancelToken?: boolean
  // 错误信息是否弹出，‘’
  errMessageMode?: ErrMessageMode
  // 请求成功提示信息，code===200
  successMsg?: string
}

export interface Result<T = any> {
  code: number
  msg: string
  success?: boolean
  data?: T
}
