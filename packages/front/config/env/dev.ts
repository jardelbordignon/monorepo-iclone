import constants from './constants'
import { EnvType } from './type'

const useMirage = false

export default {
  apiUrl: useMirage ? 'http://mirage.api/v1' : constants.apiDevUrl,
  enableDebug: true,
  name: 'development',
  useMirage,
  useMocks: false,
} as EnvType
