import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiArrowLeft, FiCheckCircle, FiClipboard, FiDownload } from 'react-icons/fi';

const severityOrder = { high: 3, medium: 2, low: 1 };

export const BiasAnalysisResult = ({ result, originalText, record, onNewAnalysis, onExport }) => {
  const [copied, setCopied] = useState('');

  const topBiases = useMemo(
    () => [...result.biases].sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]),
    [result.biases]
  );

  const severityData = [
    { label: 'Low', value: result.biases.filter((item) => item.severity === 'low').length },
    { label: 'Medium', value: result.biases.filter((item) => item.severity === 'medium').length },
    { label: 'High', value: result.biases.filter((item) => item.severity === 'high').length },
  ];

  const copyText = async (value, key) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="space-y-8">
      <section className="card-panel p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Audit report</p>
            <h2 className="mt-2 text-4xl font-semibold text-white">Bias and inclusion findings</h2>
            <p className="mt-3 text-stone-300">
              {record?.contentType || result.meta?.contentType} review completed using{' '}
              <span className="font-semibold text-white">{result.meta?.analyzer}</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="secondary-button" onClick={onNewAnalysis}>
              <FiArrowLeft />
              New audit
            </button>
            <button type="button" className="secondary-button" onClick={onExport}>
              <FiDownload />
              Export report
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="metric-card">
            <span>Bias score</span>
            <strong>{result.overallBiasScore}</strong>
          </div>
          <div className="metric-card">
            <span>Risk level</span>
            <strong>{result.riskLevel}</strong>
          </div>
          <div className="metric-card">
            <span>Flags found</span>
            <strong>{result.biases.length}</strong>
          </div>
          <div className="metric-card">
            <span>Categories affected</span>
            <strong>{result.categoryBreakdown.filter((item) => item.count > 0).length}</strong>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-lg font-semibold text-white">Executive summary</h3>
            <p className="mt-3 text-stone-300">{result.summary}</p>
            <p className="mt-4 text-sm leading-7 text-stone-400">{result.educationalTip}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-lg font-semibold text-white">Severity breakdown</h3>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="label" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card-panel p-8">
          <h3 className="text-2xl font-semibold text-white">Flagged language</h3>
          <div className="mt-6 space-y-4">
            {topBiases.length === 0 ? (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100">
                No major issues were flagged in this draft.
              </div>
            ) : (
              topBiases.map((bias, index) => (
                <motion.article
                  key={`${bias.biasedPhrase}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                      {bias.categoryLabel}
                    </span>
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200">
                      {bias.severity}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-medium text-white">"{bias.biasedPhrase}"</p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{bias.explanation}</p>
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Suggested replacement</p>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <p className="text-sm leading-7 text-white">{bias.suggestedReplacement}</p>
                      <button
                        type="button"
                        className="secondary-button shrink-0"
                        onClick={() => copyText(bias.suggestedReplacement, `${bias.biasedPhrase}-${index}`)}
                      >
                        <FiClipboard />
                        {copied === `${bias.biasedPhrase}-${index}` ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <section className="card-panel p-6">
            <h3 className="text-xl font-semibold text-white">Prioritized actions</h3>
            <div className="mt-4 space-y-3">
              {result.prioritizedActions.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-300">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="card-panel p-6">
            <h3 className="text-xl font-semibold text-white">Fairness checklist</h3>
            <div className="mt-4 space-y-3">
              {result.fairnessChecklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-stone-300">
                  <FiCheckCircle className="mt-1 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="card-panel p-8">
          <h3 className="text-2xl font-semibold text-white">Original draft</h3>
          <p className="mt-4 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/20 p-6 text-sm leading-8 text-stone-300">
            {originalText}
          </p>
        </div>

        <div className="card-panel p-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-white">Suggested rewrite</h3>
            <button type="button" className="secondary-button" onClick={() => copyText(result.rewrittenText, 'rewrite')}>
              <FiClipboard />
              {copied === 'rewrite' ? 'Copied' : 'Copy rewrite'}
            </button>
          </div>
          <p className="mt-4 whitespace-pre-wrap rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-sm leading-8 text-white">
            {result.rewrittenText}
          </p>
        </div>
      </section>
    </div>
  );
};
