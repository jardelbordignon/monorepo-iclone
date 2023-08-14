import { Suspense } from 'react'
import type { ReactNode } from 'react'

import { AccountProvider } from './account'
import { LocalesProvider } from './locales'
import { ReactQueryProvider } from './react-query'

type Props = {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <Suspense fallback={null}>
      <LocalesProvider>
        <AccountProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AccountProvider>
      </LocalesProvider>
    </Suspense>
  )
}
