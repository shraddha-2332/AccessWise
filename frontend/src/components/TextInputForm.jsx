import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BiasAnalysisResult } from './BiasAnalysisResult';
import { FiUpload, FiClipboard, FiCheck, FiAlertCircle } from 'react-icons/fi';

export const TextInputForm = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [contentType, setContentType] = useState('GENERAL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleAnalyze = async () => {
    if (text.trim().length === 0) {
      setError('Please enter some text to analyze');
      return;
    }

    if (text.length > 5000) {
      setError('Text must be less than 5000 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/bias-analysis/analyze`, {
        text: text.trim(),
        contentType
      });

      setAnalysisResult(response.data);
      onAnalysisComplete?.(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze. Check backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setError('');
    } catch (err) {
      setError('Failed to read clipboard. Please paste manually.');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setText(e.target?.result || '');
      setError('');
    };
    reader.readAsText(file);
  };

  if (analysisResult) {
    return (
      <BiasAnalysisResult 
        result={analysisResult} 
        originalText={text}
        onNewAnalysis={() => {
          setAnalysisResult(null);
          setText('');
        }}
      />
    );
  }

  const contentTypes = ['GENERAL', 'JOB POSTING', 'ARTICLE', 'SOCIAL MEDIA', 'MARKETING', 'EDUCATION'];

  return (
    <motion.div
      className="bg-gradient-to-br from-white from-5% via-purple-50 to-blue-50 backdrop-blur-xl border border-white border-opacity-40 rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl shadow-purple-500/20"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content Type Section */}
      <div className="mb-8">
        <label className="block text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
          Content Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contentTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => setContentType(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                contentType === type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Text Input Section */}
      <div className="mb-6">
        <label className="block text-gray-900 font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
          Your Content
        </label>
        <motion.div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Paste job posting, article, social media post, or any text to analyze..."
            className="w-full h-44 bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-2xl p-5 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none font-medium text-base"
          />
          <AnimatePresence>
            {text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-3 right-4 flex items-center gap-2 text-sm font-semibold text-gray-600"
              >
                <FiCheck className="text-green-500" /> {text.length}/5000
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="mb-6 bg-red-50 border-2 border-red-400 rounded-xl p-4 text-red-700 flex items-start gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0 text-lg" />
            <span className="font-semibold">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          onClick={handlePaste}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
        >
          <FiClipboard size={20} /> Paste
        </motion.button>
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30"
        >
          <FiUpload size={20} /> Upload
        </motion.button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".txt,.pdf,.doc,.docx"
          className="hidden"
        />
      </div>

      {/* Main Analyze Button */}
      <motion.button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
        whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(99, 102, 241, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-purple-500/40"
      >
        {loading ? (
          <motion.div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Analyzing your content...
          </motion.div>
        ) : (
          '✨ Analyze for Bias'
        )}
      </motion.button>

      {/* Info Text */}
      <p className="text-center text-gray-600 text-sm font-medium mt-4">
        Max 5000 characters • Analysis takes 3-5 seconds • 100% private
      </p>
    </motion.div>
  );
};
