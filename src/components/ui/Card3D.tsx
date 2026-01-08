'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // Tilt intensity (default 15)
  glare?: boolean; // Enable glare effect
  borderGlow?: string; // Border glow color on hover
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  style = {},
  intensity = 15,
  glare = true,
  borderGlow,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 50%)`,
              opacity: 0.6,
            }}
          />
        )}
        
        {/* Border glow on hover */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(45deg, ${borderGlow}, transparent, ${borderGlow})`,
              filter: 'blur(4px)',
            }}
          />
        )}

        {children}
      </motion.div>
    </motion.div>
  );
};

// Simple 3D hover card without mouse tracking
export const Card3DSimple: React.FC<{
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      whileHover={{
        rotateX: -5,
        rotateY: 5,
        scale: 1.02,
        z: 50,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};



import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // Tilt intensity (default 15)
  glare?: boolean; // Enable glare effect
  borderGlow?: string; // Border glow color on hover
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  style = {},
  intensity = 15,
  glare = true,
  borderGlow,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 50%)`,
              opacity: 0.6,
            }}
          />
        )}
        
        {/* Border glow on hover */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(45deg, ${borderGlow}, transparent, ${borderGlow})`,
              filter: 'blur(4px)',
            }}
          />
        )}

        {children}
      </motion.div>
    </motion.div>
  );
};

// Simple 3D hover card without mouse tracking
export const Card3DSimple: React.FC<{
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      whileHover={{
        rotateX: -5,
        rotateY: 5,
        scale: 1.02,
        z: 50,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

