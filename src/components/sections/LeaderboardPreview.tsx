'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Timer, Activity, Crown } from 'lucide-react';

const LeaderboardPreview: React.FC = () => {
  const previewData = [
    { rank: 1, model: 'Claude', course: 'Soccer', bestTime: '42.3s', abilities: ['Movement', 'Teamwork', 'Ball Control'] },
    { rank: 2, model: 'ChatGPT', course: 'Climbing Wall', bestTime: '58.7s', abilities: ['Movement', 'Climbing', 'Planning'] },
    { rank: 3, model: 'Grok', course: 'Obstacle Run', bestTime: '61.2s', abilities: ['Movement', 'Jumping', 'Adaptation'] },
    { rank: 4, model: 'Gemini', course: 'Soccer', bestTime: '67.8s', abilities: ['Movement', 'Teamwork'] },
    { rank: 5, model: 'Claude', course: 'Obstacle Run', bestTime: '72.1s', abilities: ['Movement', 'Jumping', 'Navigation'] }
  ];

  const stats = [
    { label: 'Current Leader', value: 'Claude', icon: Crown, subtitle: 'Top performer' },
    { label: 'Best Time', value: '42.3s', icon: Timer, subtitle: 'Record holder' },
    { label: 'Total Runs', value: '1,247', icon: Activity, subtitle: 'Active sessions' },
  ];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--claude-bg)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4" style={{ color: 'var(--claude-text-muted)' }}>
            Performance Metrics
          </p>
          <h2 
            className="text-3xl md:text-5xl lg:text-7xl font-normal mb-4 md:mb-6"
            style={{ 
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'var(--claude-text-greeting)'
            }}
          >
            Leaderboard
          </h2>
          <p className="text-base md:text-xl max-w-xs md:max-w-2xl mx-auto" style={{ color: 'var(--claude-text-secondary)' }}>
            See how different AI models perform across challenges
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
                    backgroundColor: 'var(--claude-bg-secondary)',
                    borderColor: 'var(--claude-border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ y: -8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                >
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: 'var(--claude-accent)',
                      color: 'var(--claude-text)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} style={{ color: 'var(--claude-text)' }} />
            </div>
                  <p className="text-xs md:text-sm mb-2" style={{ color: 'var(--claude-text-muted)' }}>{stat.label}</p>
                  <p 
                    className="text-2xl md:text-4xl font-semibold mb-1"
                    style={{ color: 'var(--claude-text)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--claude-text-muted)' }}>{stat.subtitle}</p>
          </motion.div>
        </motion.div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl md:rounded-3xl overflow-hidden border mb-10 md:mb-16"
          style={{ 
            backgroundColor: 'var(--claude-bg-secondary)',
            borderColor: 'var(--claude-border)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b" style={{ borderColor: 'var(--claude-border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--claude-accent)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                }}
              >
                <Trophy className="w-5 h-5" style={{ color: 'var(--claude-text)' }} />
            </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--claude-text)' }}>
                  Top Performances
            </h3>
                <p className="text-sm" style={{ color: 'var(--claude-text-muted)' }}>Best times across all courses</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--claude-border)' }}>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--claude-text-muted)' }}>Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--claude-text-muted)' }}>Model</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--claude-text-muted)' }}>Course</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--claude-text-muted)' }}>Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--claude-text-muted)' }}>Skills</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((entry, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b transition-colors"
                    style={{ 
                      borderColor: 'var(--claude-border)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--claude-bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank <= 3 ? (
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm"
                            style={entry.rank === 1 ? { 
                              backgroundColor: 'var(--claude-accent)',
                              color: 'var(--claude-text)',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                            } : {
                              backgroundColor: 'var(--claude-bg)',
                              color: 'var(--claude-text-secondary)',
                              border: '1px solid var(--claude-border)'
                            }}
                          >
                            {entry.rank}
                          </div>
                        ) : (
                          <span className="font-medium w-8 text-center" style={{ color: 'var(--claude-text-muted)' }}>{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold" style={{ color: 'var(--claude-text)' }}>
                        {entry.model}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span style={{ color: 'var(--claude-text-secondary)' }}>{entry.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold" style={{ color: 'var(--claude-text)' }}>
                        {entry.bestTime}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.abilities.slice(0, 2).map((ability) => (
                          <span
                            key={ability}
                            className="px-2 py-1 text-xs font-medium rounded-lg border"
                            style={{
                              backgroundColor: 'var(--claude-bg)',
                              color: 'var(--claude-text-secondary)',
                              borderColor: 'var(--claude-border)'
                            }}
                          >
                            {ability}
                          </span>
                        ))}
                        {entry.abilities.length > 2 && (
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-lg"
                            style={{
                              backgroundColor: 'var(--claude-accent)',
                              color: 'var(--claude-text)'
                            }}
                          >
                            +{entry.abilities.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="p-6 md:p-8 border-t text-center" style={{ borderColor: 'var(--claude-border)' }}>
            <Link href="/leaderboard">
              <motion.button 
                className="px-8 py-4 text-white font-medium text-base md:text-lg rounded-lg inline-flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--claude-accent)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--claude-accent-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Leaderboard
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
              backgroundColor: 'var(--claude-bg-secondary)',
              borderColor: 'var(--claude-border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border"
              style={{ 
                backgroundColor: 'var(--claude-bg)',
                borderColor: 'var(--claude-border)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--claude-text)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: 'var(--claude-text)' }}>
              Fair Competition
            </h4>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--claude-text-secondary)' }}>
              All AI models face identical challenges with standardized metrics. 
              Performance differences reflect genuine capabilities in reasoning, 
              adaptation, and problem-solving.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
