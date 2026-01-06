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
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
            Performance Metrics
          </p>
          <h2 
            className="text-3xl md:text-5xl lg:text-7xl font-black text-black mb-4 md:mb-6"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.06)'
            }}
          >
            Leaderboard
          </h2>
          <p className="text-base md:text-xl text-gray-500 max-w-xs md:max-w-2xl mx-auto">
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
                  className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border border-gray-100"
                  whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                  style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                >
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black flex items-center justify-center mx-auto mb-4"
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm mb-2">{stat.label}</p>
                  <p 
                    className="text-2xl md:text-4xl font-black text-black mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs">{stat.subtitle}</p>
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
          className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 mb-10 md:mb-16"
          style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
        >
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-xl bg-black flex items-center justify-center"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              >
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Top Performances
                </h3>
                <p className="text-gray-400 text-sm">Best times across all courses</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Skills</th>
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
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank <= 3 ? (
                          <div 
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                              ${entry.rank === 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}
                            `}
                            style={entry.rank === 1 ? { boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } : {}}
                          >
                            {entry.rank}
                          </div>
                        ) : (
                          <span className="text-gray-400 font-medium w-8 text-center">{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {entry.model}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500">{entry.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {entry.bestTime}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.abilities.slice(0, 2).map((ability) => (
                          <span
                            key={ability}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                          >
                            {ability}
                          </span>
                        ))}
                        {entry.abilities.length > 2 && (
                          <span className="px-2 py-1 bg-black text-white text-xs font-medium rounded-lg">
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
          <div className="p-6 md:p-8 border-t border-gray-100 text-center">
            <Link href="/leaderboard">
              <motion.button 
                className="px-8 py-4 bg-black text-white font-bold text-base md:text-lg rounded-2xl inline-flex items-center gap-2"
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
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
            className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl text-center border border-gray-100"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
          >
            <div 
              className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4 border border-gray-100"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-bold text-black mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Fair Competition
            </h4>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
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
