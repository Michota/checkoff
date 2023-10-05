import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const LocaleContext = createContext();

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("en-GB");

  const ProviderValue = { locale, setLocale };

  return (
    <LocaleContext.Provider value={ProviderValue}>
      {children}
    </LocaleContext.Provider>
  );
}

function useLocaleContext() {
  const value = useContext(LocaleContext);
  if (value === undefined) throw new Error("LocaleContext value is undefined!");
  return value;
}

export { LocaleProvider, useLocaleContext };
