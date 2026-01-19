'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

// ASCII characters for random selection
const ASCII_CHARS = ['/', '\\', '|', '-', '+', '*', '.', ':', ';', '#', '@', '%', '&', '=', '~', '^'];
const BRACKET_PAIRS = ['[]', '{}', '()', '<>', '||', '==', '--', '++'];

interface FloatingAsciiProps {
  char: string;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  color?: string;
}

export const FloatingAscii: React.FC<FloatingAsciiProps> = ({
  char,
  x,
  y,
  delay = 0,
  duration = 8,
  color = 'var(--text-muted)',
}) => {
  return (
    <motion.span
      className="absolute pointer-events-none font-mono select-none"
      style={{
        left: x,
        top: y,
        color,
        fontSize: '1.5rem',
        opacity: 0.3,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.5, 0.2],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {char}
    </motion.span>
  );
};

// ASCII Box Drawing Border
interface AsciiBoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  color?: string;
}

export const AsciiBox: React.FC<AsciiBoxProps> = ({
  children,
  className = '',
  title = '',
  color = 'var(--border)',
}) => {
  return (
    <div className={`relative ${className}`} style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Top border */}
      <div className="flex items-center" style={{ color }}>
        <span>+</span>
        <span className="flex-1 overflow-hidden">
          {title ? (
            <>
              <span>--[ </span>
              <span style={{ color: 'var(--accent)' }}>{title}</span>
              <span> ]</span>
              <span className="inline-block" style={{ width: '100%', borderBottom: `1px dashed ${color}` }} />
            </>
          ) : (
            <span className="block border-b border-dashed" style={{ borderColor: color }} />
          )}
        </span>
        <span>+</span>
      </div>
      
      {/* Content with side borders */}
      <div className="flex">
        <span style={{ color }}>|</span>
        <div className="flex-1 px-3 py-2">{children}</div>
        <span style={{ color }}>|</span>
      </div>
      
      {/* Bottom border */}
      <div className="flex items-center" style={{ color }}>
        <span>+</span>
        <span className="flex-1 border-b border-dashed" style={{ borderColor: color }} />
        <span>+</span>
      </div>
    </div>
  );
};

// Matrix-style rain effect
export const AsciiRain: React.FC<{
  columns?: number;
  color?: string;
}> = ({ columns = 20, color = 'var(--accent)' }) => {
  const rainColumns = useMemo(() => {
    return Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: `${(i / columns) * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      chars: Array.from({ length: 15 }, () => 
        ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
      ).join('\n'),
    }));
  }, [columns]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {rainColumns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute font-mono text-xs whitespace-pre leading-tight"
          style={{
            left: column.x,
            top: 0,
            color,
          }}
          animate={{
            y: ['-100%', '100vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: column.duration,
            delay: column.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {column.chars}
        </motion.div>
      ))}
    </div>
  );
};

// ASCII Grid Pattern
export const AsciiGrid: React.FC<{
  opacity?: number;
  char?: string;
}> = ({ opacity = 0.1, char = '.' }) => {
  const gridSize = 30;
  const dots = useMemo(() => {
    return Array.from({ length: gridSize * 15 }, (_, i) => ({
      id: i,
      x: (i % gridSize) * (100 / gridSize),
      y: Math.floor(i / gridSize) * 40,
    }));
  }, []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none font-mono"
      style={{ opacity }}
    >
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}px`,
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// Floating Brackets
export const FloatingBrackets: React.FC<{
  count?: number;
}> = ({ count = 15 }) => {
  const brackets = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${Math.random() * 90 + 5}%`,
      y: `${Math.random() * 90 + 5}%`,
      bracket: BRACKET_PAIRS[Math.floor(Math.random() * BRACKET_PAIRS.length)],
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {brackets.map((b) => (
        <motion.span
          key={b.id}
          className="absolute font-mono text-sm select-none"
          style={{
            left: b.x,
            top: b.y,
            color: 'var(--text-muted)',
            opacity: 0.3,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {b.bracket}
        </motion.span>
      ))}
    </div>
  );
};

// Scanline effect
export const Scanlines: React.FC<{
  opacity?: number;
}> = ({ opacity = 0.03 }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, ${opacity}) 2px,
          rgba(0, 0, 0, ${opacity}) 4px
        )`,
      }}
    />
  );
};

// Animated cursor
export const BlinkingCursor: React.FC<{
  color?: string;
}> = ({ color = 'var(--accent)' }) => {
  return (
    <motion.span
      className="inline-block w-2 h-5 ml-1"
      style={{ backgroundColor: color }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  );
};

// Terminal line decorator
export const TerminalLine: React.FC<{
  prefix?: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ prefix = '>', children, delay = 0 }) => {
  return (
    <motion.div
      className="flex items-center gap-2 font-mono"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span style={{ color: 'var(--accent)' }}>{prefix}</span>
      <span>{children}</span>
    </motion.div>
  );
};

// ASCII progress bar
export const AsciiProgressBar: React.FC<{
  progress: number;
  width?: number;
  label?: string;
}> = ({ progress, width = 20, label }) => {
  const filled = Math.round((progress / 100) * width);
  const empty = width - filled;
  
  return (
    <div className="font-mono text-sm">
      {label && <span style={{ color: 'var(--text-secondary)' }}>{label} </span>}
      <span style={{ color: 'var(--border)' }}>[</span>
      <span style={{ color: 'var(--accent)' }}>{'='.repeat(filled)}</span>
      <span style={{ color: 'var(--text-muted)' }}>{'-'.repeat(empty)}</span>
      <span style={{ color: 'var(--border)' }}>]</span>
      <span style={{ color: 'var(--text-secondary)' }}> {progress}%</span>
    </div>
  );
};

// Legacy exports for compatibility
export const FloatingOrb = FloatingAscii;
export const FloatingShape = FloatingAscii;
export const Grid3D = AsciiGrid;
export const FloatingParticles = FloatingBrackets;
export const ParallaxLayer: React.FC<{
  children: React.ReactNode;
  depth: number;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
