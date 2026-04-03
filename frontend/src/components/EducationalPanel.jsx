import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export const EducationalPanel = () => {
  const [expanded, setExpanded] = useState(false);

  const guides = [
    {
      category: 'Gender Bias',
      description: 'Gendered language in job postings, articles, or marketing.',
      examples: [
        'Problematic: "We need an aggressive, competitive salesman"',
        'Better: "We seek a results-driven sales professional"',
        'Why: "Aggressive" and "salesman" assume gender and perpetuate stereotypes.'
      ]
    },
    {
      category: 'Age Bias',
      description: 'Language that discriminates based on age.',
      examples: [
        'Problematic: "Looking for young, energetic tech enthusiasts"',
        'Better: "Seeking tech professionals with passion for innovation"',
        'Why: "Young" and "energetic" exclude older workers and violate age discrimination laws.'
      ]
    },
    {
      category: 'Ability Bias',
      description: 'Assumptions about physical or mental abilities.',
      examples: [
        'Problematic: "Must be able to work in our fast-paced office"',
        'Better: "We offer flexible work arrangements; schedule negotiable"',
        'Why: "Fast-paced" excludes people with disabilities who work effectively with accommodations.'
      ]
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <h3 className="text-xl font-bold text-gray-800">📚 Learn About Bias Detection</h3>
          <p className="text-gray-600 text-sm mt-1">Understanding different types of bias</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown size={24} className="text-gray-600" />
        </motion.div>
      </button>

      {expanded && (
        <motion.div 
          className="p-6 border-t border-gray-200 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {guides.map((guide, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-800 text-lg">{guide.category}</h4>
              <p className="text-gray-600 text-sm mt-1">{guide.description}</p>
              <div className="mt-3 space-y-2">
                {guide.examples.map((example, i) => (
                  <p key={i} className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                    {example}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
