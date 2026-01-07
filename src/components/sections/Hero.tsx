'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { MODELS, TAGLINES, CTAS, Model } from '@/lib/constants';
import { FloatingOrb, FloatingShape, Grid3D, FloatingParticles } from '@/components/ui/FloatingElements';

// 3D Model Card Component
const ModelCard3D: React.FC<{ model: Model; index: number }> = ({ model, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 20);
    setRotateX(-y * 20);
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
      transition={{ delay: 0.3 + 0.1 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className="group"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-xl p-4 md:p-6 border relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: model.isLeading ? model.color : 'var(--border)',
          boxShadow: model.isLeading 
            ? `0 10px 40px ${model.color}30, 0 0 0 1px ${model.color}50`
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
          }}
        />
        
        {/* Floating inner glow */}
        <motion.div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: `radial-gradient(circle at center, ${model.color}20 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        {model.isLeading && (
          <motion.span 
            className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] md:text-xs font-medium"
            style={{ color: model.color, transform: 'translateZ(20px)' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ★ Leading
          </motion.span>
        )}
        
        {/* 3D floating indicator dot */}
        <motion.div 
          className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-3"
          style={{ 
            backgroundColor: model.color,
            boxShadow: `0 0 20px ${model.color}60`,
            transform: 'translateZ(15px)',
          }}
          animate={{ 
            boxShadow: [`0 0 15px ${model.color}40`, `0 0 25px ${model.color}70`, `0 0 15px ${model.color}40`]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <h3 
          className="font-medium text-sm md:text-base mb-1"
          style={{ 
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            transform: 'translateZ(10px)',
          }}
        >
          {model.name}
        </h3>
        <p 
          className="text-xs md:text-sm"
          style={{ color: 'var(--text-muted)', transform: 'translateZ(5px)' }}
        >
          {model.company}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Smooth spring animations for parallax
  const springConfig = { stiffness: 100, damping: 30 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const parallaxXSlow = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const parallaxYSlow = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-24 overflow-hidden" 
      style={{ backgroundColor: 'var(--bg-primary)', perspective: '1000px' }}
    >
      {/* Floating orbs for depth */}
      <FloatingOrb color="var(--claude-accent)" size={300} x="10%" y="20%" delay={0} blur={80} />
      <FloatingOrb color="#10A37F" size={200} x="80%" y="60%" delay={2} blur={60} />
      <FloatingOrb color="#4285F4" size={150} x="70%" y="10%" delay={4} blur={50} />
      
      {/* Floating geometric shapes */}
      <FloatingShape type="ring" color="var(--claude-accent)" size={60} x="5%" y="30%" delay={1} />
      <FloatingShape type="sphere" color="#10A37F" size={40} x="90%" y="40%" delay={2} />
      <FloatingShape type="ring" color="#4285F4" size={30} x="15%" y="70%" delay={0.5} />
      
      {/* Floating particles */}
      <FloatingParticles count={15} color="var(--claude-accent)" />
      
      {/* Animated 3D grid floor */}
      <Grid3D opacity={0.04} />

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center">
          {/* Title - 3D floating effect with parallax */}
          <motion.div
            style={{ x: parallaxXSlow, y: parallaxYSlow }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-normal mb-4 md:mb-6 tracking-tight"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 20px 60px rgba(194,117,81,0.15)',
                transformStyle: 'preserve-3d',
              }}
            >
              Claude<span style={{ color: 'var(--accent)' }}>RL</span>
            </motion.h1>
          </motion.div>

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

          {/* CTA Buttons with 3D effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16"
            style={{ perspective: 600 }}
          >
            <Link href="/livesim" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-medium text-base rounded-lg relative overflow-hidden group"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 4px 15px rgba(236, 236, 234, 0.2), 0 8px 30px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -5,
                  boxShadow: '0 10px 30px rgba(236, 236, 234, 0.3), 0 15px 50px rgba(0, 0, 0, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transform: 'translateX(-100%)',
                  }}
                  animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">{CTAS.primary}</span>
              </motion.button>
            </Link>

            <Link href="/rankings" className="w-full sm:w-auto">
              <motion.button 
                className="w-full sm:w-auto px-8 py-3.5 font-medium text-base rounded-lg border relative overflow-hidden"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -5,
                  backgroundColor: 'var(--bg-hover)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--border)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {CTAS.secondary}
              </motion.button>
            </Link>
          </motion.div>

          {/* Model Cards - Neural Cores with 3D effects */}
          <motion.div 
            className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 max-w-sm md:max-w-4xl mx-auto"
            style={{ x: parallaxX, y: parallaxY, transformStyle: 'preserve-3d' }}
          >
            {MODELS.map((model, index) => (
              <ModelCard3D key={model.id} model={model} index={index} />
            ))}
          </motion.div>

          {/* Stats Banner with 3D glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0 20px 60px rgba(194, 117, 81, 0.2), 0 0 0 1px rgba(194, 117, 81, 0.4)' 
            }}
            className="mt-12 md:mt-16 p-4 md:p-6 rounded-xl border max-w-2xl mx-auto relative overflow-hidden"
            style={{ 
              backgroundColor: 'rgba(194, 117, 81, 0.1)',
              borderColor: 'rgba(194, 117, 81, 0.3)',
              boxShadow: '0 10px 40px rgba(194, 117, 81, 0.1)',
            }}
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(194,117,81,0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0%', '-200% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <p 
              className="text-sm md:text-base font-medium relative z-10"
              style={{ color: 'var(--accent)' }}
            >
              Opus 4.5 currently leads in 12 of 15 environments
            </p>
            <p 
              className="text-xs md:text-sm mt-1 relative z-10"
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
