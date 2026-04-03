import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';

export function AdvancedFilters({ biases, onFilter }) {
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('severity');
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    let filtered = [...biases];

    if (selectedSeverity) {
      filtered = filtered.filter(b => b.severity === selectedSeverity);
    }
    if (selectedCategory) {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'severity') {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    } else if (sortBy === 'category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    onFilter(filtered);
  }, [selectedSeverity, selectedCategory, sortBy, biases, onFilter]);

  const categories = [...new Set(biases.map(b => b.category))];
  const severities = ['high', 'medium', 'low'];

  return (
    <motion.div className="mb-6">
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <FiFilter size={20} /> Filters & Sort
      </motion.button>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 space-y-4"
        >
          {/* Severity Filter */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Filter by Severity</p>
            <div className="flex gap-2 flex-wrap">
              {severities.map(sev => (
                <motion.button
                  key={sev}
                  onClick={() => setSelectedSeverity(selectedSeverity === sev ? null : sev)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedSeverity === sev
                      ? sev === 'high' ? 'bg-red-500 text-white' :
                        sev === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {sev.toUpperCase()} {selectedSeverity === sev && <FiX className="inline ml-1" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Filter by Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-500 text-white'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {cat.toUpperCase()} {selectedCategory === cat && <FiX className="inline ml-1" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Sort by</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-bold focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            >
              <option value="severity">Severity (High First)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
