import { Body, Controller, Delete, HttpStatus, Post, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AllowUnauthenticated } from 'src/infra/guards'
import { RequestWithUser } from 'src/types'

import {
  LoginInput,
  RefreshTokenInput,
  ResetPasswordInput,
  SendPasswordResetEmailInput,
  TokensResponse,
} from './auth.dto'
import { LoginResponse } from './auth.dto'
import { AuthService } from './auth.service'

@ApiTags('Account - Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    description: 'An object containing user and tokens objects',
    type: LoginResponse,
    status: HttpStatus.OK,
  })
  @AllowUnauthenticated()
  @Post()
  login(@Body() body: LoginInput): Promise<LoginResponse> {
    return this.service.login(body)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Delete()
  logout(@Request() req: RequestWithUser): Promise<boolean> {
    return this.service.logout(req.user.id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access_token and refresh_token' })
  @ApiResponse({
    description: 'An object whit refreshed access_token and refresh_token',
    type: TokensResponse,
  })
  @Post('refresh_tokens')
  refreshTokens(@Body() body: RefreshTokenInput): Promise<TokensResponse> {
    return this.service.refreshTokens(body.refresh_token)
  }

  @ApiOperation({
    summary: 'Reset user password',
    description:
      'Uses the refresh_token (valid for 2 hours) sent by email on the auth/send_reset_password_email endpoint',
  })
  @ApiResponse({
    description: 'The reset password confirmation',
    type: Boolean,
    status: HttpStatus.OK,
  })
  @AllowUnauthenticated()
  @Post('reset_password')
  resetPassword(@Body() body: ResetPasswordInput): Promise<void> {
    return this.service.resetPassword(body)
  }

  @ApiOperation({
    summary: 'Send a reset password email',
    description:
      'An email whit a link containing refresh_token will send to user email address',
  })
  @ApiResponse({
    description: 'The send email confirmation',
    type: Boolean,
    status: HttpStatus.OK,
  })
  @AllowUnauthenticated()
  @Post('send_reset_password_email')
  sendResetPasswordEmail(@Body() body: SendPasswordResetEmailInput) {
    return this.service.sendResetPasswordEmail(body.email)
  }
}
