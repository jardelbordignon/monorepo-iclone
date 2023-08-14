import { DotEnv } from './type'

export default {
  apiDevUrl: import.meta.env.VITE_API_DEV_URL,
  apiHmlUrl: import.meta.env.VITE_API_HML_URL,
  apiPrdUrl: import.meta.env.VITE_API_PRD_URL,
  useEnv: import.meta.env.VITE_USE_ENV,
} as DotEnv
