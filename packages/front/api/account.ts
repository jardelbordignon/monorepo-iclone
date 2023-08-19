import {
  TCreateUserInput,
  TGetUsersParams,
  TGetUsersResponse,
  TLoginInput,
  TLoginResponse,
  TUserEntity,
} from 'contracts/account'

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
  public getUsers(params: TGetUsersParams) {
    return api.get<TGetUsersResponse>('/users', params)
  }

  public createUser(body: TCreateUserInput) {
    return api.post<TUserEntity>('/users', body)
  }
}

export const accountApi = new AccountApi()
