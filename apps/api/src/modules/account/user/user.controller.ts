import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AllowUnauthenticated } from 'src/infra/guards'
import { RequestWithUser } from 'src/types'

import {
  CreateUserInput,
  UpdateUserInput,
  type UserOmittedPassword,
} from './user.dto'
import { UserService } from './user.service'

@ApiTags('Account - User')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ description: 'A list of user whit omitted password' })
  @HttpCode(HttpStatus.OK)
  @AllowUnauthenticated()
  @Get()
  findAll(): Promise<UserOmittedPassword[]> {
    return this.service.findAll()
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiResponse({ description: 'The created user whit omitted password' })
  @HttpCode(HttpStatus.CREATED)
  @AllowUnauthenticated()
  @Post()
  create(@Body() body: CreateUserInput): Promise<UserOmittedPassword> {
    return this.service.create(body)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an user' })
  @ApiResponse({ description: 'The updated user whit omitted password' })
  @HttpCode(HttpStatus.OK)
  @Patch()
  update(
    @Body() body: UpdateUserInput,
    @Request() req: RequestWithUser
  ): Promise<UserOmittedPassword> {
    return this.service.update(req.user.id, body)
  }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Update an user access level' })
  // @ApiResponse({ description: 'The updated user access level whit omitted password' })
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(
  //   AuthorizationGuard({
  //     //roles: ['Admin'],
  //     //permissions: ['user.access_level', 'user.test', 'user.upgrade'],
  //     //needAllPermissions: true,
  //   })
  // )
  // @Patch('access_level')
  // updateAccessLevel(
  //   @Body() body: UpdateUserAccessLevelInput,
  //   @Request() req: RequestWithUser
  // ): Promise<UserOmittedPassword> {
  //   return this.service.updateAccessLevel(req.user.id, body)
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an user' })
  @ApiResponse({ description: 'User delete confirmation' })
  @Delete()
  delete(@Request() req: RequestWithUser) {
    return this.service.delete(req.user.id)
  }
}
