import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextInputForm } from './components/TextInputForm';
import { EducationalPanel } from './components/EducationalPanel';
import './index.css';

function App() {
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const handleAnalysisComplete = (result) => {
    setAnalysisHistory(prev => [
      { id: Date.now(), ...result },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <motion.header 
        className="bg-black bg-opacity-40 backdrop-blur-md border-b border-blue-500 border-opacity-30 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">BiasAudit</h1>
              <p className="text-blue-200 text-sm">Hidden Bias Detector</p>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">How It Works</a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Detect Hidden Bias in Your Content
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            AI-powered platform that identifies gender, age, racial, disability, and socioeconomic biases in any text. 
            Promote fairness and inclusive communication.
          </motion.p>
        </div>

        {/* Main Form */}
        <TextInputForm onAnalysisComplete={handleAnalysisComplete} />

        {/* Educational Panel */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <EducationalPanel />
        </motion.div>

        {/* Features Section */}
        <motion.section 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              icon: '🎯',
              title: 'Multi-Type Detection',
              description: 'Detects gender, age, racial, disability, and socioeconomic biases'
            },
            {
              icon: '💡',
              title: 'Actionable Suggestions',
              description: 'Get alternative, bias-free rewrites for flagged content'
            },
            {
              icon: '📊',
              title: 'Visual Analytics',
              description: 'Beautiful dashboards showing bias breakdown by category and severity'
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              className="bg-white bg-opacity-10 backdrop-blur border border-blue-400 border-opacity-30 rounded-lg p-6 hover:bg-opacity-20 transition-all"
              whileHover={{ translateY: -5 }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-40 border-t border-blue-500 border-opacity-30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-blue-200">
          <p>Built for Frontend Development using AI 2026 Hackathon • SDG 5, 10, 16</p>
          <p className="mt-2 text-sm">Promoting fair and inclusive digital content</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
