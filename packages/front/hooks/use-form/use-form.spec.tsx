//import { renderHook } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks'

import { Contexts } from 'src/contexts'
import { SignInInput } from 'src/types/account'

import { ZodType, useForm } from '.'

const wrapper = Contexts

describe('useForm hook', () => {
  it('should be defined', () => {
    expect(useForm).toBeDefined()
  })

  it('should be able to control the submit button', () => {
    const { result } = renderHook(
      () =>
        useForm<SignInInput>({
          defaultValues: { email: '', password: '' },
          zodSchema: (z: ZodType) =>
            z.object({
              email: z.string().email(),
              password: z.string().min(6),
            }),
        }),
      { wrapper }
    )

    // console.log(result.current)
    expect(result.current.btnControl.isDisabled).toBe(true)
  })
})
