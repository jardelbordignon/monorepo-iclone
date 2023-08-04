export interface ICacheProvider {
  get<T>(key: string): Promise<T | null>
  remove(key: string): Promise<void>
  removePrefix(prefix: string): Promise<void>
  set(key: string, value: any): Promise<void>
}
