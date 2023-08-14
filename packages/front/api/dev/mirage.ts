/* eslint-disable sort-keys-fix/sort-keys-fix */
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Factory, Model, createServer } from 'miragejs'

import { TUserEntity } from 'contracts/account'

export const createMirageServer = (environment = 'development') => {
  console.log(`Creating mirage ${environment} API`)

  const server = createServer({
    environment,

    models: {
      user: Model.extend<Partial<TUserEntity>>({}),
    },

    factories: {
      user: Factory.extend<Partial<TUserEntity>>({
        created_at() {
          return faker.date.recent({ days: 100, refDate: 21 }).toString()
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
          return faker.date.recent({ days: 20 }).toString()
        },
      }),
    },

    seeds(server) {
      server.createList('user', 100)
    },

    routes() {
      this.urlPrefix = 'http://mirage.api'
      this.namespace = 'v1'
      this.timing = 700

      //this.get('/users')
      this.get('/users', schema => {
        //console.log('schema', schema)
        //return schema.all('user')
        return schema.all('user').models
      })
      this.post('/users')
    },
  })

  return server
}
