import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

type GetItemOpts = {
  checkExpiryDate?: boolean
  deleteExpired?: boolean
}

class Storage {
  public getItem<T = any>(key: string, opts?: GetItemOpts): T {
    const data = mmkv.getString(key)
    if (!data) return null
    const parsedData = JSON.parse(data)
    if (
      opts?.checkExpiryDate &&
      parsedData.expiry &&
      parsedData.expiry < Date.now()
    ) {
      if (opts.deleteExpired) mmkv.delete(key)
      return null
    }
    return parsedData.value
  }

  public setItem(key: string, value: any, ttlMinutes = 0) {
    let data: unknown = { value }
    if (ttlMinutes) {
      data = {
        expiry: Date.now() + ttlMinutes * 1000 * 60,
        value,
      }
    }
    mmkv.set(key, JSON.stringify(data))
  }

  public removeItem(key: string) {
    mmkv.delete(key)
  }
}

export const storage = new Storage()
