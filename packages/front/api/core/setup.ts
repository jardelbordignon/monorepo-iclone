/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'

import { storage } from 'front/utils/storage'

let isRefreshing = false
let failedRequestsQueue: any[] = []

class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token')
  }
}

export function setupApi(baseURL: string, debugMode: boolean) {
  if (debugMode) console.log('baseURL: ', baseURL)
  const authLoginResponse = storage.get('authLoginResponse')

  const api = axios.create({ baseURL })

  api.interceptors.request.use(
    async config => {
      if (authLoginResponse?.accessToken) {
        config.headers['Authorization'] = `Bearer ${authLoginResponse.accessToken}`
      }

      if (config.data) {
        const isFormData = config.data instanceof FormData
        config.headers['Content-Type'] = isFormData
          ? 'multipart/form-data'
          : 'application/json'
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => response,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        if (error.response.data.code === 'token.expired') {
          if (debugMode)
            console.log(
              'setup error.response',
              JSON.stringify(error.response, null, 2)
            )
          const originalRequestConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh')
              .then(res => {
                const refreshedAccessToken = res.data.access_token

                if (refreshedAccessToken) {
                  //AsyncStorage.setItem('accessToken', refreshedAccessToken)

                  failedRequestsQueue.forEach(request =>
                    request.onSuccess(refreshedAccessToken)
                  )
                }
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err))
              })
              .finally(() => {
                isRefreshing = false
                failedRequestsQueue = []
              })
          }

          return new Promise((resolve, reject) => {
            if (originalRequestConfig) {
              failedRequestsQueue.push({
                onFailure: (err: AxiosError) => reject(err),
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization = `Bearer ${token}`

                  resolve(api(originalRequestConfig))
                },
              })
            }
          })
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      // se for um erro direfente de 401 então será tratado no retorno
      //return Promise.reject(error.data.message.toJSON())
      return Promise.reject(error.response)

      // get error messages
      // .catch(err => {
      //   let errorMsgs = ''
      //   err.data.message.forEach((e: any) => (errorMsgs += e))
    }
  )

  return api
}
