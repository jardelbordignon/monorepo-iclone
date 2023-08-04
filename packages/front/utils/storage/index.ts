class Storage {
  public get<T = any>(key: string): T {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  public set(k: string, v: any) {
    window.localStorage.setItem(k, JSON.stringify(v))
  }

  public del(k: string) {
    window.localStorage.removeItem(k)
  }
}

export const storage = new Storage()
