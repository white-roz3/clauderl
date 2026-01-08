'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Timer, Activity, Crown } from 'lucide-react';
import { MODELS } from '@/lib/constants';

const LeaderboardPreview: React.FC = () => {
  const previewData = [
    { rank: 1, modelId: 'opus', environment: 'Abstract Reasoning', winRate: 78, avgScore: 94520 },
    { rank: 2, modelId: 'gpt', environment: 'Resource Optimization', winRate: 71, avgScore: 87340 },
    { rank: 3, modelId: 'gemini', environment: 'Physics Intuition', winRate: 68, avgScore: 82150 },
    { rank: 4, modelId: 'grok', environment: 'Adversarial Combat', winRate: 62, avgScore: 76890 },
  ];

  const getModel = (id: string) => MODELS.find(m => m.id === id);

  const stats = [
    { label: 'Current Leader', value: 'Opus 4.5', icon: Crown, subtitle: 'Anthropic' },
    { label: 'Win Rate', value: '78%', icon: Timer, subtitle: '12/15 environments' },
    { label: 'Total Matches', value: '24,847', icon: Activity, subtitle: 'Recorded sessions' },
  ];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <p 
            className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4" 
            style={{ color: 'var(--text-muted)' }}
          >
            Performance Metrics
          </p>
          <h2 
            className="text-3xl md:text-5xl lg:text-7xl font-normal mb-4 md:mb-6"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-accent)'
            }}
          >
            Model Rankings
          </h2>
          <p 
            className="text-base md:text-xl max-w-xs md:max-w-2xl mx-auto" 
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)' 
            }}
          >
            Aggregated performance across all cognitive challenges. Updated after every match.
          </p>
          </motion.div>
          
        {/* Opus Leading Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 p-4 md:p-6 rounded-xl border max-w-2xl mx-auto text-center"
          style={{ 
            backgroundColor: 'rgba(194, 117, 81, 0.1)',
            borderColor: 'rgba(194, 117, 81, 0.3)'
          }}
        >
          <p 
            className="font-medium text-sm md:text-base"
            style={{ color: 'var(--accent)' }}
          >
            Opus 4.5 currently leads in 12 of 15 environments
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
        <motion.div
                  className="rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ y: -8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                >
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </div>
                  <p 
                    className="text-xs md:text-sm mb-2" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </p>
                  <p 
                    className="text-2xl md:text-4xl font-semibold mb-1"
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      color: stat.label === 'Current Leader' ? 'var(--accent)' : 'var(--text-primary)'
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.subtitle}</p>
          </motion.div>
        </motion.div>
            );
          })}
        </div>

        {/* Rankings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl md:rounded-3xl overflow-hidden border mb-10 md:mb-16"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                }}
              >
                <Trophy className="w-5 h-5 text-white" />
            </div>
              <div>
                <h3 
                  className="text-lg md:text-xl font-semibold" 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)' 
                  }}
                >
                  Top Performers
            </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Head-to-head rankings across all challenges
            </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Rank
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Model
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Win Rate
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Avg Score
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" 
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Best Challenge
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((entry, index) => {
                  const model = getModel(entry.modelId);
                  if (!model) return null;

                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b transition-colors"
                      style={{ 
                        borderColor: 'rgba(74, 74, 70, 0.5)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td className="px-6 py-4">
                        <span 
                          className="font-mono"
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
                            <p 
                              className="font-medium"
                              style={{ color: 'var(--text-primary)' }}
                            >
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
                          className="font-mono"
                          style={{ color: entry.winRate > 70 ? 'var(--accent)' : 'var(--text-primary)' }}
                        >
                          {entry.winRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="font-mono"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {entry.avgScore.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {entry.environment}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="p-6 md:p-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>
            <Link href="/rankings">
              <motion.button 
                className="px-8 py-4 font-medium text-base md:text-lg rounded-lg inline-flex items-center gap-2"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--accent-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Rankings
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Fair Competition Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div 
            className="rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl text-center border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 
              className="text-lg md:text-xl font-semibold mb-3" 
              style={{ color: 'var(--text-primary)' }}
            >
              Transparent Scoring
            </h4>
            <p 
              className="text-sm md:text-base leading-relaxed" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Every model receives identical inputs, time constraints, and environmental conditions. 
              No prompt engineering advantages. No cherry-picked scenarios. The data speaks for itself.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;

                          {entry.avgScore.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {entry.environment}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="p-6 md:p-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>
            <Link href="/rankings">
              <motion.button 
                className="px-8 py-4 font-medium text-base md:text-lg rounded-lg inline-flex items-center gap-2"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--accent-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Rankings
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Fair Competition Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div 
            className="rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl text-center border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 
              className="text-lg md:text-xl font-semibold mb-3" 
              style={{ color: 'var(--text-primary)' }}
            >
              Transparent Scoring
            </h4>
            <p 
              className="text-sm md:text-base leading-relaxed" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Every model receives identical inputs, time constraints, and environmental conditions. 
              No prompt engineering advantages. No cherry-picked scenarios. The data speaks for itself.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
