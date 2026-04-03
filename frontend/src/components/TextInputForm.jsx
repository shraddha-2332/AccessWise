import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiClipboard, FiDownload, FiFileText, FiRefreshCcw, FiSearch } from 'react-icons/fi';
import { BiasAnalysisResult } from './BiasAnalysisResult';
import { LiveBiasDetector } from './LiveBiasDetector';
import { ToastContainer, useToast } from './Toast';
import { SHORTCUTS, useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SAMPLE_TEXTS = {
  GENERAL:
    'We need energetic guys who can thrive under pressure and work long hours without complaint.',
  'JOB POSTING':
    'Looking for a young digital native with a polished background, flawless English, and the stamina to crush deadlines.',
  ARTICLE:
    'The elderly residents predictably struggled with the technology, while immigrant families needed extra hand-holding.',
  'SOCIAL MEDIA':
    'Only a genius could keep up with this. Not for beginners or people who need accommodations.',
  MARKETING:
    'An exclusive offer for successful businessmen who enjoy luxury and know how to win.',
  EDUCATION:
    'These students may not be ready for advanced material, especially those from underprivileged homes.',
};

export const TextInputForm = ({ onAnalysisComplete, history = [] }) => {
  const [text, setText] = useState('');
  const [contentType, setContentType] = useState('JOB POSTING');
  const [audience, setAudience] = useState('Candidates and applicants');
  const [intent, setIntent] = useState('Pre-publication bias and inclusion audit');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeRecord, setActiveRecord] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const resetComposer = () => {
    setAnalysisResult(null);
    setActiveRecord(null);
    setText('');
  };

  useKeyboardShortcuts(
    () => !loading && text.trim() && handleAnalyze(),
    () => resetComposer()
  );

  const handleAnalyze = async () => {
    if (!text.trim()) {
      addToast('Add content to audit before running analysis.', 'warning');
      return;
    }

    if (text.length > 5000) {
      addToast('Content is limited to 5000 characters for a single audit.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/bias/analyze`, {
        text,
        contentType,
        audience,
        intent,
      });

      setAnalysisResult(response.data.data);
      setActiveRecord(response.data.record);
      onAnalysisComplete?.(response.data.record);
      addToast('Audit complete. Review the findings and suggested rewrite below.', 'success');
    } catch (error) {
      addToast(error.response?.data?.error || 'Unable to run audit. Check backend availability.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      addToast('Clipboard content pasted into the audit workspace.', 'success');
    } catch {
      addToast('Clipboard read failed. Paste the content directly into the editor.', 'error');
    }
  };

  const handleExport = () => {
    if (!analysisResult || !activeRecord) {
      return;
    }

    const blob = new Blob(
      [
        JSON.stringify(
          {
            record: activeRecord,
            result: analysisResult,
          },
          null,
          2
        ),
      ],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `language-audit-${activeRecord.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (analysisResult) {
    return (
      <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <BiasAnalysisResult
          result={analysisResult}
          originalText={text}
          record={activeRecord}
          onExport={handleExport}
          onNewAnalysis={resetComposer}
        />
      </>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="card-panel p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Audit workspace</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Review content before it goes live</h2>
              <p className="mt-3 max-w-2xl text-stone-300">
                Paste content, choose the context, and generate a bias and inclusion report with rewrite recommendations.
              </p>
            </div>
            <button type="button" onClick={handlePaste} className="secondary-button">
              <FiClipboard />
              Paste content
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <label className="field-group">
              <span>Content type</span>
              <select value={contentType} onChange={(event) => setContentType(event.target.value)}>
                {Object.keys(SAMPLE_TEXTS).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field-group">
              <span>Primary audience</span>
              <input value={audience} onChange={(event) => setAudience(event.target.value)} />
            </label>

            <label className="field-group">
              <span>Review intent</span>
              <input value={intent} onChange={(event) => setIntent(event.target.value)} />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-stone-300">
              Content under review
            </span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste a job description, marketing copy, policy text, public statement, or classroom content here."
              className="audit-textarea"
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-stone-400">
              {text.length}/5000 characters. Use <span className="font-semibold text-stone-200">Ctrl+Enter</span> to analyze.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="secondary-button" onClick={() => setText(SAMPLE_TEXTS[contentType])}>
                <FiFileText />
                Load sample
              </button>
              <button type="button" className="secondary-button" onClick={resetComposer}>
                <FiRefreshCcw />
                Clear
              </button>
              <button type="button" onClick={handleAnalyze} className="primary-button" disabled={loading}>
                <FiSearch />
                {loading ? 'Auditing...' : 'Run audit'}
              </button>
            </div>
          </div>

          {text ? (
            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-5">
              <LiveBiasDetector text={text} />
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-300">Keyboard shortcuts</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {SHORTCUTS.map((shortcut) => (
                <div key={shortcut.key} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-stone-300">
                  <p className="font-semibold text-white">{shortcut.key}</p>
                  <p className="mt-1">{shortcut.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="card-panel p-6">
          <p className="eyebrow">Saved audits</p>
          <div className="mt-4 space-y-4">
            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-stone-300">
                Previous reports will appear here after you complete an audit.
              </div>
            ) : (
              history.slice(0, 6).map((entry) => (
                <motion.button
                  whileHover={{ y: -2 }}
                  key={entry.id}
                  type="button"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
                  onClick={() => {
                    setText(entry.originalText || '');
                    setContentType(entry.contentType || 'GENERAL');
                    setAudience(entry.audience || 'General audience');
                    setIntent(entry.intent || 'Bias and inclusion review');
                    setAnalysisResult(entry.result);
                    setActiveRecord(entry);
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-sky-200">{entry.contentType}</span>
                    <span className="text-sm font-semibold text-white">{entry.result?.riskLevel}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-300">{entry.textPreview}...</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
                    <span>Score {entry.result?.overallBiasScore ?? '--'}</span>
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                </motion.button>
              ))
            )}
          </div>

          <button type="button" onClick={handleExport} className="secondary-button mt-5 w-full justify-center" disabled={!analysisResult}>
            <FiDownload />
            Export current report
          </button>
        </aside>
      </div>
    </>
  );
};
