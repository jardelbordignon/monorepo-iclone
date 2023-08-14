import { createMirageServer } from './api/dev/mirage'
import { env } from './config/env'
import { Contexts } from './contexts'
import Routes from './router/routes'

export function Front() {
  if (env.useMirage) {
    // import('./api/dev/mirage').then(mirage => mirage.createMirageServer())
    createMirageServer()
  }

  return (
    <Contexts>
      <Routes />
    </Contexts>
  )
}
