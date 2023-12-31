import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [locale, setLocale] = useState("en-GB");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [calendarView, setCalendarView] = useState(
    localStorage.getItem("calendarView") || "dayGridMonth"
  );

  // Save new theme settings
  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Change Theme if theme variable was changed.
  useEffect(
    function () {
      if (theme === "light") {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark-theme");
      }
    },
    [theme]
  );

  // Change calendar view if calendarView variable was changed.
  useEffect(
    function () {
      localStorage.setItem("calendarView", calendarView);
    },
    [calendarView]
  );

  const ProviderValue = {
    locale,
    setLocale,
    theme,
    setTheme: handleThemeChange,
    calendarView,
    setCalendarView,
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
