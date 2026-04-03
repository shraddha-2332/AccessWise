import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AdvancedStats({ result }) {
  // Category breakdown with percentages
  const categoryStats = {};
  result.biases.forEach(bias => {
    if (!categoryStats[bias.category]) {
      categoryStats[bias.category] = 0;
    }
    categoryStats[bias.category]++;
  });

  const categoryData = Object.entries(categoryStats).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: count,
    percentage: ((count / result.biases.length) * 100).toFixed(1)
  }));

  // Severity progression
  const severityStats = {
    low: result.biases.filter(b => b.severity === 'low').length,
    medium: result.biases.filter(b => b.severity === 'medium').length,
    high: result.biases.filter(b => b.severity === 'high').length
  };

  const severityData = [
    { name: 'Low', value: severityStats.low, fill: '#22c55e' },
    { name: 'Medium', value: severityStats.medium, fill: '#eab308' },
    { name: 'High', value: severityStats.high, fill: '#ef4444' }
  ];

  // Impact metrics
  const metrics = [
    {
      label: 'Total Biases Found',
      value: result.biases.length,
      color: 'from-blue-400 to-blue-600'
    },
    {
      label: 'High Severity Issues',
      value: severityStats.high,
      color: 'from-red-400 to-red-600'
    },
    {
      label: 'Text Health Score',
      value: `${100 - result.overallBiasScore}%`,
      color: 'from-green-400 to-green-600'
    },
    {
      label: 'Affected Categories',
      value: Object.keys(categoryStats).length,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            className={`bg-gradient-to-br ${metric.color} p-6 rounded-2xl text-white shadow-xl`}
            whileHover={{ translateY: -5, scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="text-sm font-bold opacity-90 mb-2">{metric.label}</p>
            <p className="text-4xl font-black">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution - Pie */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          whileHover={{ shadow: 'lg' }}
        >
          <h4 className="text-xl font-black text-gray-900 mb-4">Category Distribution</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {['#ec4899', '#3b82f6', '#f97316', '#8b5cf6', '#22c55e', '#a855f7'].map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Severity Breakdown - Bar */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          whileHover={{ shadow: 'lg' }}
        >
          <h4 className="text-xl font-black text-gray-900 mb-4">Severity Analysis</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={severityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              {severityData.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Insights */}
      <motion.div
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-purple-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4 className="text-lg font-black text-gray-900 mb-3">🎯 Key Insights</h4>
        <ul className="space-y-2">
          {categoryData.slice(0, 3).map((cat, idx) => (
            <li key={idx} className="text-gray-700 font-medium">
              • <strong>{cat.name}</strong> bias appears in {cat.percentage}% of detected issues
            </li>
          ))}
          <li className="text-gray-700 font-medium">
            • {((severityStats.high / result.biases.length) * 100).toFixed(0)}% of biases are high severity - immediate action needed
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
