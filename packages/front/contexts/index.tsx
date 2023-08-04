import type { ReactNode } from "react";

import { AccountProvider } from "./account";
import { LocalesProvider } from "./locales";

type Props = {
  children: ReactNode;
};

export function Contexts({ children, ...rest }: Props) {
  return (
    <LocalesProvider>
      <AccountProvider>{children}</AccountProvider>
    </LocalesProvider>
  );
}
