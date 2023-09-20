import { StorageKeys } from "@/components/constants";
import React, { createContext, useState } from "react";

// Create a Context object
export const AppContext = createContext();

// Create a provider component
export const AppContextProvider = ({ children }) => {
  let initialData;
  if (typeof window !== "undefined") {
    initialData = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO));
  }
  const [theme, setTheme] = useState("light");
  const [userData, setUserData] = useState(initialData || {});
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};
