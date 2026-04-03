import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-4 h-4 border-3 border-transparent border-t-white rounded-full"
      />
      <span>Analyzing for biases...</span>
    </div>
  );
};
