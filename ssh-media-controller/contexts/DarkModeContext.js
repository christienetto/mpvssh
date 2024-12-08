import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the Dark Mode Context
const DarkModeContext = createContext();

// Custom hook to use DarkMode context
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider component to provide the dark mode state to the app
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from AsyncStorage
  useEffect(() => {
    const loadDarkModePreference = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode)); // Parse string to boolean
        }
      } catch (error) {
        console.error("Failed to load dark mode preference:", error);
      }
    };
    loadDarkModePreference();
  }, []);

  // Toggle dark mode and save preference to AsyncStorage
  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value)); // Save dark mode preference
    } catch (error) {
      console.error("Failed to save dark mode preference:", error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
