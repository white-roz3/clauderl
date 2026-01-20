'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { MODELS, TAGLINES, CTAS, Model } from '@/lib/constants';

// ASCII Art Logo - Claudearena
const AsciiLogo: React.FC = () => {
  const logoArt = `  ░██████  ░██                              ░██                                                                 
 ░██   ░██ ░██                              ░██                                                                 
░██        ░██  ░██████   ░██    ░██  ░████████  ░███████   ░██████   ░██░████  ░███████  ░████████   ░██████   
░██        ░██       ░██  ░██    ░██ ░██    ░██ ░██    ░██       ░██  ░███     ░██    ░██ ░██    ░██       ░██  
░██        ░██  ░███████  ░██    ░██ ░██    ░██ ░█████████  ░███████  ░██      ░█████████ ░██    ░██  ░███████  
 ░██   ░██ ░██ ░██   ░██  ░██   ░███ ░██   ░███ ░██        ░██   ░██  ░██      ░██        ░██    ░██ ░██   ░██  
  ░██████  ░██  ░█████░██  ░█████░██  ░█████░██  ░███████   ░█████░██ ░██       ░███████  ░██    ░██  ░█████░██`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-x-auto px-4 flex justify-center"
    >
      <pre
        className="select-none"
        style={{ 
          color: 'var(--accent)',
          fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace',
          fontSize: 'clamp(6px, 1.1vw, 14px)',
          lineHeight: '1.0',
          whiteSpace: 'pre',
          letterSpacing: '0',
          fontVariantLigatures: 'none',
        }}
      >
        {logoArt}
      </pre>
    </motion.div>
  );
};

// Mock win rates for display
const WIN_RATES: Record<string, number> = {
  'opus': 78,
  'gpt': 71,
  'gemini': 68,
  'grok': 62,
};

// HUD Model Card
const HudModelCard: React.FC<{ model: Model; index: number }> = ({ model, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const winRate = WIN_RATES[model.id] || 50;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + 0.1 * index, duration: 0.4 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="hud-panel p-4 transition-all duration-300"
        style={{ 
          border: `1px solid ${model.isLeading ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: model.isLeading ? '0 0 20px var(--accent-glow)' : 'none',
          background: isHovered ? 'rgba(194, 117, 81, 0.05)' : 'var(--bg-panel)'
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: model.isLeading ? 'var(--accent)' : 'var(--border)' }} />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: model.isLeading ? 'var(--accent)' : 'var(--border)' }} />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: model.isLeading ? 'var(--accent)' : 'var(--border)' }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: model.isLeading ? 'var(--accent)' : 'var(--border)' }} />
        
        {model.isLeading && (
          <div 
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 text-xs font-bold tracking-wider"
            style={{ 
              color: 'var(--bg-primary)',
              backgroundColor: 'var(--accent)',
            }}
          >
            CHAMPION
          </div>
        )}
        
        {/* Status dot */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="status-dot"
              style={{ 
                background: model.color,
                boxShadow: `0 0 10px ${model.color}40`
              }}
            />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {model.isLeading ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
        </div>
        
        {/* Model name */}
        <h3 
          className="font-bold text-sm mb-1"
          style={{ color: model.isLeading ? 'var(--accent)' : 'var(--text-primary)' }}
        >
          {model.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          {model.company}
        </p>
        
        {/* Win rate bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span style={{ color: 'var(--text-muted)' }}>WIN RATE</span>
            <span style={{ color: model.isLeading ? 'var(--accent)' : 'var(--text-secondary)' }}>
              {winRate}%
            </span>
          </div>
          <div className="h-1.5" style={{ background: 'var(--border)' }}>
            <motion.div 
              className="h-full"
              style={{ background: model.isLeading ? 'var(--accent)' : model.color }}
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(11, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative overflow-hidden font-mono flex items-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color-strong) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color-strong) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Top HUD Bar */}
      <div 
        className="absolute top-16 left-0 right-0 px-4 py-2 flex justify-between text-xs z-10"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--text-muted)' }}>SYS:</span>
          <span className="flex items-center gap-1">
            <span className="status-dot green" style={{ width: 4, height: 4 }} />
            <span style={{ color: 'var(--green)' }}>OPERATIONAL</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span style={{ color: 'var(--text-muted)' }}>
            UTC: <span style={{ color: 'var(--accent)' }}>{currentTime}</span>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            MATCHES: <span style={{ color: 'var(--text-primary)' }}>24,847</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          style={{ opacity, y }}
        >
          {/* ASCII Logo */}
          <div className="mb-8">
            <AsciiLogo />
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-lg md:text-xl mb-4"
          >
            <span style={{ color: 'var(--accent)' }}>{'>'}</span>
            <span style={{ color: 'var(--text-primary)' }}>{TAGLINES.primary}</span>
            <motion.span
              className="inline-block w-2 h-5"
              style={{ backgroundColor: 'var(--accent)' }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {TAGLINES.technical}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/challenges">
              <button className="hud-button hud-button-primary px-8 py-3 text-sm">
                {CTAS.primary.toUpperCase()}
              </button>
            </Link>
            <Link href="/rankings">
              <button className="hud-button px-8 py-3 text-sm">
                {CTAS.secondary.toUpperCase()}
              </button>
            </Link>
          </motion.div>

          {/* Model Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-xs mb-4 flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <span>-----</span>
              <span>COMPETING MODELS</span>
              <span>-----</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {MODELS.map((model, index) => (
                <HudModelCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom HUD Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 px-4 py-3 text-xs"
        style={{ 
          borderTop: '1px solid var(--border)',
          background: 'rgba(10, 10, 10, 0.9)'
        }}
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span style={{ color: 'var(--text-muted)' }}>
              VERSION: <span style={{ color: 'var(--text-primary)' }}>1.0.0</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              ENVS: <span style={{ color: 'var(--accent)' }}>15</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--accent)' }}>$CA:</span>
            <code style={{ color: 'var(--text-secondary)' }}>
              ZFV14P2wf72AP9HNz4i8FK8KfDETFuM8Tgc3hGapump
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
