import { AxiosResponse } from 'axios'
import { getToken, removeReToken, removeToken } from '@/core/webStore/cookie'
import store from '@/store'
import { VAxios } from './Axios'
import message from '@/utils/message'

export enum ErrMessageMode {
  // 弹框，不显示，打印
  MESSAGE,
  NONE,
  LOG,
}

export function checkStatus(code: number, msg: string, errMessageMode: ErrMessageMode): void {
  // console.log(code, msg)
  switch (code) {
    case 200:
    case 40100:
    case 40104:
      errMessageMode = ErrMessageMode.NONE
      break
    default:
  }

  if (errMessageMode === ErrMessageMode.MESSAGE) {
    message.error(msg)
  } else if (errMessageMode === ErrMessageMode.LOG) {
    console.log(msg)
  }
}

// 本项目实现无痛刷新token的方式：先发起请求，拦截响应的数据，如果返回token过期，暂存当前接口，进行token刷新，刷新后在进行请求。
// 防止refreshToken接口还没返回,此时再有一个过期的请求进来
let isTokenRefreshing = false
// 暂存的请求队列
let requestQueen: Function[] = []
/*
 * token失效,40100和40104的处理
 */
export function checkToken(response: AxiosResponse, axios: VAxios) {
  const result = response.data
  const codes = [40100, 40104]
  if (result && !codes.includes(result.code)) return result
  if (codes.includes(result.code)) {
    const pathname = window.location.pathname
    if (result.code === 40104) {
      removeToken()
      removeReToken()
      message.error(result.msg)
      window.location.href = '/user?url=' + decodeURI(window.location.href)
    }
    console.log('**************', isTokenRefreshing)
    if (!isTokenRefreshing) {
      isTokenRefreshing = true
      console.log('**************', isTokenRefreshing)
      // 刷新token
      store
        .dispatch('user/refreshToken')
        .then((res: any) => {
          console.log(res)
          const { code } = res
          if (code !== 200) {
            // 单设备登录，防止顶替
            store.dispatch('user/resetToken').then(() => location.reload())
          }
          // 重置请求头
          response.config.headers.Authorization = getToken()
          // 重新请求 暂存队列中的网络请求 清空队列
          requestQueen.forEach(cb => cb(getToken()))
          requestQueen = []
          // return service(response.config)
          axios.configAxios(response.config)
        })
        .catch((res: any) => {
          // 无法刷新token 跳转到登录界面
          if (response.config.url === '/auth/refresh') {
            // 清空token 刷新文档
            store.dispatch('user/resetToken').then(() => {
              window.location.href = '/user'
            })
          }
        })
        .finally(() => (isTokenRefreshing = false))
    }
    // 正在刷新token
    return new Promise((resolve: Function) => {
      requestQueen.push(() => {
        response.config.baseURL = ''
        response.config.headers.Authorization = getToken()
        // return service(response.config)
        axios.configAxios(response.config)
      })
    })
  }
  return result
}
