import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiChevronDown, FiChevronUp, FiCopy, FiArrowRight } from 'react-icons/fi';

const BIAS_COLORS = {
  gender: '#ec4899',
  age: '#3b82f6',
  racial: '#f97316',
  disability: '#8b5cf6',
  socioeconomic: '#22c55e',
  ability: '#a855f7'
};

export const BiasAnalysisResult = ({ result, originalText, onNewAnalysis }) => {
  const [expandedBias, setExpandedBias] = useState(null);
  const [highlightedText, setHighlightedText] = useState(originalText);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Prepare data for charts
  const biasCountByCategory = {};
  result.biases.forEach(bias => {
    biasCountByCategory[bias.category] = (biasCountByCategory[bias.category] || 0) + 1;
  });

  const categoryData = Object.entries(biasCountByCategory).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count,
    fill: BIAS_COLORS[category]
  }));

  const severityData = [
    { name: 'Low', value: result.biases.filter(b => b.severity === 'low').length },
    { name: 'Medium', value: result.biases.filter(b => b.severity === 'medium').length },
    { name: 'High', value: result.biases.filter(b => b.severity === 'high').length }
  ];

  const handleCopySuggestion = (suggestion, index) => {
    navigator.clipboard.writeText(suggestion);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getRiskColor = () => {
    if (result.riskLevel === 'LOW') return 'text-green-600';
    if (result.riskLevel === 'MEDIUM') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = () => {
    if (result.riskLevel === 'LOW') return 'bg-green-100 border-green-300';
    if (result.riskLevel === 'MEDIUM') return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Summary */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Analysis Results</h2>
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Analyze Another Text
          </button>
        </div>

        {/* Bias Score and Risk Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Overall Score Gauge */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <p className="text-gray-600 text-sm font-medium mb-2">Bias Score</p>
            <div className="relative w-40 h-40 mx-auto">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke={BIAS_COLORS.gender}
                  strokeWidth="8"
                  strokeDasharray={`${(result.overallBiasScore / 100) * 251} 251`}
                />
                <text x="100" y="70" textAnchor="middle" className="text-4xl font-bold fill-gray-800">
                  {result.overallBiasScore}
                </text>
              </svg>
            </div>
            <p className="text-center mt-4 text-gray-600">Higher score = More bias detected</p>
          </motion.div>

          {/* Risk Level and Summary */}
          <div className="space-y-4">
            <div className={`p-6 rounded-lg border-2 ${getRiskBgColor()}`}>
              <p className="text-gray-600 text-sm font-medium mb-2">Risk Level</p>
              <p className={`text-4xl font-bold ${getRiskColor()}`}>
                {result.riskLevel}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-2">Biases Detected</p>
              <p className="text-3xl font-bold text-gray-800">{result.biases.length}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Analysis Summary</h3>
          <p className="text-gray-700">{result.summary}</p>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Bias Category Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Bias by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No bias detected
            </div>
          )}
        </div>

        {/* Severity Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Severity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Educational Tip */}
      {result.educationalTip && (
        <motion.div 
          className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="font-bold text-gray-800 mb-2">💡 Learning Tip</h3>
          <p className="text-gray-700">{result.educationalTip}</p>
        </motion.div>
      )}

      {/* Detailed Bias Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Bias Analysis</h3>

        {result.biases.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">✨ No significant biases detected in this text!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.biases.map((bias, index) => (
              <motion.div 
                key={index}
                className={`bias-${bias.category} p-4 rounded-lg cursor-pointer transition-all`}
                onClick={() => setExpandedBias(expandedBias === index ? null : index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-3 py-1 bg-white rounded-full text-sm font-semibold" style={{
                        color: BIAS_COLORS[bias.category],
                        borderLeft: `3px solid ${BIAS_COLORS[bias.category]}`
                      }}>
                        {bias.category.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        bias.severity === 'high' ? 'bg-red-200 text-red-800' :
                        bias.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {bias.severity.toUpperCase()} SEVERITY
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm text-gray-800 bg-white bg-opacity-70 px-3 py-2 rounded">
                      "{bias.biasedPhrase}"
                    </p>
                  </div>
                  <button className="ml-4 text-gray-600 hover:text-gray-800">
                    {expandedBias === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                  </button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedBias === index && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-current border-opacity-20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Why This Is Biased</p>
                          <p className="text-gray-700 text-sm">{bias.explanation}</p>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Suggested Alternative</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-white bg-opacity-70 p-3 rounded border-2 border-green-400">
                              <p className="text-green-700 font-mono text-sm">{bias.suggestedReplacement}</p>
                            </div>
                            <button
                              onClick={() => handleCopySuggestion(bias.suggestedReplacement, index)}
                              className="px-3 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 transition-colors"
                            >
                              {copiedIndex === index ? '✓' : <FiCopy />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
