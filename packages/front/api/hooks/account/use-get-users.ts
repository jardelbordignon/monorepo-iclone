import { accountApi } from 'front/api/account'
import { useQuery } from '../use-query'
import { TGetUsersParams } from 'contracts/account'

type Props = TGetUsersParams & {
  expiresIn?: number
}

export const useGetUsers = ({ page, perPage, expiresIn }: Props) =>
  useQuery({
    func: accountApi.getUsers,
    params: { page, perPage },
    cacheKey: 'users',
    expiresIn,
  })
