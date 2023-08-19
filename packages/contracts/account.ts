// Auth
export type TLoginInput = {
  email: string
  password: string
}

export type TLoginResponse = {
  tokens: TRefreshTokenResponse
  user: TUserEntity
}

export type TRefreshTokenResponse = {
  access: string
  refresh: string
}

// User
export type TCreateUserInput = {
  email: string
  name: string
  password: string
}

export type TUserEntity = {
  app_install_id?: string
  last_mfa_confirmation?: string
  created_at: Date
  email: string
  id: string
  name: string
  permissions: string[]
  roles: string[]
  updated_at: Date
}

export type TGetUsersParams = {
  page: number
  perPage?: number
}

export type TGetUsersResponse = {
  users: TUserEntity[]
  totalCount: number
}
