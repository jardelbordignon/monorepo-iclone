import { TCreateUserResponse, TRefreshTokenResponse } from "contracts/account";
import { ReactNode, createContext, useContext, useState } from "react";

type AccountContextProps = {
  canPrivateRoutes: boolean;
  setCanPrivateRoutes(canPrivateRoutes: boolean): void;
  user: TCreateUserResponse;
  setUser(user: TCreateUserResponse): void;
  tokens: TRefreshTokenResponse;
  setTokens(tokens: TRefreshTokenResponse): void;
};

type AccountProviderProps = {
  children: ReactNode;
};

const AccountContext = createContext({} as AccountContextProps);

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [canPrivateRoutes, setCanPrivateRoutes] = useState(false);
  const [user, setUser] = useState<TCreateUserResponse>();
  const [tokens, setTokens] = useState<TRefreshTokenResponse>();

  return (
    <AccountContext.Provider
      value={{
        canPrivateRoutes,
        setCanPrivateRoutes,
        user,
        setUser,
        tokens,
        setTokens,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
