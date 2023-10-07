import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [locale, setLocale] = useState("en-GB");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Save new theme settings
  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Change Theme if theme variable was changed.
  useEffect(
    function () {
      if (theme === "light")
        document.documentElement.classList.add("light-mode");
      else document.documentElement.classList.remove("light-mode");
    },
    [theme]
  );

  const ProviderValue = {
    locale,
    setLocale,
    theme,
    setTheme: handleThemeChange,
  };

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
