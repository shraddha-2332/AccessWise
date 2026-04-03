import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BiasAnalysisResult } from './BiasAnalysisResult';
import { LoadingSpinner } from './LoadingSpinner';
import { FiUpload, FiClipboard } from 'react-icons/fi';

export const TextInputForm = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [contentType, setContentType] = useState('general');
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
      const response = await axios.post('http://localhost:5000/api/bias/analyze', {
        text,
        contentType
      });

      setAnalysisResult(response.data.data);
      onAnalysisComplete?.(response.data.data);
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
      setError('Unable to access clipboard. Paste manually or ensure clipboard permissions.');
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

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Analyze Your Content</h2>
        <p className="text-gray-600 mb-6">Paste or upload text to detect hidden biases</p>

        {/* Content Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <div className="flex gap-4 flex-wrap">
            {['general', 'job-posting', 'article', 'social-media', 'marketing'].map((type) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  contentType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste or Upload Text (Max 5000 characters)
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Paste job posting, article, or any text here..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="mt-2 text-sm text-gray-500">
            {text.length}/5000 characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={handlePaste}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FiClipboard /> Paste from Clipboard
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FiUpload /> Upload Text File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || text.trim().length === 0}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition-colors ${
            loading || text.trim().length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? <LoadingSpinner /> : 'Analyze for Bias'}
        </button>
      </div>
    </motion.div>
  );
};
