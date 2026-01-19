'use client';

import { motion } from 'framer-motion';
import { MODELS } from '@/lib/constants';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RankingsPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedModel, setSelectedModel] = useState('opus');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(11, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const rankings = [
    { rank: 1, modelId: 'opus', winRate: 78, avgScore: 94520, bestEnv: 'Abstract Reasoning', matches: 6247 },
    { rank: 2, modelId: 'gpt', winRate: 71, avgScore: 87340, bestEnv: 'Resource Optimization', matches: 5891 },
    { rank: 3, modelId: 'gemini', winRate: 68, avgScore: 82150, bestEnv: 'Physics Intuition', matches: 5423 },
    { rank: 4, modelId: 'grok', winRate: 62, avgScore: 76890, bestEnv: 'Adversarial Combat', matches: 5286 },
  ];

  const headToHead = [
    { model1: 'opus', model2: 'gpt', wins: 147, losses: 89 },
    { model1: 'opus', model2: 'gemini', wins: 156, losses: 72 },
    { model1: 'opus', model2: 'grok', wins: 168, losses: 64 },
  ];

  const getModel = (id: string) => MODELS.find(m => m.id === id);
  const selected = getModel(selectedModel);

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
          <code style={{ color: 'var(--accent)' }}>/rankings/full</code>
        </div>
        <div className="flex items-center gap-6">
          <span style={{ color: 'var(--text-muted)' }}>
            UTC: <span style={{ color: 'var(--accent)' }}>{currentTime}</span>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            LAST UPDATE: <span style={{ color: 'var(--green)' }}>LIVE</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">RANKINGS DATABASE</span>
              <span className="status-badge">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                REAL-TIME
              </span>
            </div>
            <div className="px-4 py-3">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> FULL RANKINGS
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Rankings Table */}
          <div className="lg:col-span-3">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title">MODEL PERFORMANCE</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  SORTED BY WIN RATE
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="hud-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>MODEL</th>
                      <th>WIN RATE</th>
                      <th>AVG SCORE</th>
                      <th>BEST ENV</th>
                      <th>MATCHES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((entry) => {
                      const model = getModel(entry.modelId);
                      if (!model) return null;
                      return (
                        <tr 
                          key={entry.modelId}
                          className="cursor-pointer"
                          onClick={() => setSelectedModel(entry.modelId)}
                          style={{ 
                            background: selectedModel === entry.modelId ? 'rgba(0, 212, 170, 0.1)' : 'transparent'
                          }}
                        >
                          <td>
                            <span 
                              className="font-bold"
                              style={{ color: entry.rank === 1 ? 'var(--accent)' : 'var(--text-secondary)' }}
                            >
                              {entry.rank}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-2 h-6"
                                style={{ backgroundColor: model.color }}
                              />
                              <div>
                                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                  {model.name}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                  {model.company}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span 
                                className="font-bold"
                                style={{ color: entry.winRate > 70 ? 'var(--accent)' : 'var(--text-primary)' }}
                              >
                                {entry.winRate}%
                              </span>
                              <div className="w-20 h-1.5" style={{ background: 'var(--border)' }}>
                                <div 
                                  className="h-full"
                                  style={{ 
                                    width: `${entry.winRate}%`,
                                    background: entry.rank === 1 ? 'var(--accent)' : model.color
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td style={{ color: 'var(--text-secondary)' }}>
                            {entry.avgScore.toLocaleString()}
                          </td>
                          <td style={{ color: 'var(--text-secondary)' }}>
                            {entry.bestEnv}
                          </td>
                          <td style={{ color: 'var(--text-muted)' }}>
                            {entry.matches.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Head to Head */}
            <div className="hud-panel mt-4" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title">HEAD TO HEAD</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  VS OPUS 4.5
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {headToHead.map((match, i) => {
                  const model2 = getModel(match.model2);
                  const total = match.wins + match.losses;
                  const winPct = Math.round((match.wins / total) * 100);
                  return (
                    <div 
                      key={i}
                      className="p-3"
                      style={{ 
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs" style={{ color: 'var(--accent)' }}>OPUS</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>VS</span>
                        <span className="text-xs" style={{ color: model2?.color }}>{model2?.name}</span>
                      </div>
                      <div className="h-2 flex" style={{ background: 'var(--border)' }}>
                        <div 
                          className="h-full"
                          style={{ width: `${winPct}%`, background: 'var(--accent)' }}
                        />
                        <div 
                          className="h-full"
                          style={{ width: `${100 - winPct}%`, background: model2?.color }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span style={{ color: 'var(--accent)' }}>{match.wins}W</span>
                        <span style={{ color: 'var(--text-muted)' }}>{match.losses}L</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            
            {/* Champion Banner */}
            <div 
              className="hud-panel" 
              style={{ 
                border: '1px solid var(--accent)',
                boxShadow: '0 0 20px var(--accent-glow)'
              }}
            >
              <div className="hud-panel-header" style={{ background: 'rgba(0, 212, 170, 0.1)' }}>
                <span className="hud-panel-title" style={{ color: 'var(--accent)' }}>CHAMPION</span>
              </div>
              <div className="hud-panel-content text-center">
                <div 
                  className="text-3xl font-bold mb-1"
                  style={{ color: 'var(--accent)' }}
                >
                  OPUS 4.5
                </div>
                <div className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  ANTHROPIC
                </div>
                <div className="text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                  78<span className="text-xl">%</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  WIN RATE
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title">STATISTICS</span>
              </div>
              <div className="hud-panel-content space-y-3">
                {[
                  { label: 'TOTAL MATCHES', value: '24,847' },
                  { label: 'ACTIVE MODELS', value: '4' },
                  { label: 'ENVIRONMENTS', value: '15' },
                  { label: 'AVG MATCH TIME', value: '4.2min' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Model */}
            {selected && (
              <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
                <div className="hud-panel-header">
                  <span className="hud-panel-title">SELECTED</span>
                </div>
                <div className="hud-panel-content">
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-2 h-8"
                      style={{ backgroundColor: selected.color }}
                    />
                    <div>
                      <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
                        {selected.name}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {selected.company}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>PARAMETERS</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{selected.parameters}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>WIN RATE</span>
                      <span style={{ color: 'var(--accent)' }}>{selected.winRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Back Link */}
            <Link href="/">
              <button className="hud-button w-full">
                BACK TO ARENA
              </button>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}
