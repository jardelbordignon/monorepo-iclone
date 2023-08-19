/* eslint-disable sort-keys-fix/sort-keys-fix */
import { fakerPT_BR as faker } from '@faker-js/faker'
import {
  Factory,
  Model,
  createServer,
  Response,
  ActiveModelSerializer,
} from 'miragejs'

import { TUserEntity } from 'contracts/account'

export const createMirageServer = (environment = 'development') => {
  console.log(`Creating mirage ${environment} API`)

  const server = createServer({
    environment,

    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<TUserEntity>>({}),
    },

    factories: {
      user: Factory.extend<Partial<TUserEntity>>({
        created_at() {
          return faker.date.recent({ days: 100, refDate: 21 })
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        //password() {
        //  return faker.internet.password()
        //},
        id() {
          return faker.string.uuid()
        },
        name() {
          return faker.person.fullName()
        },
        permissions() {
          return faker.helpers.arrayElements(['user.block', 'user.delete'])
        },
        roles() {
          return faker.helpers.arrayElements(['ADMIN', 'MANAGER', 'USER'])
        },
        updated_at() {
          return faker.date.recent({ days: 20 })
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.urlPrefix = 'http://mirage.api'
      this.namespace = 'v1'
      this.timing = 700

      //this.get('/users')
      this.get('/users', (schema, request) => {
        //console.log('schema', schema)
        //return schema.all('user')
        //return schema.all('user').models

        const { page = 1, per_page = 10 } = request.queryParams

        const totalCount = schema.all('user').length

        const pageStart = (+page - 1) * +per_page
        const pageEnd = pageStart + +per_page

        const users = schema
          .all('user')
          .models.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': totalCount.toString() },
          { users, totalCount }
        )
      })
      this.get('/users/:id')
      this.post('/users')
    },
  })

  return server
}
