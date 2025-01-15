export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean
  // 格式化请求参数时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean
  // 是否加入url
  joinPrefix?: boolean
  // 接口地址
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode
  // 是否加入时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 是否在header中发送token
  withToken?: boolean
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
} 
