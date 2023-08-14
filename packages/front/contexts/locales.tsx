import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { NativeModules, Platform } from 'react-native'
import { setErrorMap } from 'zod'

import { Locale, LocaleName, localeNames, locales, zodErrorMaps } from 'front/locales'
import { storage } from 'front/utils/storage'

export type LocalesContextType = {
  localeName: LocaleName
  setLocaleName(localeName: LocaleName): void
  t(key: keyof Locale, p?: any[]): string
}

type ProviderProps = {
  children: ReactNode
}

export const LocalesContext = createContext<LocalesContextType>(
  {} as LocalesContextType
)

export const LocalesProvider = ({ children }: ProviderProps) => {
  const [localeName, _setLocaleName] = useState<LocaleName>('pt')

  const setLocaleName = (localeName: LocaleName) => {
    setErrorMap(zodErrorMaps[localeName])
    _setLocaleName(localeName)
    storage.setItem('localeName', localeName)
  }

  const handleLocale = useCallback(() => {
    const storedLocaleName = storage.getItem('localeName')

    if (storedLocaleName && localeNames.includes(storedLocaleName)) {
      setLocaleName(storedLocaleName)
    } else {
      const deviceLocale = (
        Platform.OS === 'web'
          ? navigator.language || navigator.userLanguage
          : Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
          : Platform.OS === 'android'
          ? NativeModules.I18nManager.localeIdentifier
          : 'pt'
      ).substring(0, 2)

      const isExistingLocale = localeNames.some(item => item === deviceLocale)

      setLocaleName(isExistingLocale ? deviceLocale : 'pt')
    }
  }, [])

  const t = (k: keyof Locale, p?: string | string[]): string => {
    if (!localeName || !localeNames.includes(localeName)) {
      handleLocale()
    }

    const str = locales[localeName][k]

    if (!p) return str
    if (typeof p === 'string') return str.replace('.p.', p)
    return p.reduce((acc, param) => acc.replace('.p.', param), str)
  }

  useEffect(() => handleLocale(), [])

  return (
    <LocalesContext.Provider value={{ localeName, setLocaleName, t }}>
      {children}
    </LocalesContext.Provider>
  )
}
