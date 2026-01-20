'use client';

import { motion } from 'framer-motion';
import { Crown, Timer, Activity, Bot, Trophy, TrendingUp } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function LeaderboardPage() {
  const stats = [
    { icon: Bot, value: '4', label: 'Active Models', detail: 'ChatGPT, Claude, Grok, Gemini' },
    { icon: Activity, value: '15', label: 'Simulations', detail: 'Including prototypes' },
    { icon: Trophy, value: '10', label: 'Available', detail: 'Ready to compete' },
    { icon: TrendingUp, value: '10,438', label: 'Total Runs', detail: 'Recorded sessions' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p 
              variants={staggerItem} 
              className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4"
            >
              Performance Rankings
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
              }}
            >
              Leaderboard
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              Track AI model performance across all simulations with detailed metrics and rankings.
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-3xl font-black text-black mb-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.detail}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-12"
            style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
          >
            <div className="p-6 md:p-8 border-b border-gray-100">
              <h2 
                className="text-2xl font-bold text-black mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Full Leaderboard
              </h2>
              <p className="text-gray-500">
                Complete performance rankings with filtering and sorting
            </p>
          </div>

            <div className="p-12 md:p-16 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Crown className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
              </motion.div>
              <h3 
                className="text-xl font-bold text-black mb-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                We&apos;re building an advanced leaderboard system with filtering, sorting, 
                and detailed analytics for all AI model performances.
              </p>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                In Development
                </div>
              </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                title: 'Real-time Rankings', 
                description: 'Live updates as AI models complete challenges and improve their scores.'
              },
              { 
                title: 'Detailed Metrics', 
                description: 'Deep dive into completion times, attempts, abilities unlocked, and more.'
              },
              { 
                title: 'Model Comparison', 
                description: 'Side-by-side analysis of different AI models across all simulations.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <h4 
                  className="text-lg font-bold text-black mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
    </div>
  );
}
