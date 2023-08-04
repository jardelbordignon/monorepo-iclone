// https://stackoverflow.com/questions/58343262/class-validator-validate-array-of-objects

import { ApiProperty, PartialType } from '@nestjs/swagger'
import { User } from '@prisma/client'

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUnique,
  Length,
  Matches,
  ValidateIf,
} from 'src/infra/utils/class-validator'

import { TCreateUserInput } from 'contracts/account'

export type UserOmittedPassword = Omit<User, 'password'>

const regex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?@ "]).*$/
const regexMsg =
  '$property must contain at least 6 characters, 1 upper and 1 lower case letter, 1 number and special characters !&$%&?@'

export class CreateUserInput implements TCreateUserInput {
  @ApiProperty({ description: 'The user name', example: 'John Doe' })
  @IsString()
  @Length(5, 40)
  name: string

  @ApiProperty({ description: 'The user email', example: 'john-doe@email.com' })
  @IsEmail()
  @IsUnique({ entity: 'User' })
  email: string

  @ApiProperty({
    description: 'The user password',
    example: 'Pwd@123!',
    writeOnly: true,
  })
  @IsString()
  @Length(6, 30)
  @Matches(regex, { message: regexMsg })
  password: string
}

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiProperty({
    description: 'The current user password, required to update email or password',
    example: 'Pwd@123!',
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(user => !!user.email || !!user.password)
  current_password?: string
}

export class UpdateUserAccessLevelInput
  implements Pick<User, 'roles' | 'permissions'>
{
  @ApiProperty({
    description: 'The user roles',
    example: ['Admin'],
  })
  @ValidateIf(user => !!user.roles)
  roles: string[]

  @ApiProperty({
    description: 'The user permissions',
    example: ['user.create', 'user.update'],
  })
  @IsString({ each: true })
  @ValidateIf(user => !!user.permissions)
  permissions: string[]
}
