// Auth
export type TLoginInput = {
  email: string
  password: string
}

export type TLoginResponse = {
  tokens: TRefreshTokenResponse
  user: TCreateUserResponse
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

export type TCreateUserResponse = {
  created_at: string
  email: string
  id: string
  name: string
  permissions: string[]
  roles: string[]
  updated_at: string
}

export type TGetUsersResponse = TCreateUserResponse[]
