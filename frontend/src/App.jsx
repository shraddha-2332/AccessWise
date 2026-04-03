import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiFileText, FiShield, FiTarget } from 'react-icons/fi';
import { TextInputForm } from './components/TextInputForm';
import { EducationalPanel } from './components/EducationalPanel';
import './index.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [healthStatus, setHealthStatus] = useState('Checking service');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [healthResponse, historyResponse] = await Promise.all([
          fetch(`${apiUrl}/api/health`),
          fetch(`${apiUrl}/api/bias/history`),
        ]);

        if (healthResponse.ok) {
          const health = await healthResponse.json();
          setHealthStatus(health.status);
        } else {
          setHealthStatus('Service unavailable');
        }

        if (historyResponse.ok) {
          const history = await historyResponse.json();
          setAnalysisHistory(history.history || []);
        }
      } catch {
        setHealthStatus('Offline - backend connection failed');
      }
    };

    loadInitialData();
  }, []);

  const handleAnalysisComplete = (record) => {
    setAnalysisHistory((prev) => [record, ...prev.filter((entry) => entry.id !== record.id)].slice(0, 10));
  };

  return (
    <div className="min-h-screen app-shell text-stone-100">
      <div className="ambient-grid" />
      <header className="border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="eyebrow">AI Trust Intelligence Platform</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Responsible Language Audit Workspace
            </h1>
          </div>
          <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            {healthStatus}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-panel p-8"
          >
            <p className="eyebrow">Real-world use case</p>
            <h2 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight text-white">
              Audit job posts, public messaging, and education copy before bias becomes risk.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
              This product is designed for teams that publish language at scale and need a practical,
              reviewable way to catch exclusionary phrasing, generate safer rewrites, and keep an audit trail.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: <FiShield />,
                  title: 'Working offline baseline',
                  body: 'Rule-based detection always works, even when no external AI key is configured.',
                },
                {
                  icon: <FiTarget />,
                  title: 'Action-oriented reporting',
                  body: 'Every audit returns rewrite guidance, prioritized actions, and a fairness checklist.',
                },
                {
                  icon: <FiFileText />,
                  title: 'Persistent review history',
                  body: 'Analyses are stored locally so teams can revisit and compare previous audits.',
                },
                {
                  icon: <FiActivity />,
                  title: 'Built for operational teams',
                  body: 'The workflow fits hiring, policy, marketing, and education review processes.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/10 p-3 text-xl text-sky-200">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-panel p-6"
          >
            <p className="eyebrow">Recent activity</p>
            <div className="mt-4 space-y-4">
              {analysisHistory.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 text-sm text-stone-300">
                  No saved audits yet. Run an analysis to start building an internal review trail.
                </div>
              ) : (
                analysisHistory.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-sky-200">{entry.contentType}</p>
                        <p className="mt-1 text-sm text-stone-300">{entry.textPreview}...</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-white">{entry.result?.overallBiasScore ?? '--'}</p>
                        <p className="text-xs text-stone-400">{entry.result?.riskLevel ?? 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </section>

        <section className="mt-8">
          <TextInputForm onAnalysisComplete={handleAnalysisComplete} history={analysisHistory} />
        </section>

        <section className="mt-8">
          <EducationalPanel />
        </section>
      </main>
    </div>
  );
}

export default App;
