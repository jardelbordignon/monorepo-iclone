import { Module } from '@nestjs/common'
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

import { PrismaService } from '../prisma.service'

type Props = ValidationOptions & {
  entity: string
  property?: string
}

@ValidatorConstraint({ async: true })
class validator extends PrismaService implements ValidatorConstraintInterface {
  async validate(_: any, args: ValidationArguments) {
    const { property, value, constraints } = args
    const { entity, field, reverse } = constraints[0]

    const propertyName = field || property

    // console.log('entity', entity)
    // console.log('property', propertyName)
    // console.log('value', value)
    // console.log('reverse', reverse)

    const Entity = this[entity] as any

    const register = await Entity.findFirst({ where: { [propertyName]: value } })
    return reverse ? !register : !!register
  }
}

export function IsExisting({ entity, property, ...rest }: Props) {
  const options = rest || {}

  if (!options.message) {
    Object.assign(options, { message: '$property $value not exists' })
  }

  const data = { entity, field: property, reverse: false }

  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [data],
      validator,
    })
  }
}

export function IsUnique({ entity, property, ...rest }: Props) {
  const options = rest || {}

  if (!options.message) {
    Object.assign(options, { message: '$property $value already exists' })
  }

  const data = { entity, field: property, reverse: true }

  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [data],
      validator,
    })
  }
}

@Module({
  providers: [validator],
})
export class CustomClassValidatorModule {}
export * from 'class-validator'
