import React from 'react';
import { Sun, Moon } from 'lucide-react'; 
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="
        p-2 rounded-full transition-colors duration-300
        text-gray-600 bg-gray-100 hover:bg-gray-200
        dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-indigo-500 dark:focus:ring-offset-gray-900
      "
    >

      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-700" />
      )}
    </button>
  );
};

export default ThemeToggleSwitch;