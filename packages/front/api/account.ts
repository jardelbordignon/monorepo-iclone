import {
  TCreateUserInput,
  TCreateUserResponse,
  TGetUsersResponse,
  TLoginInput,
  TLoginResponse,
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
  public getUsers() {
    return api.get<TGetUsersResponse>('/users')
  }

  public createUser(body: TCreateUserInput) {
    return api.post<TCreateUserResponse>('/users', body)
  }
}

export const accountApi = new AccountApi()
