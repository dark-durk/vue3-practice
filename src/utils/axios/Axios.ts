import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { cloneDeep, isObject } from 'lodash'
import { RequestOptions, Result } from '@/types/axios'
import { is, isFunction } from '@/utils/is'
import { AxiosCanceler } from './axiosCancel'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'

/*
 * 对axios的二次封装
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setInterceptors()
  }

  /*
   * 获取axios实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /*
   *  创建一个axios实例
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  /*
   *  重新配置axios
   */
  configAxios(config: CreateAxiosOptions): void {
    if (!this.axiosInstance) return
    this.createAxios(config)
  }

  /*
   * 设置请求头
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) return
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /*
   * 获取 数据加工对象
   */
  private getTransform(): AxiosTransform {
    const { transform } = this.options
    return transform
  }

  /*
   * 设置拦截器
   */
  private setInterceptors(): void {
    const transform = this.getTransform()
    if (!transform) return
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform
    const axiosCanceler = new AxiosCanceler()
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken
      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // 请求拦截器错误处理
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res, this)
      }
      return res
    }, undefined)

    // 响应错误处理
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  get<T = any>(config: AxiosRequestConfig | string, options?: RequestOptions): Promise<T> {
    if (isObject(config)) {
      return this.request({ ...config, method: 'GET' }, options)
    }
    return this.request({ url: config as string, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig | string, options?: RequestOptions): Promise<T> {
    if (isObject(config)) {
      return this.request({ ...config, method: 'POST' }, options)
    }
    return this.request({ url: config as string, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig | string, options?: RequestOptions): Promise<T> {
    if (isObject(config)) {
      return this.request({ ...config, method: 'PUT' }, options)
    }
    return this.request({ url: config as string, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig | string, options?: RequestOptions): Promise<T> {
    if (isObject(config)) {
      return this.request({ ...config, method: 'DELETE' }, options)
    }
    return this.request({ url: config as string, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, beforeResponseHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (beforeResponseHook && isFunction(beforeResponseHook)) {
            try {
              const ret = beforeResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
}
