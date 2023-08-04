import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

class Storage {
  public get<T = any>(key: string): T {
    const data = mmkv.getString(key)
    return data ? JSON.parse(data) : null
  }

  public set(k: string, v: any) {
    mmkv.set(k, JSON.stringify(v))
  }

  public del(k: string) {
    mmkv.delete(k)
  }
}

export const storage = new Storage()
