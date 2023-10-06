import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [locale, setLocale] = useState("en-GB");
  const [theme, setTheme] = useState("dark");

  const ProviderValue = { locale, setLocale, theme, setTheme };

  return (
    <SettingsContext.Provider value={ProviderValue}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettingsContext() {
  const value = useContext(SettingsContext);
  if (value === undefined)
    throw new Error("SettingsContext value is undefined!");
  return value;
}

export { SettingsProvider, useSettingsContext };
