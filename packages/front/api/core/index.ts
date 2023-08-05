import { AxiosError, AxiosProgressEvent, Method } from 'axios'

import { env } from 'front/config/env'

import { ApiError } from './error'
import { setupApi } from './setup'

class Api {
  public delete<T = any>(endpoint: string, params?: any): Promise<T> {
    return this.request<T>('DELETE', endpoint, params)
  }

  public get<T = any>(endpoint: string, params?: any): Promise<T> {
    return this.request<T>('GET', endpoint, params)
  }

  public patch<T = any>(endpoint: string, body: any): Promise<T> {
    return this.request<T>('PATCH', endpoint, body)
  }

  public post<T = any>(endpoint: string, body: any): Promise<T> {
    return this.request<T>('POST', endpoint, body)
  }

  public put<T = any>(endpoint: string, body: any): Promise<T> {
    return this.request<T>('PUT', endpoint, body)
  }

  public upload<T = any>(
    url: string,
    data: FormData,
    onProgress: (progress: number) => void
  ): Promise<T> {
    return this.request<T>('POST', url, data, onProgress)
  }

  private async request<T = any>(
    method: Method,
    endpoint: string,
    data?: any,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    try {
      onProgress && onProgress(0)

      const request = setupApi(env.baseUrl, env.debugMode).request({
        data: ['POST', 'PUT', 'PATCH'].includes(method) ? data : null,
        method,
        onUploadProgress: (progress: AxiosProgressEvent) => {
          if (onProgress && progress.total)
            onProgress((progress.loaded / progress.total) * 100)
        },
        params: method === 'GET' ? data : null,
        url: endpoint,
      })

      const response = await request
      onProgress && onProgress(100)

      return response.data
    } catch (err: any) {
      return this.handleError<T>(err)
    }
  }

  private async handleError<T>(err: AxiosError): Promise<T> {
    //if (env.debugMode) console.log('api handleError', JSON.stringify(err, null, 2))
    if (!err) return
    if (!err.config || !err.response) throw err
    throw new ApiError(err.config, err.response, err)
  }
}

export const api = new Api()
