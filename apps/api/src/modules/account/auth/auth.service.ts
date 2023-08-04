import { randomUUID } from 'node:crypto'
import { resolve } from 'path'

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { IMailProvider } from 'src/infra/providers/mail/i-mail-provider'
import { omitProperties } from 'src/infra/utils/omit-properties'

import { TokenService } from '../token/token.service'
import { UserOmittedPassword } from '../user/user.dto'
import { UserService } from '../user/user.service'

import {
  AuthenticatedUser,
  LoginInput,
  LoginResponse,
  ResetPasswordInput,
  TokensResponse,
} from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private jwtService: JwtService
  ) //private mailProvider: IMailProvider
  {}

  private async handleTokens(user_id: string): Promise<LoginResponse['tokens']> {
    const access = await this.jwtService.signAsync({ sub: user_id })

    const daysToExpire = +process.env.JWT_REFRESH_EXPIRES_IN_DAYS || 10
    const refresh = await this.jwtService.signAsync(
      { sub: user_id },
      { expiresIn: `${daysToExpire}d` }
    )

    const expires_at = new Date(Date.now() + 86400000 * daysToExpire)

    await this.tokenService.deleteByUserId(user_id).then(async () => {
      await this.tokenService.create({ expires_at, refresh_token: refresh, user_id })
    })
    return { access, refresh }
  }

  async logout(user_id: string): Promise<boolean> {
    return this.tokenService.deleteByUserId(user_id)
  }

  async login({ email, password }: LoginInput): Promise<LoginResponse> {
    const user = await this.userService.findFirstByEmailWithPassword(email)
    const match = await compare(password, user.password)
    if (!match) throw new NotFoundException('User not found')
    const tokens = await this.handleTokens(user.id)

    return {
      tokens,
      user: omitProperties(user, ['password']),
    }
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.userService.findFirstByEmail(email)
    if (user) {
      await this.logout(user.id)
      const refresh_token = randomUUID()
      const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 2) // two hours
      await this.tokenService.create({ expires_at, refresh_token, user_id: user.id })
      const templatePath = resolve(
        'dist',
        'account',
        'auth',
        'view',
        'forgotPassword.hbs'
      )
      const variables = { name: user.name, token: refresh_token }

      // console.log('email', email)
      console.log('variables', variables)
      // console.log('templatePath', templatePath)
      // this.mailProvider.sendMail(
      //   email,
      //   'Recuperação de senha',
      //   variables,
      //   templatePath
      // )
    }

    return {
      message: `If ${email} is registered an e-mail with reset password instructions will sent now`,
    }
  }

  async refreshTokens(refresh_token: string): Promise<TokensResponse> {
    const { sub: user_id } = await this.jwtService.verify(refresh_token)
    const token = await this.tokenService.findFirstByRefreshToken(refresh_token)
    if (!token) throw new UnauthorizedException('RefreshToken is invalid')
    return this.handleTokens(user_id)
  }

  async resetPassword({ password, token }: ResetPasswordInput): Promise<void> {
    const refresh_token = await this.tokenService.findFirstByRefreshToken(token)
    const isValidToken =
      refresh_token && new Date(refresh_token.expires_at) > new Date()
    if (!isValidToken) throw new UnauthorizedException('Token is invalid')
    await this.userService.resetPassword(refresh_token.user_id, password)
    this.logout(refresh_token.user_id)
  }

  async currentUser(
    authenticated_user: AuthenticatedUser
  ): Promise<UserOmittedPassword> {
    try {
      return this.userService.findFirstById(authenticated_user.id)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
