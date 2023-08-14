import NetInfo from '@react-native-community/netinfo'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, onlineManager } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { ReactNode } from 'react'

import { storage } from 'front/utils/storage'

type Props = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: Props) {
  const cacheTime = 1000 * 60 * 60 * 0.5 // 30 min

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { cacheTime },
    },
  })

  const persister = createSyncStoragePersister({
    storage,
    // throttleTime: 3000,
  })

  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected)
    })
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
