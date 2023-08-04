import { useAccountContext } from 'front/contexts/account'
import { pluralize, replaceLastComa } from 'front/utils/text-formatters'

type Props = {
  needAll?: boolean
  needAllPermissions?: boolean
  needAllRoles?: boolean
  permissions?: string[]
  roles?: string[]
  unauthorizedMessage?: boolean
}

const unauthorizedMsg = (
  rolesCondition: 'every' | 'some',
  permissionsCondition: 'every' | 'some',
  neededRoles: string[],
  neededPermissions: string[]
) => {
  let msg = 'You need'

  if (neededRoles.length) {
    const neededRolesToStr = replaceLastComa(neededRoles.join(', '))
    const roleWord = pluralize(neededRoles.length, 'role')
    const neededRolesMsg =
      rolesCondition === 'some'
        ? ` some role between ${neededRolesToStr}`
        : ` ${neededRolesToStr} ${roleWord}`

    msg += neededRolesMsg
  }

  if (neededPermissions.length) {
    const neededPermissionsToStr = replaceLastComa(neededPermissions.join(', '))
    const permissionWord = pluralize(neededPermissions.length, 'permission')
    const neededPermissionsMsg =
      permissionsCondition === 'some'
        ? ` some permission between ${neededPermissionsToStr}`
        : ` ${neededPermissionsToStr} ${permissionWord}`

    if (neededRoles.length) msg += ' and'
    msg += neededPermissionsMsg
  }

  msg += '.'

  return msg
}

export function useAuthorization(props: Props) {
  const { user } = useAccountContext()

  let isUnauthorized = true
  let message = ''

  if (user.email) {
    const {
      roles,
      permissions,
      needAll,
      needAllRoles,
      needAllPermissions,
      unauthorizedMessage,
    } = props

    const rolesCondition = needAll || needAllRoles ? 'every' : 'some'
    const permissionsCondition = needAll || needAllPermissions ? 'every' : 'some'

    let neededRoles: string[] = []
    let neededPermissions: string[] = []

    if (roles && roles.length) {
      if (!user.roles || !roles[rolesCondition](r => user.roles.includes(r)))
        neededRoles = roles.filter(r => !user.roles.includes(r))
    }

    if (permissions && permissions.length) {
      if (
        !user.permissions ||
        !permissions[permissionsCondition](p => user.permissions.includes(p))
      )
        neededPermissions = permissions.filter(r => !user.permissions.includes(r))
    }

    isUnauthorized = !!neededRoles.length || !!neededPermissions.length

    if (isUnauthorized && unauthorizedMessage) {
      message = unauthorizedMsg(
        rolesCondition,
        permissionsCondition,
        neededRoles,
        neededPermissions
      )
    }
  }

  return {
    authorized: !isUnauthorized,
    message,
  }
}
