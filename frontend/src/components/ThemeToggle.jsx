import React from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
      title="Toggle theme"
    >
      {isDark ? (
        <FiSun size={24} className="text-yellow-400" />
      ) : (
        <FiMoon size={24} className="text-gray-600" />
      )}
    </motion.button>
  );
}
