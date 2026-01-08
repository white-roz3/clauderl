'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface FloatingOrbProps {
  color: string;
  size: number;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  blur?: number;
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  color,
  size,
  x,
  y,
  delay = 0,
  duration = 8,
  blur = 60,
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity: 0.4,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Floating geometric shapes
interface FloatingShapeProps {
  type: 'cube' | 'pyramid' | 'ring' | 'sphere';
  color: string;
  size: number;
  x: string;
  y: string;
  delay?: number;
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
  type,
  color,
  size,
  x,
  y,
  delay = 0,
}) => {
  const renderShape = () => {
    switch (type) {
      case 'cube':
        return (
          <div
            className="relative"
            style={{
              width: size,
              height: size,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 border"
              style={{
                borderColor: color,
                backgroundColor: `${color}10`,
                transform: `translateZ(${size / 2}px)`,
              }}
            />
            {/* Back */}
            <div
              className="absolute inset-0 border"
              style={{
                borderColor: color,
                backgroundColor: `${color}10`,
                transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
              }}
            />
            {/* Right */}
            <div
              className="absolute inset-0 border"
              style={{
                borderColor: color,
                backgroundColor: `${color}10`,
                transform: `translateX(${size / 2}px) rotateY(90deg)`,
              }}
            />
            {/* Left */}
            <div
              className="absolute inset-0 border"
              style={{
                borderColor: color,
                backgroundColor: `${color}10`,
                transform: `translateX(-${size / 2}px) rotateY(-90deg)`,
              }}
            />
          </div>
        );
      case 'ring':
        return (
          <div
            className="rounded-full border-2"
            style={{
              width: size,
              height: size,
              borderColor: color,
              boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
            }}
          />
        );
      case 'sphere':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle at 30% 30%, ${color}60, ${color}20 50%, transparent 70%)`,
              boxShadow: `0 0 40px ${color}30`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        perspective: 500,
      }}
      animate={{
        y: [0, -20, 0],
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
        rotateX: { duration: 20, repeat: Infinity, ease: 'linear', delay },
        rotateY: { duration: 15, repeat: Infinity, ease: 'linear', delay },
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

// Animated grid floor with 3D perspective
export const Grid3D: React.FC<{
  opacity?: number;
  color?: string;
}> = ({ opacity = 0.05, color = 'var(--claude-border)' }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none overflow-hidden"
      style={{
        perspective: '500px',
        perspectiveOrigin: '50% 100%',
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          background: `
            linear-gradient(90deg, ${color} 1px, transparent 1px),
            linear-gradient(${color} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom',
          opacity,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 60px'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

// Floating particles
export const FloatingParticles: React.FC<{
  count?: number;
  color?: string;
}> = ({ count = 20, color = 'var(--claude-accent)' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Depth layers for parallax
export const ParallaxLayer: React.FC<{
  children: React.ReactNode;
  depth: number; // 0-1, where 1 is furthest
  className?: string;
}> = ({ children, depth, className = '' }) => {
  return (
    <motion.div
      className={`${className}`}
      style={{
        transform: `translateZ(${-depth * 100}px) scale(${1 + depth * 0.1})`,
      }}
    >
      {children}
    </motion.div>
  );
};



