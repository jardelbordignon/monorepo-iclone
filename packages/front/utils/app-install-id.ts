import { uuid } from './id-generators'
import { storage } from './storage'

export const appInstallId = () => {
  let id = storage.getItem('appInstallId')
  if (!id) {
    id = uuid()
    storage.setItem('appInstallId', id)
  }
  return id
}
