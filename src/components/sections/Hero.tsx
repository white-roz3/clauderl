'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--claude-cream)' }}>
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30%] opacity-[0.02] hidden md:block pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, #8A8680 1px, transparent 1px),
            linear-gradient(#8A8680 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(55deg)',
          transformOrigin: 'bottom'
        }}
      />

      {/* Floating shapes with Claude orange accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[5%] md:right-[12%] w-16 h-16 md:w-28 md:h-28 rounded-2xl border-2"
          style={{ borderColor: 'var(--claude-orange)', opacity: 0.2 }}
          animate={{ rotateY: [0, 360], rotateZ: [0, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="absolute bottom-[20%] left-[5%] md:left-[8%] w-12 h-12 md:w-20 md:h-20 rounded-full"
          style={{ 
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
            boxShadow: '10px 10px 30px rgba(217, 119, 6, 0.08)'
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute top-[30%] left-[15%] w-6 h-6 md:w-10 md:h-10 rounded-full hidden md:block"
          style={{ backgroundColor: 'var(--claude-orange)', opacity: 0.08 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center">
          {/* Title with serif font for Anthropic style */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold mb-4 md:mb-6 tracking-tight"
            style={{ 
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: 'var(--claude-charcoal)',
              letterSpacing: '-0.02em'
            }}
          >
            Claude<span style={{ color: 'var(--claude-orange)' }}>RL</span>
          </motion.h1>

          {/* Description with warm gray */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-xs md:max-w-2xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: 'var(--claude-warm-gray)'
            }}
          >
            Watch autonomous agents evolve from geometric shapes into intelligent beings
          </motion.p>

          {/* CTA Buttons with Claude orange */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16"
          >
            <Link href="/livesim" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold text-base rounded-xl"
                style={{ 
                  backgroundColor: 'var(--claude-orange)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 8px 24px rgba(217, 119, 6, 0.25)'
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(217, 119, 6, 0.35)' }}
                whileTap={{ scale: 0.98 }}
              >
                Launch Simulation
              </motion.button>
            </Link>

            <Link href="/leaderboard" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-semibold text-base rounded-xl border-2"
                style={{ 
                  backgroundColor: 'var(--claude-warm-white)',
                  color: 'var(--claude-charcoal)',
                  borderColor: '#E5E1DB',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.98 }}
              >
                Leaderboard
              </motion.button>
            </Link>
          </motion.div>

          {/* AI Model Cards with warm palette */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 max-w-sm md:max-w-3xl mx-auto">
            {[
              { name: 'Claude', highlight: true },
              { name: 'ChatGPT', highlight: false },
              { name: 'Grok', highlight: false },
              { name: 'Gemini', highlight: false }
            ].map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.1 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-4 md:p-6 border"
                style={{ 
                  backgroundColor: 'var(--claude-warm-white)',
                  borderColor: model.highlight ? 'var(--claude-orange)' : '#E5E1DB',
                  boxShadow: model.highlight 
                    ? '0 8px 24px rgba(217, 119, 6, 0.1)' 
                    : '0 8px 24px rgba(0,0,0,0.03)'
                }}
              >
                <div 
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-3"
                  style={{ 
                    backgroundColor: model.highlight ? 'var(--claude-orange)' : 'var(--claude-charcoal)',
                    boxShadow: model.highlight 
                      ? '0 2px 8px rgba(217, 119, 6, 0.4)' 
                      : '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                />
                <h3 
                  className="font-bold text-sm md:text-base"
                  style={{ 
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: 'var(--claude-charcoal)'
                  }}
                >
                  {model.name}
                </h3>
                <p 
                  className="text-xs md:text-sm"
                  style={{ color: 'var(--claude-warm-gray)' }}
                >
                  Neural Core
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
