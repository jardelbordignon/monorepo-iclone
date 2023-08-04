import { RenderOptions, render as _render } from '@testing-library/react-native'
import { ReactElement, ReactNode } from 'react'

import { Contexts } from 'front/contexts'
//import { NavProps } from 'front/types/navigation'

type Props = {
  children: ReactNode
}

const Wrapper = ({ children }: Props) => <Contexts>{children}</Contexts>

export const render = (ui: ReactElement, options?: RenderOptions) => {
  const wrapper = Object.assign(Wrapper, options?.wrapper)
  return _render(ui, { wrapper, ...options })
}

// export const navProps: NavProps = {
//   navigation: jest.fn() as any,
//   route: jest.fn() as any,
// }

export * from '@testing-library/react-native'
