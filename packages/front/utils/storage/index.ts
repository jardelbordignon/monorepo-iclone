class Storage {
  public getItem<T = any>(key: string): T {
    const data = localStorage.getItem(key)
    if (!data) return null as T
    const parsedData = JSON.parse(data)
    if (parsedData.expiry && parsedData.expiry < Date.now()) {
      localStorage.removeItem(key)
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
    localStorage.setItem(key, JSON.stringify(data))
  }

  public removeItem(key: string) {
    localStorage.removeItem(key)
  }

  public removeAllThatStartWith(key: string) {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(key)) localStorage.removeItem(k)
    })
  }
}

export const storage = new Storage()
