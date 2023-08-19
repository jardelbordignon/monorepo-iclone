import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'

import { TGetUsersParams, TGetUsersResponse } from 'contracts/account'

import { PrismaService } from 'src/infra/prisma.service'
import { omitProperties } from 'src/infra/utils/omit-properties'

import {
  CreateUserInput,
  UpdateUserInput,
  type UserOmittedPassword,
} from './user.dto'

@Injectable()
export class UserService extends PrismaService {
  async create(data: CreateUserInput): Promise<UserOmittedPassword> {
    const { email, name, password } = data
    const hashedPassword = await hash(password, 10)
    const user = await this.user.create({
      data: { email, name, password: hashedPassword },
    })
    return omitProperties(user, ['password'])
  }

  async delete(id: string): Promise<boolean> {
    await this.findFirstWithPassword('id', id)
    const userDeleted = await this.user.delete({ where: { id } })
    return !!userDeleted
  }

  async findAll(): Promise<UserOmittedPassword[]> {
    const users = await this.user.findMany()
    const usersOmittedPassword = users.map(user => omitProperties(user, ['password']))
    return usersOmittedPassword
  }

  // https://www.prisma.io/docs/concepts/components/prisma-client/pagination
  async findMany({ page, perPage }: TGetUsersParams): Promise<TGetUsersResponse> {
    if (!page || page < 1) page = 1
    if (!perPage || perPage < 1) perPage = 10

    const users = await this.user.findMany({
      skip: (page - 1) * perPage,
      take: +perPage,
      orderBy: {
        created_at: 'desc',
      },
    })

    const totalCount = await this.user.count()

    return { users, totalCount }
  }

  private async findFirst(field: string, value: any): Promise<UserOmittedPassword> {
    const user = await this.findFirstWithPassword(field, value)
    return omitProperties(user, ['password'])
  }

  private async findFirstWithPassword(field: string, value: any): Promise<User> {
    const user = await this.user.findFirst({ where: { [field]: value } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  findFirstByEmailWithPassword(email: string): Promise<User> {
    return this.findFirstWithPassword('email', email)
  }

  async findFirstByEmail(email: string) {
    const user = await this.user.findFirst({ where: { email } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async findFirstById(id: string): Promise<UserOmittedPassword> {
    const user = await this.findFirst('id', id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async resetPassword(id: string, password: string): Promise<User> {
    await this.findFirstWithPassword('id', id)
    password = await hash(password, 10)
    return this.user.update({ data: { password }, where: { id } })
  }

  async update(id: string, data: UpdateUserInput): Promise<UserOmittedPassword> {
    const { current_password, email, name, password } = data
    const user = await this.user.findFirst({ where: { id } })
    if (email || password) {
      const match = await compare(current_password, user.password)
      if (!match) throw new UnauthorizedException('Incorrect current password')
    }
    const updatedUser = await this.user.update({
      data: { email, name, password },
      where: { id },
    })
    return omitProperties(updatedUser, ['password'])
  }

  // async updateAccessLevel(
  //   id: string,
  //   data: UpdateUserAccessLevelInput
  // ): Promise<UserOmittedPassword> {
  //   const { permissions, roles } = data
  //   const updatedUser = await this.user.update({
  //     where: { id },
  //     data: { permissions, roles },
  //   })
  //   return omitProperties(updatedUser, ['password'])
  // }

  // User Addresses
}
