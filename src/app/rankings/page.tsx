'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Crown, Trophy, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { MODELS } from '@/lib/constants';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FloatingOrb, FloatingParticles, Grid3D } from '@/components/ui/FloatingElements';

// 3D Stat Card Component
interface StatItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: string;
  label: string;
  detail: string;
}

function StatCard3D({ stat, index }: { stat: StatItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 15);
    setRotateX(-y * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className="group"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-2xl p-6 text-center border relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ 
            backgroundColor: 'var(--accent)',
            boxShadow: '0 4px 15px rgba(194, 117, 81, 0.4)',
            transform: 'translateZ(20px)',
          }}
        >
          <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <div 
          className="text-2xl md:text-3xl font-semibold mb-1"
          style={{ 
            fontFamily: 'var(--font-mono)',
            color: stat.label === 'Current Leader' ? 'var(--accent)' : 'var(--text-primary)',
            transform: 'translateZ(15px)',
          }}
        >
          {stat.value}
        </div>
        <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)', transform: 'translateZ(10px)' }}>
          {stat.label}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-muted)', transform: 'translateZ(5px)' }}>
          {stat.detail}
        </div>
      </motion.div>
    </motion.div>
  );
}

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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 3D Background Elements */}
      <FloatingOrb color="var(--claude-accent)" size={250} x="5%" y="10%" delay={0} blur={80} />
      <FloatingOrb color="#10A37F" size={180} x="85%" y="50%" delay={2} blur={60} />
      <FloatingOrb color="#4285F4" size={120} x="75%" y="80%" delay={4} blur={50} />
      <FloatingParticles count={10} color="var(--claude-accent)" />
      <Grid3D opacity={0.03} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header with 3D text effect */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Performance Rankings
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)',
                textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 20px 60px rgba(194,117,81,0.15)',
              }}
            >
              Model Rankings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              Aggregated performance across all cognitive challenges. Updated after every match.
            </motion.p>
          </motion.div>

          {/* Opus Leading Banner with 3D glow */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(194, 117, 81, 0.25)' }}
            className="mb-8 p-6 rounded-xl border max-w-3xl mx-auto relative overflow-hidden"
            style={{ 
              backgroundColor: 'rgba(194, 117, 81, 0.1)',
              borderColor: 'rgba(194, 117, 81, 0.3)',
              boxShadow: '0 10px 40px rgba(194, 117, 81, 0.1)',
            }}
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(194,117,81,0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <p 
              className="font-medium text-center relative z-10"
              style={{ color: 'var(--accent)' }}
            >
              Opus 4.5 currently leads in 12 of 15 environments
            </p>
          </motion.div>

          {/* Stats Grid with 3D cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12" style={{ perspective: '1000px' }}>
            {stats.map((stat, index) => (
              <StatCard3D key={stat.label} stat={stat} index={index} />
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

          {/* CTA with 3D effect */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ perspective: '600px' }}
          >
            <Link href="/livesim">
              <motion.button 
                className="px-8 py-4 font-medium text-lg rounded-lg inline-flex items-center gap-2 relative overflow-hidden group"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(194, 117, 81, 0.4)',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -5,
                  boxShadow: '0 20px 50px rgba(194, 117, 81, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Watch Live Matches</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
