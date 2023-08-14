import { DotEnv } from './type'

export default {
  apiDevUrl: process.env.EXPO_PUBLIC_API_DEV_URL,
  apiHmlUrl: process.env.EXPO_PUBLIC_API_HML_URL,
  apiPrdUrl: process.env.EXPO_PUBLIC_API_PRD_URL,
  useEnv: process.env.EXPO_PUBLIC_USE_ENV,
} as DotEnv
