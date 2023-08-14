import constants from './constants'

import dev from './dev'
import hml from './hml'
import prd from './prd'

const envs = { dev, hml, prd }

export const env = envs[constants.useEnv || 'dev']
