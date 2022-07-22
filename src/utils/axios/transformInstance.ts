import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getReToken, getToken } from '@/core/webStore/cookie'
import { RequestOptions, Result } from '@/types/axios'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { checkStatus, checkToken, ErrMessageMode } from './checkStatus'
import { VAxios } from './Axios'
import message from '@/utils/message'
import { CodeError } from './error'

export const transformInstance: AxiosTransform = {
  /*
   * 响应后的数据处理
   */
  beforeResponseHook(res: AxiosResponse<Result>, options: RequestOptions) {
    // status是200但是 res.code不是
    const {
      isReturnNativeResponse,
      isTransformResponse,
      successMsg,
      errMessageMode = ErrMessageMode.MESSAGE,
    } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }

    const responseData = res.data
    if (!responseData) {
      throw new Error('request Failed')
    }
    const { code, msg = '数据错误', data } = responseData
    if (responseData && 'code' in responseData) {
      if (code === 200) {
        successMsg && message.success(successMsg)
        return data
      } else {
        checkStatus(code, msg, errMessageMode)
        throw new CodeError('code!==200')
      }
    }
    throw new Error('request Failed')
  },
  /*
   * 请求拦截器
   */
  requestInterceptors(config: AxiosRequestConfig, options: CreateAxiosOptions) {
    if (getToken()) {
      const { url } = config
      // 刷新token时, token需要改变
      if (url === '/auth/refresh') {
        config.headers.Authorization = getReToken()
      } else {
        // 每次请求头部添加 token
        config.headers.Authorization = getToken()
      }
    }
    return config
  },
  /*
   * 响应拦截器
   */
  responseInterceptors: (res: AxiosResponse<any>, axios: VAxios) => {
    checkToken(res, axios)
    return res
  },
  /*
   *  响应错误处理 status状态码非2xx
   */
  responseInterceptorsCatch: (err: any) => {
    const { response, config } = err || {}
    const errMessageMode = config?.requestOptions?.errMessageMode || ErrMessageMode.MESSAGE
    const { status, statusText } = response || {}
    const { error } = response?.data || {}
    const msg = statusText || error
    checkStatus(status, msg, errMessageMode)
    return Promise.reject(err)
  },
}
