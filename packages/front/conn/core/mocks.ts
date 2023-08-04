// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min)
//   max = Math.floor(max)
//   return Math.floor(Math.random() * (max - min)) + min
// }

const requests: unknown = {
  GET: {
    '/area-logada-ciam-v3/user/contact': () => [
      'r********e@gmail.com',
      '(11)9********480',
    ],
  },
  POST: {
    '/area-logada-ciam-v3/auth/confirmation/sendcode': () => ({}),
  },
  PUT: {
    '/reset/password': () => ({
      message: 'Senha alterada com sucesso',
      result: 'success',
      success: 1,
    }),
  },
}

export async function mockedApi(method: string, url: string, params: unknown) {
  const mock = requests[method][url.split('?')[0]] ?? (() => null as unknown)

  const response = await new Promise<{ data: unknown }>(resolve => {
    setTimeout(() => resolve({ data: mock(params) }), 1500 * Math.random())
  })

  // console.log('*** using mocked api ***')
  // console.log('method', method)
  // console.log('url', url)
  // console.log('response', JSON.stringify(response, null, 2))

  return response
}
