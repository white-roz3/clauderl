'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--claude-bg)' }}>
      {/* Subtle grid pattern - Claude.ai dark theme style */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30%] opacity-[0.03] hidden md:block pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, #4A4A46 1px, transparent 1px),
            linear-gradient(#4A4A46 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(55deg)',
          transformOrigin: 'bottom'
        }}
      />

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center">
          {/* Title - Claude.ai serif style */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-normal mb-4 md:mb-6 tracking-tight"
            style={{ 
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'var(--claude-text-greeting)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25
            }}
          >
            Claude<span style={{ color: 'var(--claude-accent)' }}>RL</span>
          </motion.h1>

          {/* Description - Claude.ai secondary text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-xs md:max-w-2xl mx-auto"
            style={{ 
              color: 'var(--claude-text-secondary)',
              lineHeight: 1.625
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
                className="w-full sm:w-auto px-8 py-3.5 text-white font-medium text-base rounded-lg"
                style={{ 
                  backgroundColor: 'var(--claude-accent)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--claude-accent-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                Launch Simulation
              </motion.button>
            </Link>

            <Link href="/leaderboard" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-medium text-base rounded-lg border"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--claude-text)',
                  borderColor: 'var(--claude-border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--claude-bg-hover)' }}
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
                className="rounded-lg p-4 md:p-6 border"
                style={{ 
                  backgroundColor: 'var(--claude-bg-secondary)',
                  borderColor: model.highlight ? 'var(--claude-accent)' : 'var(--claude-border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div 
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-3"
                  style={{ 
                    backgroundColor: model.highlight ? 'var(--claude-accent)' : 'var(--claude-text-secondary)'
                  }}
                />
                <h3 
                  className="font-semibold text-sm md:text-base"
                  style={{ 
                    color: 'var(--claude-text)'
                  }}
                >
                  {model.name}
                </h3>
                <p 
                  className="text-xs md:text-sm"
                  style={{ color: 'var(--claude-text-muted)' }}
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
