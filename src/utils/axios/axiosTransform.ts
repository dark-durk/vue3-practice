import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from '@/types/axios'
import { VAxios } from './Axios'

/*
 * 创建axios对象的参数配置
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

/*
 * 数据处理类
 * beforeRequestHook=>requestInterceptors=>responseInterceptors =>beforeResponseHook
 */
export abstract class AxiosTransform {
  /**
   * 处理请求前的options参数 加工函数
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * 处理请求成功后的数据
   */
  beforeResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * 请求拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 响应拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>, axios: VAxios) => AxiosResponse<any>

  /**
   * @description: 请求拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 响应拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}
