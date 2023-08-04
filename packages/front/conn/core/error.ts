import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface IApiErrorMeta {
  err: any
  request: {
    baseURL: string
    data: any
    headers: any
    method: string
    params: any
    url: string
  }
  response?: {
    data?: any
    status: number
  }
}

class AppError<T = any> extends Error {
  public readonly extraData: T
  public readonly ignoreLog: boolean

  constructor(message: string, extraData?: T, ignoreLog = true) {
    super(message)
    this.extraData = extraData as T
    this.ignoreLog = ignoreLog
  }
}

export class ApiError extends AppError<IApiErrorMeta> {
  public readonly status: number
  public readonly data: any

  constructor(request: AxiosRequestConfig, axiosResponse: AxiosResponse, err: any) {
    const response = !axiosResponse
      ? { data: '', status: -1 }
      : { data: axiosResponse.data, status: axiosResponse.status }

    delete err.request
    delete err.response
    delete err.config

    super(
      'api-error',
      {
        err,
        request: {
          baseURL: request.baseURL!,
          data: request.data,
          headers: request.headers,
          method: request.method!,
          params: request.params,
          url: request.url!,
        },
        response,
      },
      response.status < 500
    )

    this.status = response.status
    this.data = response.data
  }
}
