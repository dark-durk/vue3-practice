import { VAxios } from './Axios'

type KeyOfServices =
  | 'socialSvc'
  | 'userSvc'
  | 'webSvc'
  | 'fileSvc'
  | 'canvasSvc'
  | 'searchSvc'
  | 'dwgSvc'
  | 'testSvc'
  | 'mockSvc'
export type ServicesOptions = {
  [key in KeyOfServices]: {
    baseURL?: string
    timeout?: number
  }
}

// export type Services = Record<keyof ServicesOptions, AxiosInstance>
export type Services = Record<keyof ServicesOptions, VAxios>
