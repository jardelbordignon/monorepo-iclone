import { en } from './en'
import { es } from './es'
import { pt } from './pt'

export * from './type'
export const locales = { en, es, pt }
export const localeNames = Object.keys(locales)
