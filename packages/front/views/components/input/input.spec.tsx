import React, { ReactNode } from 'react'
import { Control, FormProvider, useForm } from 'react-hook-form'

import { Contexts } from 'src/contexts'
import { render, screen } from 'src/utils/test-helper'

import { Input } from '.'

type Props = {
  children: ReactNode
}

let control: Control
const register = (name: string) => ({ control, error: undefined, name })

const Wrapper = ({ children }: Props) => {
  const methods = useForm()
  //control = methods.control
  return (
    <Contexts>
      <FormProvider {...methods}>{children}</FormProvider>
    </Contexts>
  )
}

beforeAll(() => {
  const input = <Input {...register('email')} placeholder="Your Email" />
  render(input, { wrapper: Wrapper })
})

describe('Input Component', () => {
  it('should be able to render correctly', () => {
    const input = screen.getByPlaceholderText('Your Email')

    expect(input).toBeTruthy()
  })
})
