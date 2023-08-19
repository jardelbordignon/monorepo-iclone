import { Suspense } from 'react'
import type { ReactNode } from 'react'

import { AccountProvider } from './account'
import { LocalesProvider } from './locales'

type Props = {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <Suspense fallback={null}>
      <LocalesProvider>
        <AccountProvider>{children}</AccountProvider>
      </LocalesProvider>
    </Suspense>
  )
}
