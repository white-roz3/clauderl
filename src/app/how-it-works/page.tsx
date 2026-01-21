'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HowItWorksPage() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(11, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    {
      id: '01',
      title: 'FAIR COMPARISON',
      content: 'Every model receives identical inputs, time constraints, and environmental conditions. No prompt engineering advantages. No cherry-picked scenarios. The same challenge, the same rules.',
      status: 'VERIFIED',
    },
    {
      id: '02',
      title: 'REAL-TIME REASONING',
      content: 'Watch each model\'s decision process as it happens. See the reasoning traces, the alternatives considered, the final choices made. Full transparency into how frontier models think.',
      status: 'LIVE',
    },
    {
      id: '03',
      title: '15 COGNITIVE CHALLENGES',
      content: 'From spatial reasoning to social intelligence, each environment tests a different aspect of general intelligence. Together, they form a comprehensive benchmark of model capabilities.',
      status: 'ACTIVE',
    },
    {
      id: '04',
      title: 'TRANSPARENT SCORING',
      content: 'Every metric is public. Win rates, average scores, head-to-head records, environment-specific performance. The data speaks for itself.',
      status: 'PUBLIC',
    },
  ];

  const methodology = [
    {
      label: 'IDENTICAL PROMPTS',
      value: 'Each model receives the exact same system prompt and environmental context.',
    },
    {
      label: 'SAME COMPUTE BUDGET',
      value: 'All models get equal time to respond. No advantages from faster inference.',
    },
    {
      label: 'REPRODUCIBLE RESULTS',
      value: 'Every run is logged with seeds and parameters. Anyone can verify our results.',
    },
    {
      label: 'NO TRAINING LEAKAGE',
      value: 'Environments are procedurally generated. No model has seen these specific challenges.',
    },
  ];

  return (
    <main 
      className="min-h-screen pt-16 font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top Status Bar */}
      <div 
        className="border-b px-4 py-2 flex justify-between text-xs"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--text-muted)' }}>PATH:</span>
          <code style={{ color: 'var(--accent)' }}>/system/methodology</code>
        </div>
        <div className="flex items-center gap-6">
          <span style={{ color: 'var(--text-muted)' }}>
            UTC: <span style={{ color: 'var(--accent)' }}>{currentTime}</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">METHODOLOGY</span>
              <span className="status-badge">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                DOCUMENTED
              </span>
            </div>
            <div className="px-4 py-3">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> HOW IT WORKS
              </h1>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                The benchmark that benchmarks can't game
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Principles Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">CORE PRINCIPLES</span>
                <span className="text-xs" style={{ color: 'var(--green)' }}>4 ACTIVE</span>
              </div>
              <div className="hud-panel-content">
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4"
                      style={{ 
                        border: '1px solid var(--border)',
                        background: 'var(--bg-panel)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-xs font-bold px-2 py-1"
                            style={{ 
                              background: 'var(--accent)',
                              color: 'var(--bg-primary)'
                            }}
                          >
                            {section.id}
                          </span>
                          <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                            {section.title}
                          </h3>
                        </div>
                        <span 
                          className="text-xs px-2 py-0.5"
                          style={{ 
                            border: '1px solid var(--green)',
                            color: 'var(--green)'
                          }}
                        >
                          {section.status}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {section.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Methodology Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">METHODOLOGY SPECS</span>
              </div>
              <div className="hud-panel-content">
                <div className="overflow-x-auto">
                  <table className="hud-table text-xs w-full">
                    <thead>
                      <tr>
                        <th>PARAMETER</th>
                        <th>SPECIFICATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {methodology.map((item) => (
                        <tr key={item.label}>
                          <td>
                            <span style={{ color: 'var(--accent)' }}>{item.label}</span>
                          </td>
                          <td style={{ color: 'var(--text-secondary)' }}>
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-4">
            
            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">SYSTEM STATUS</span>
              </div>
              <div className="hud-panel-content space-y-3">
                {[
                  { label: 'ENVIRONMENTS', value: '15', status: 'ACTIVE' },
                  { label: 'MODELS', value: '4', status: 'ONLINE' },
                  { label: 'UPTIME', value: '99.97%', status: null },
                  { label: 'AVG LATENCY', value: '42ms', status: null },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--text-primary)' }}>{stat.value}</span>
                      {stat.status && (
                        <span 
                          className="text-xs px-1.5"
                          style={{ 
                            color: 'var(--green)',
                            border: '1px solid var(--green)'
                          }}
                        >
                          {stat.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quote Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hud-panel"
              style={{ border: '1px solid var(--accent)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">// MISSION</span>
              </div>
              <div className="hud-panel-content">
                <pre 
                  className="text-xs leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--text-secondary)' }}
                >
{`> "The goal isn't to crown 
>  a winner. It's to 
>  understand how different
>  architectures approach
>  intelligence."

// ClaudeArena Research`}
                </pre>
              </div>
            </motion.div>

            {/* ASCII Art Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">BENCHMARK FLOW</span>
              </div>
              <div className="hud-panel-content">
                <pre 
                  className="text-xs"
                  style={{ 
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
{`┌─────────────┐
│   INPUT     │
│  [PROMPT]   │
└──────┬──────┘
       │
       v
┌─────────────┐
│   MODEL     │
│  [PROCESS]  │
└──────┬──────┘
       │
       v
┌─────────────┐
│   OUTPUT    │
│  [ACTION]   │
└──────┬──────┘
       │
       v
┌─────────────┐
│   SCORE     │
│  [EVAL]     │
└─────────────┘`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
