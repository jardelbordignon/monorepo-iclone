import { ICacheProvider } from '../i-cache-provider'

interface ICacheData {
  [key: string]: string
}

export class MemoryCacheProvider implements ICacheProvider {
  private cache: ICacheData = {}

  public async set(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value)
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = this.cache[key]
    if (!data) return null
    return JSON.parse(data) as T
  }

  public async remove(key: string): Promise<void> {
    delete this.cache[key]
  }

  public async removePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`))

    keys.forEach(key => this.remove(key))
  }
}
