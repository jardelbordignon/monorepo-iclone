import constants from './constants'
import { EnvType } from './type'

const useMirage = false

export default {
  apiUrl: useMirage ? 'http://127.0.0.1:3001/v1' : constants.apiDevUrl,
  enableDebug: true,
  name: 'development',
  useMirage,
  useMocks: false,
} as EnvType
