'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MODELS } from '@/lib/constants';

const LeaderboardPreview: React.FC = () => {
  const [activeModel, setActiveModel] = useState('opus');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const previewData = [
    { rank: 1, modelId: 'opus', winRate: 78, avgScore: 94520, status: 'CHAMPION', trend: '+2.3%' },
    { rank: 2, modelId: 'gpt', winRate: 71, avgScore: 87340, status: 'ACTIVE', trend: '-0.8%' },
    { rank: 3, modelId: 'gemini', winRate: 68, avgScore: 82150, status: 'ACTIVE', trend: '+1.1%' },
    { rank: 4, modelId: 'grok', winRate: 62, avgScore: 76890, status: 'ACTIVE', trend: '-0.3%' },
  ];

  const getModel = (id: string) => MODELS.find(m => m.id === id);
  const currentModel = getModel(activeModel);

  const logs = [
    { time: '08:32:10', type: 'MATCH_END', message: 'Opus defeated GPT-5 in Spatial Reasoning' },
    { time: '08:31:45', type: 'SCORE_UPDATE', message: 'New high score: 94,520 pts' },
    { time: '08:30:22', type: 'MATCH_START', message: 'Opus vs Gemini - Abstract Reasoning' },
  ];

  return (
    <section 
      className="py-8 sm:py-12 md:py-20 relative overflow-hidden font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        
        {/* HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          
          {/* LEFT: Model Schematic Display */}
          <div className="lg:col-span-2">
            <div 
              className="hud-panel h-full min-h-[280px] sm:min-h-[400px] relative"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Corner decorations - hidden on mobile */}
              <div className="hidden sm:block absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: 'var(--accent)' }} />

              {/* Scanning line effect */}
              <motion.div
                className="absolute left-0 right-0 h-px opacity-50"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                  top: `${scanProgress}%`
                }}
              />

              {/* Header */}
              <div className="hud-panel-header">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="status-dot" style={{ width: 5, height: 5 }} />
                  <span className="hud-panel-title text-[10px] sm:text-xs">MODEL ANALYSIS</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="hidden sm:inline">SCANNING...</span>
                  <span style={{ color: 'var(--accent)' }}>{scanProgress}%</span>
                </div>
              </div>

              {/* Schematic Area */}
              <div className="p-3 sm:p-6 relative">
                {/* Grid background */}
                <div 
                  className="absolute inset-3 sm:inset-6 opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(var(--grid-color-strong) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color-strong) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Mobile: Simplified Stats View */}
                <div className="sm:hidden relative z-10 grid grid-cols-3 gap-2 py-4">
                  {[
                    { label: 'SPATIAL', value: '92%' },
                    { label: 'TEMPORAL', value: '87%' },
                    { label: 'ABSTRACT', value: '94%' },
                  ].map((stat) => (
                    <div 
                      key={stat.label}
                      className="text-center p-3"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                    >
                      <div className="text-[9px] mb-1" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold" style={{ color: 'var(--accent)' }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile: Neural Network simplified */}
                <div className="sm:hidden text-center py-4">
                  <div 
                    className="inline-block px-4 py-2 text-xs"
                    style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
                  >
                    NEURAL NETWORK
                  </div>
                  <div className="w-px h-6 mx-auto" style={{ background: 'var(--accent)' }} />
                  <div 
                    className="inline-block px-4 py-2 text-xs"
                    style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
                  >
                    CONFIDENCE: 96%
                  </div>
                </div>

                {/* Desktop: ASCII Art Model Visualization */}
                <pre 
                  className="hidden sm:block text-center relative z-10 text-[10px] md:text-xs leading-tight overflow-x-auto"
                  style={{ color: 'var(--accent)' }}
                >
{`
                         ┌─────────────────────┐
                         │   NEURAL NETWORK    │
                         │   ████████████████  │
                         └─────────┬───────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
        ┌─────┴─────┐        ┌─────┴─────┐        ┌─────┴─────┐
        │  SPATIAL  │        │ TEMPORAL  │        │ ABSTRACT  │
        │   92%     │        │   87%     │        │   94%     │
        └─────┬─────┘        └─────┬─────┘        └─────┬─────┘
              │                    │                    │
              └────────────────────┼────────────────────┘
                                   │
                         ┌─────────┴───────────┐
                         │   OUTPUT LAYER      │
                         │   CONFIDENCE: 96%   │
                         └─────────────────────┘
`}
                </pre>

                {/* Floating Labels - Desktop only */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden md:block absolute top-8 left-8 px-3 py-1.5 text-xs"
                  style={{ 
                    background: 'var(--bg-panel)', 
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)'
                  }}
                >
                  PROCESSING: 72%
                  <div className="mt-1 flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 h-3"
                        style={{ background: i < 7 ? 'var(--accent)' : 'var(--border)' }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:block absolute top-8 right-8 px-3 py-1.5 text-xs"
                  style={{ 
                    background: 'var(--bg-panel)', 
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  MEMORY: 4.2TB
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="hidden md:block absolute bottom-8 left-8 px-3 py-1.5 text-xs"
                  style={{ 
                    background: 'var(--bg-panel)', 
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)'
                  }}
                >
                  INFERENCE: 24ms
                </motion.div>
              </div>

              {/* Bottom Status Bar */}
              <div 
                className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs"
                style={{ 
                  background: 'rgba(0, 212, 170, 0.05)',
                  borderTop: '1px solid var(--border)'
                }}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span style={{ color: 'var(--text-muted)' }}>MODEL:</span>
                  <span style={{ color: 'var(--accent)' }}>OPUS-4.5</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>STATUS:</span>
                  <span className="flex items-center gap-1">
                    <span className="status-dot" style={{ width: 4, height: 4 }} />
                    <span style={{ color: 'var(--green)' }}>ONLINE</span>
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <span style={{ color: 'var(--text-muted)' }}>UPTIME:</span>
                  <span style={{ color: 'var(--text-primary)' }}>99.97%</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Data Panels */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-1">
            
            {/* Win Rate Panel */}
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">WIN RATE</span>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>↗</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <div className="flex items-end justify-between mb-2 sm:mb-3">
                  <div className="hud-stat-value text-xl sm:text-2xl">78<span className="hud-stat-unit text-xs sm:text-sm">%</span></div>
                  <span className="text-[10px] sm:text-xs" style={{ color: 'var(--green)' }}>+2.3%</span>
                </div>
                <div className="hud-progress h-1 sm:h-1.5">
                  <div className="hud-progress-bar" style={{ width: '78%' }} />
                </div>
                <div className="hidden sm:flex justify-between mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Matches Panel */}
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">MATCHES</span>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>↗</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <div className="hud-stat-value text-xl sm:text-2xl">24,847</div>
                <div className="text-[10px] sm:text-xs mt-1 sm:mt-2" style={{ color: 'var(--text-muted)' }}>
                  +127 TODAY
                </div>
                {/* Mini graph */}
                <div className="mt-2 sm:mt-3 h-8 sm:h-12 flex items-end gap-0.5 sm:gap-1">
                  {[40, 65, 45, 80, 60, 75, 90, 70, 85, 95].map((h, i) => (
                    <div 
                      key={i}
                      className="flex-1"
                      style={{ 
                        height: `${h}%`,
                        background: i === 9 ? 'var(--accent)' : 'var(--border)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Environments Panel */}
            <div className="hud-panel col-span-2 sm:col-span-1" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">ENVIRONMENTS</span>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>↗</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <div className="flex items-baseline gap-2">
                  <span className="hud-stat-value text-xl sm:text-2xl">12</span>
                  <span style={{ color: 'var(--text-muted)' }}>/</span>
                  <span className="text-base sm:text-xl" style={{ color: 'var(--text-secondary)' }}>15</span>
                </div>
                <div className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  DOMINATED BY OPUS
                </div>
                <div className="hud-segments mt-2 sm:mt-3">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`hud-segment ${i < 12 ? 'active' : ''}`} style={{ height: '12px' }} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Rankings Table + Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
          
          {/* Rankings Table */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">LIVE RANKINGS</span>
                <span className="status-badge text-[9px] sm:text-[10px]">
                  <span className="status-dot" style={{ width: 4, height: 4 }} />
                  REAL-TIME
                </span>
              </div>
              <div className="overflow-x-auto mobile-scroll">
                <table className="hud-table text-[10px] sm:text-xs">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">#</th>
                      <th className="whitespace-nowrap">MODEL</th>
                      <th className="whitespace-nowrap">WIN%</th>
                      <th className="whitespace-nowrap hidden sm:table-cell">SCORE</th>
                      <th className="whitespace-nowrap hidden sm:table-cell">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((entry) => {
                      const model = getModel(entry.modelId);
                      if (!model) return null;
                      return (
                        <tr 
                          key={entry.modelId}
                          className="cursor-pointer"
                          onClick={() => setActiveModel(entry.modelId)}
                          style={{ 
                            background: activeModel === entry.modelId ? 'rgba(0, 212, 170, 0.1)' : 'transparent'
                          }}
                        >
                          <td style={{ color: entry.rank === 1 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                            {entry.rank}
                          </td>
                          <td>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div 
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: model.color }}
                              />
                              <span className="truncate max-w-[80px] sm:max-w-none">{model.name}</span>
                            </div>
                          </td>
                          <td>
                            <span style={{ color: entry.winRate > 70 ? 'var(--accent)' : 'var(--text-primary)' }}>
                              {entry.winRate}%
                            </span>
                            <span 
                              className="hidden sm:inline ml-2 text-[10px]"
                              style={{ color: entry.trend.startsWith('+') ? 'var(--green)' : 'var(--red)' }}
                            >
                              {entry.trend}
                            </span>
                          </td>
                          <td className="hidden sm:table-cell">{entry.avgScore.toLocaleString()}</td>
                          <td className="hidden sm:table-cell">
                            <span 
                              className="status-badge text-[9px]"
                              style={entry.status === 'CHAMPION' ? {
                                borderColor: 'var(--accent)',
                                color: 'var(--accent)'
                              } : {
                                borderColor: 'var(--border)',
                                color: 'var(--text-muted)',
                                background: 'transparent'
                              }}
                            >
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 sm:p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <Link href="/rankings">
                  <button className="hud-button w-full text-[10px] sm:text-xs py-2.5 sm:py-2">
                    VIEW FULL RANKINGS
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="hud-panel order-1 lg:order-2" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title text-[10px] sm:text-xs">LOGS</span>
              <span className="text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>↗</span>
            </div>
            <div className="hud-panel-content hud-log p-2 sm:p-3">
              {logs.map((log, i) => (
                <div key={i} className="hud-log-entry text-[9px] sm:text-[10px]">
                  <span className="hud-log-time">{log.time}</span>
                  <span className="hud-log-type">{log.type}</span>
                  <span className="hud-log-message truncate">{log.message}</span>
                </div>
              ))}
            </div>
            <div className="px-3 pb-3 sm:px-4 sm:pb-4">
              <Link href="/livesim">
                <button className="hud-button hud-button-primary w-full text-[10px] sm:text-xs py-2.5 sm:py-2">
                  WATCH LIVE
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LeaderboardPreview;
