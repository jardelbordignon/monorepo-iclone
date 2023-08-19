import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

class Storage {
  public getItem<T = any>(key: string): T {
    const data = mmkv.getString(key)
    if (!data) return null as T
    const parsedData = JSON.parse(data)
    if (parsedData.expiry && parsedData.expiry < Date.now()) {
      mmkv.delete(key)
      return null as T
    }
    return parsedData.value
  }

  public setItem(key: string, value: unknown, expiresIn = 0) {
    let data: unknown = { value }
    if (expiresIn) {
      data = {
        expiry: Date.now() + expiresIn,
        value,
      }
    }
    mmkv.set(key, JSON.stringify(data))
  }

  public removeItem(key: string) {
    mmkv.delete(key)
  }

  public removeAllThatStartWith(key: string) {
    mmkv.getAllKeys().forEach(k => {
      if (k.startsWith(key)) mmkv.delete(k)
    })
  }
}

export const storage = new Storage()
