import {
  TCreateUserInput,
  TLoginInput,
  TLoginResponse,
  TUserEntity,
} from 'contracts/account'

//import { storage } from 'front/utils/storage'

import { api } from './core'

class AccountApi {
  // Auth
  public login(body: TLoginInput) {
    return api.post<TLoginResponse>('/auth', body)
  }

  public logout() {
    return api.post('/logout', null)
  }

  // User
  //public async getUsers() {
  //  let users = storage.getItem('users', true)
  //  if (!users) {
  //    users = await api.get<TUserEntity[]>('/users')
  //    storage.setItem('users', users, 1)
  //  }
  //  return users
  //}
  public async getUsers() {
    const users = await api.get<TUserEntity[]>('/users')
    console.log('users', users)
    return users
  }

  public createUser(body: TCreateUserInput) {
    return api.post<TUserEntity>('/users', body)
  }
}

export const accountApi = new AccountApi()
