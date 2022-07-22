import { isFunction } from '@/utils/is'
import axios, { AxiosRequestConfig, Canceler } from 'axios'

// 取消请求的集合
let pendingMap = new Map<string, Canceler>()

// 根据请求方法和地址生成pendingMap中的key
export const createPendingKey = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')

/*
 * 封装axios的canceler
 */
export class AxiosCanceler {
  /*
   * 添加一个canceler对象
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const key = createPendingKey(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(key)) {
          pendingMap.set(key, cancel)
        }
      })
  }

  /*
   * 移除一个canceler
   */
  removePending(config: AxiosRequestConfig): void {
    const key = createPendingKey(config)
    if (pendingMap.has(key)) {
      // 如果pendingMap中存在请求，就取消和移除
      const cancel = pendingMap.get(key)
      cancel && cancel(key)
      pendingMap.delete(key)
    }
  }

  /*
   *  取消所有请求
   */
  removeAllPending(): void {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /*
   * reset pendingMap
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
