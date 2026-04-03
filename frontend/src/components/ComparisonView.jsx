import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export function ComparisonView({ originalText, biases }) {
  if (!biases || biases.length === 0) {
    return (
      <motion.div
        className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-green-800 font-bold text-lg">✨ No biases to show!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="font-black text-2xl text-gray-900 mb-6">Before & After Comparison</h3>
      
      {biases.slice(0, 5).map((bias, idx) => (
        <motion.div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          {/* Before */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-xs font-bold text-red-600 mb-2">❌ BIASED</p>
            <p className="text-gray-800 font-mono text-sm">"{bias.biasedPhrase}"</p>
          </div>

          {/* Arrow */}
          <motion.div 
            className="hidden md:flex items-center justify-center"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowRight size={28} className="text-purple-600" />
          </motion.div>

          {/* After */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:col-start-2 md:row-start-1">
            <p className="text-xs font-bold text-green-600 mb-2">✅ IMPROVED</p>
            <p className="text-gray-800 font-mono text-sm">"{bias.suggestedReplacement}"</p>
          </div>

          {/* Category */}
          <div className="md:col-start-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 font-bold uppercase">{bias.category} • {bias.severity}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
