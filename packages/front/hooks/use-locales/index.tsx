import { useContext } from "react";

import { LocalesContext, LocalesContextType } from "front/contexts/locales";

export function useLocales(): LocalesContextType {
  const context = useContext(LocalesContext);

  if (!context) {
    throw new Error("useLocales must be used within an LocalesProvider");
  }

  return context;
}
