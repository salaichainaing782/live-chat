import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  background: '#ffffff',
  surface: '#f5f5f5',
  primary: '#007AFF',
  secondary: '#5856D6',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e0e0e0',
  card: '#ffffff',
  notification: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500'
};

const darkTheme = {
  background: '#000000',
  surface: '#1c1c1e',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  text: '#ffffff',
  textSecondary: '#8E8E93',
  border: '#38383a',
  card: '#1c1c1e',
  notification: '#FF453A',
  success: '#32D74B',
  warning: '#FF9F0A'
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (isSystemTheme) {
      setIsDark(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isSystemTheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme) {
        const { isDark: savedIsDark, isSystemTheme: savedIsSystemTheme } = JSON.parse(savedTheme);
        setIsDark(savedIsDark);
        setIsSystemTheme(savedIsSystemTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setIsSystemTheme(false);
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify({
        isDark: newIsDark,
        isSystemTheme: false
      }));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setSystemTheme = async () => {
    setIsSystemTheme(true);
    setIsDark(systemColorScheme === 'dark');
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify({
        isDark: systemColorScheme === 'dark',
        isSystemTheme: true
      }));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    theme,
    isDark,
    isSystemTheme,
    toggleTheme,
    setSystemTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};