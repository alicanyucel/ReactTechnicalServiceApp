import React, { createContext, useContext, useState, useEffect } from 'react';

// Tema Context
const ThemeContext = createContext();

// Tema sağlayıcı
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light'); // 'light', 'dark', 'yellow-red'

  // LocalStorage'dan tema tercihini yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    } else {
      // Sistem tercihini kontrol et
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Tema değişikliğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.body.style.backgroundColor = getThemeColors().background;
  }, [currentTheme]);

  const getThemeColors = () => {
    switch (currentTheme) {
      case 'dark':
        return {
          background: '#141414',
          surface: '#1f1f1f',
          text: '#ffffff',
          textSecondary: '#a6a6a6',
          border: '#303030',
          primary: '#177ddc',
          hover: '#2a2a2a',
        };
      case 'yellow-red':
        return {
          background: '#fff8e1', // Açık sarı
          surface: '#fff3c4', // Orta sarı
          text: '#d32f2f', // Kırmızı
          textSecondary: '#f57c00', // Turuncu-kırmızı
          border: '#ffcc02', // Sarı border
          primary: '#ff6f00', // Turuncu
          hover: '#ffe082', // Açık sarı hover
        };
      default: // light
        return {
          background: '#ffffff',
          surface: '#fafafa',
          text: '#000000',
          textSecondary: '#666666',
          border: '#d9d9d9',
          primary: '#1890ff',
          hover: '#f0f0f0',
        };
    }
  };

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'yellow-red'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const theme = {
    currentTheme,
    toggleTheme,
    colors: getThemeColors(),
    isDarkMode: currentTheme === 'dark',
    isYellowRedMode: currentTheme === 'yellow-red',
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