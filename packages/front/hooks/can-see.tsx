import { ReactNode } from 'react'

import { useAuthorization } from 'front/hooks/use-authorization'

type Props = {
  children: ReactNode
  errorReturn?: undefined
  needAll?: boolean
  needAllPermissions?: boolean
  needAllRoles?: boolean
  permissions?: string[]
  roles?: string[]
}

export function CanSee(props: Props) {
  const {
    children,
    roles,
    permissions,
    needAll,
    needAllRoles,
    needAllPermissions,
    errorReturn = null,
  } = props

  const { authorized, message } = useAuthorization({
    needAll,
    needAllPermissions,
    needAllRoles,
    permissions,
    roles,
    unauthorizedMessage: true,
  })

  if (!authorized) {
    console.log(message)
    return errorReturn
  }

  return <>{children}</>
}
