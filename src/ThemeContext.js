import React, { createContext, useContext, useState, useEffect } from 'react';

// Tema Context
const ThemeContext = createContext();

// Tema sağlayıcı
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // LocalStorage'dan tema tercihini yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Sistem tercihini kontrol et
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Tema değişikliğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = isDarkMode ? '#141414' : '#ffffff';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#141414' : '#ffffff',
      surface: isDarkMode ? '#1f1f1f' : '#fafafa',
      text: isDarkMode ? '#ffffff' : '#000000',
      textSecondary: isDarkMode ? '#a6a6a6' : '#666666',
      border: isDarkMode ? '#303030' : '#d9d9d9',
      primary: isDarkMode ? '#177ddc' : '#1890ff',
      hover: isDarkMode ? '#2a2a2a' : '#f0f0f0',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Tema hook'u
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;