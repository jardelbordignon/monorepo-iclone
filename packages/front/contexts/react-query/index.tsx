import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { ReactNode } from 'react'

import { storage } from 'front/utils/storage'

type Props = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: Props) {
  //const cacheTime = 1000 * 60 * 60 * 24 // 24 hours
  const cacheTime = 1000 * 5

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { cacheTime },
    },
  })

  const persister = createSyncStoragePersister({
    storage,
    // throttleTime: 3000,
  })

  return (
    <PersistQueryClientProvider
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
      persistOptions={{ persister }}
      client={queryClient}>
      {children}
    </PersistQueryClientProvider>
  )
}
