"use client";

import { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [SelectedImg, SetSelectedImg] = useState(null);

  const value = {
    SelectedImg, SetSelectedImg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};
