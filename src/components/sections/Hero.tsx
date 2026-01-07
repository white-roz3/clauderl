'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { MODELS, TAGLINES, CTAS } from '@/lib/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Subtle grid pattern - Claude.ai dark theme style */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30%] opacity-[0.03] hidden md:block pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, var(--border) 1px, transparent 1px),
            linear-gradient(var(--border) 1px, transparent 1px)
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
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-accent)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Claude<span style={{ color: 'var(--accent)' }}>RL</span>
          </motion.h1>

          {/* Tagline - Opus 4.5 dominance messaging */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-xs md:max-w-3xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)',
              lineHeight: 1.625
            }}
          >
            {TAGLINES.primary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16"
          >
            <Link href="/livesim" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-medium text-base rounded-lg"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                {CTAS.primary}
              </motion.button>
            </Link>

            <Link href="/rankings" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-medium text-base rounded-lg border"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                {CTAS.secondary}
              </motion.button>
            </Link>
          </motion.div>

          {/* Model Cards - Neural Cores */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 max-w-sm md:max-w-4xl mx-auto">
            {MODELS.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.1 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-xl p-4 md:p-6 border relative group"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: model.isLeading ? model.color : 'var(--border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
              >
                {model.isLeading && (
                  <span 
                    className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] md:text-xs font-medium"
                    style={{ color: model.color }}
                  >
                    ★ Leading
                  </span>
                )}
                <div 
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-3"
                  style={{ backgroundColor: model.color }}
                />
                <h3 
                  className="font-medium text-sm md:text-base mb-1"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {model.name}
                </h3>
                <p 
                  className="text-xs md:text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {model.company}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 md:mt-16 p-4 md:p-6 rounded-xl border max-w-2xl mx-auto"
            style={{ 
              backgroundColor: 'rgba(194, 117, 81, 0.1)',
              borderColor: 'rgba(194, 117, 81, 0.3)'
            }}
          >
            <p 
              className="text-sm md:text-base font-medium"
              style={{ color: 'var(--accent)' }}
            >
              Opus 4.5 currently leads in 12 of 15 environments
            </p>
            <p 
              className="text-xs md:text-sm mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              Updated after every match. No cherry-picking. No prompt engineering.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
