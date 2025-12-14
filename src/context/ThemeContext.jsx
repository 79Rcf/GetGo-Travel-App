import React, { createContext, useState, useEffect, useContext } from 'react';


const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
  
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  

    root.setAttribute('data-theme', theme); 
  
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};