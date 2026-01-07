'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { MODELS } from '@/lib/constants';
import Link from 'next/link';

export default function RankingsPage() {
  // Simulated rankings data
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

  const stats = [
    { icon: Crown, value: 'Opus 4.5', label: 'Current Leader', detail: '12/15 environments' },
    { icon: Trophy, value: '78%', label: 'Top Win Rate', detail: 'Opus 4.5' },
    { icon: Activity, value: '24,847', label: 'Total Matches', detail: 'All time' },
    { icon: TrendingUp, value: '15', label: 'Environments', detail: 'Active challenges' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p 
              className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Performance Rankings
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)'
              }}
            >
              Model Rankings
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              Aggregated performance across all cognitive challenges. Updated after every match.
            </p>
          </div>

          {/* Opus Leading Banner */}
          <div
            className="mb-8 p-6 rounded-xl border max-w-3xl mx-auto"
            style={{ 
              backgroundColor: 'rgba(194, 117, 81, 0.1)',
              borderColor: 'rgba(194, 117, 81, 0.3)'
            }}
          >
            <p 
              className="font-medium text-center"
              style={{ color: 'var(--accent)' }}
            >
              Opus 4.5 currently leads in 12 of 15 environments
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6 text-center border hover:-translate-y-1 transition-transform"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-2xl md:text-3xl font-semibold mb-1"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    color: stat.label === 'Current Leader' ? 'var(--accent)' : 'var(--text-primary)'
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Main Rankings Table */}
          <div
            className="rounded-2xl overflow-hidden border mb-12"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="p-6 md:p-8 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 
                className="text-2xl font-semibold mb-2"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-primary)'
                }}
              >
                Full Rankings
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Complete performance rankings with detailed metrics
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Model</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Win Rate</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Avg Score</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Best Challenge</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Matches</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((entry) => {
                    const model = getModel(entry.modelId);
                    if (!model) return null;

                    return (
                      <tr 
                        key={entry.modelId}
                        className="transition-colors hover:bg-[var(--bg-tertiary)]"
                        style={{ borderBottom: '1px solid rgba(74, 74, 70, 0.5)' }}
                      >
                        <td className="px-6 py-4">
                          <span 
                            className="font-mono font-semibold"
                            style={{ color: entry.rank === 1 ? 'var(--accent)' : 'var(--text-secondary)' }}
                          >
                            #{entry.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: model.color }}
                            />
                            <div>
                              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                {model.name}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {model.company}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className="font-mono font-semibold"
                            style={{ color: entry.winRate > 70 ? 'var(--accent)' : 'var(--text-primary)' }}
                          >
                            {entry.winRate}%
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono" style={{ color: 'var(--text-primary)' }}>
                          {entry.avgScore.toLocaleString()}
                        </td>
                        <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                          {entry.bestEnv}
                        </td>
                        <td className="px-6 py-4 font-mono" style={{ color: 'var(--text-muted)' }}>
                          {entry.matches.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Head-to-Head Section */}
          <div className="mb-12">
            <h2 
              className="text-2xl font-semibold mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)'
              }}
            >
              Head-to-Head Records
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {headToHead.map((record, index) => {
                const model1 = getModel(record.model1);
                const model2 = getModel(record.model2);
                if (!model1 || !model2) return null;
                const winPercent = Math.round((record.wins / (record.wins + record.losses)) * 100);

                return (
                  <div
                    key={index}
                    className="rounded-xl p-6 border hover:-translate-y-1 transition-transform"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: model1.color }}
                        />
                        <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                          {model1.name}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>vs</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                          {model2.name}
                        </span>
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: model2.color }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span 
                        className="font-mono font-semibold text-lg"
                        style={{ color: 'var(--accent)' }}
                      >
                        {record.wins}
                      </span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            backgroundColor: 'var(--accent)',
                            width: `${winPercent}%`
                          }}
                        />
                      </div>
                      <span 
                        className="font-mono text-lg"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {record.losses}
                      </span>
                    </div>

                    <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                      {model1.name} leads {winPercent}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/live">
              <button 
                className="px-8 py-4 font-medium text-lg rounded-lg inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
              >
                Watch Live Matches
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
