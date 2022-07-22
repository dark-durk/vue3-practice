import { isObject } from '@/utils/is'
import { clone } from 'lodash'
import { Services, ServicesOptions } from './interface'
import { VAxios } from './Axios'
import { CreateAxiosOptions } from './axiosTransform'
import { ErrMessageMode } from './checkStatus'
import { transformInstance } from './transformInstance'

const servicesOptions: ServicesOptions = {
  userSvc: {
    timeout: 40000
  },
  socialSvc: {
    timeout: 40000
  },
  testSvc: {
    timeout: 40000
  },
  webSvc: {
    timeout: 40000
  },
  fileSvc: {
    timeout: 40000
  },
  canvasSvc: {
    timeout: 40000
  },
  searchSvc: {
    timeout: 40000
  },
  dwgSvc: {
    timeout: 40000
  },
  mockSvc: {
    timeout: 40000
  }
}

servicesOptions.userSvc.baseURL = import.meta.env.VITE_USERAPI
servicesOptions.socialSvc.baseURL = import.meta.env.VITE_SOCIALAPI
servicesOptions.webSvc.baseURL = import.meta.env.VITE_WEBAPI
servicesOptions.fileSvc.baseURL = import.meta.env.VITE_FILEAPI
servicesOptions.canvasSvc.baseURL = import.meta.env.VITE_CANVASAPI
servicesOptions.searchSvc.baseURL = import.meta.env.VITE_SEARCHAPI
servicesOptions.dwgSvc.baseURL = import.meta.env.VITE_DWG
servicesOptions.testSvc.baseURL = import.meta.env.VITE_TESTAPI
servicesOptions.mockSvc.baseURL = import.meta.env.VITE_MOCK_API

function getServices(options: ServicesOptions): Services {
  return Object.keys(options).reduce((res, svcName) => {
    const config = deepMerge(options[svcName], {
      transform: clone(transformInstance),
      requestOptions: {
        isReturnNativeResponse: false,
        isTransformResponse: true,
        ignoreCancelToken: true,
        errMessageMode: ErrMessageMode.MESSAGE
      }
    }) as CreateAxiosOptions
    res[svcName] = new VAxios(config)
    return res
  }, {}) as Services
}

function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export default getServices(servicesOptions)
