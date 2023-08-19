import { useEffect, useState } from 'react'
import { storage } from 'front/utils/storage'

type Props<T> = {
  func: (params?: any) => Promise<T>
  params?: any
  cacheKey?: string
  expiresIn?: number
}

export function useQuery<T = any>({ cacheKey, expiresIn = 10000, func, params }: Props<T>) {
  const [data, setData] = useState<T>()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleData = () => {
    const page = params?.page
    const key = cacheKey ? (page ? `${cacheKey}_${page}` : cacheKey) : undefined
    
    if (key) {
      const storedData = storage.getItem(key)
      if (storedData) { 
        setData(storedData)
        setSuccess(true)
        return
      }
    }

    setLoading(true)
    func(params)
      .then(responseData => {
        setData(responseData)
        setSuccess(true)
        if (key) storage.setItem(key, responseData, expiresIn)
      })
      .catch(error => {
        console.log('Error getting users:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(handleData, [params?.page])

  return { data, loading, success }
}
