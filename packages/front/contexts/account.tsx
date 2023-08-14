import { ReactNode, createContext, useContext, useState } from "react"

import { TRefreshTokenResponse, TUserEntity } from "contracts/account"

type AccountContextProps = {
  canPrivateRoutes: boolean;
  setCanPrivateRoutes(canPrivateRoutes: boolean): void;
  setTokens(tokens: TRefreshTokenResponse): void;
  setUser(user: TUserEntity): void;
  tokens: TRefreshTokenResponse;
  user: TUserEntity;
};

type AccountProviderProps = {
  children: ReactNode;
};

const AccountContext = createContext({} as AccountContextProps)

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [canPrivateRoutes, setCanPrivateRoutes] = useState(false)
  const [user, setUser] = useState<TUserEntity>()
  const [tokens, setTokens] = useState<TRefreshTokenResponse>()

  return (
    <AccountContext.Provider
      value={{
        canPrivateRoutes,
        setCanPrivateRoutes,
        setTokens,
        setUser,
        tokens,
        user,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => useContext(AccountContext)
