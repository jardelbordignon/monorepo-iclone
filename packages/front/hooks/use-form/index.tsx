import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  Path,
  ValidationMode,
  useForm as _useForm,
} from 'react-hook-form'
import { ZodEffects, ZodObject, z } from 'zod'

type AnyObj = Record<PropertyKey, unknown>

type ZodObj<T extends AnyObj> = {
  [key in keyof T]: z.ZodType<T[key]>
}

export type ZodType = typeof z

export const useForm = <T extends { [key: string]: unknown }>({
  defaultValues,
  mode = 'onTouched',
  zodSchema,
}: {
  defaultValues?: DefaultValues<T>
  mode?: keyof ValidationMode
  zodSchema: (z: ZodType) => ZodObject<ZodObj<T>> | ZodEffects<ZodObject<ZodObj<T>>>
}) => {
  const resolver = zodResolver(zodSchema(z))

  const methods = _useForm({ defaultValues, mode, resolver })
  const { control, formState, handleSubmit } = methods
  const { errors, isSubmitting, isValid } = formState

  const register = (name: Path<T>) => ({
    control,
    error: errors[name]?.message,
    name,
  })

  const btnControl = {
    isDisabled: !isValid,
    isLoading: isSubmitting,
  }

  return {
    btnControl,
    handleSubmit,
    methods,
    register,
  }
}
