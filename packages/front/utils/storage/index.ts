type GetItemOpts = {
  checkExpiryDate?: boolean
  deleteExpired?: boolean
}

class Storage {
  public getItem<T = any>(key: string, opts?: GetItemOpts): T {
    const data = window.localStorage.getItem(key)
    if (!data) return null
    const parsedData = JSON.parse(data)
    if (
      opts?.checkExpiryDate &&
      parsedData.expiry &&
      parsedData.expiry < Date.now()
    ) {
      if (opts.deleteExpired) window.localStorage.removeItem(key)
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
    window.localStorage.setItem(key, JSON.stringify(data))
  }

  public removeItem(k: string) {
    window.localStorage.removeItem(k)
  }
}

export const storage = new Storage()
