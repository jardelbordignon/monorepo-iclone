import { TUserEntity, TCreateUserInput } from 'contracts/account'
import { appInstallId } from 'front/utils/app-install-id'
import { uuid } from 'front/utils/id-generators'

const requests: any = {
  GET: {
    '/users': () => {
      const appId = appInstallId()
      const users: TUserEntity[] = [
        {
          app_install_id: appId,
          last_mfa_confirmation: '2023-08-11T11:23:32.040Z',
          created_at: '2023-05-11T11:23:32.040Z',
          email: 'john-doe@email.com',
          id: 'b119893d-0d11-424d-b082-d94ad33bf7ff',
          name: 'John Doe',
          permissions: ['user.delete'],
          roles: ['ADMIN'],
          updated_at: '2023-06-11T11:23:32.040Z',
        },
        {
          app_install_id: appId,
          last_mfa_confirmation: '2023-06-11T11:23:32.040Z',
          created_at: '2023-03-11T11:23:32.040Z',
          email: 'jessie-lee@email.com',
          id: 'ffb1328b-2345-4fc6-bd81-8c691fc07820',
          name: 'Jessie Lee',
          permissions: [],
          roles: [],
          updated_at: '2023-05-11T11:23:32.040Z',
        },
        {
          app_install_id: undefined,
          last_mfa_confirmation: undefined,
          created_at: '2023-08-11T11:23:32.040Z',
          email: 'joe-smith@email.com',
          id: '48006f3a-58a4-464a-93b5-9e7bbe030b59',
          name: 'Joe Smith',
          permissions: [],
          roles: [],
          updated_at: '2023-08-11T11:23:32.040Z',
        },
      ]
      return users
    },
  },
  POST: {
    '/users': ({ email, name }: TCreateUserInput) => {
      const user: TUserEntity = {
        app_install_id: appInstallId(),
        last_mfa_confirmation: undefined,
        created_at: new Date().toJSON(),
        email,
        id: uuid(),
        name,
        permissions: [],
        roles: [],
        updated_at: new Date().toJSON(),
      }
      return user
    },
  },
  PUT: {
    '/reset/password': () => ({
      message: 'Senha alterada com sucesso',
    }),
  },
}

export async function mockedApi(method: string, url: string, params: any) {
  //getAppInstallId()
  const mock = requests[method][url.split('?')[0]] ?? (() => null as any)

  const response = await new Promise<{ data: any }>(resolve => {
    setTimeout(() => resolve({ data: mock(params) }), 1000 * Math.random())
  })

  // console.log('*** using mocked api ***')
  // console.log('method', method)
  // console.log('url', url)
  // console.log('params', params)
  // console.log('response', JSON.stringify(response, null, 2))

  return response
}
