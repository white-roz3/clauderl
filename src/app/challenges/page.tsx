'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ENVIRONMENTS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useRef } from 'react';
import { FloatingOrb, FloatingParticles, Grid3D } from '@/components/ui/FloatingElements';

// Map environment slugs to thumbnail paths
const getThumbnailForEnv = (slug: string): string | null => {
  const thumbnailMap: Record<string, string> = {
    'spatial-reasoning': '/thumbs/pyramids.png',
    'resource-optimization': '/thumbs/foodcollector.png',
    'threat-assessment': '/thumbs/dungeon.png',
    'strategic-placement': '/thumbs/Gridworld.png',
    'adversarial-tactics': '/thumbs/soccer.png',
    'physics-intuition': '/thumbs/3dball.png',
    'social-intelligence': '/thumbs/pushblock.png',
    'abstract-reasoning': '/thumbs/Patterns.png',
    'emergent-coordination': '/thumbs/soccer.png',
    'long-horizon-planning': '/thumbs/pyramids.png',
    'curiosity-driven-discovery': '/thumbs/dungeon.png',
    'adversarial-combat': '/thumbs/soccer.png',
    'logical-deduction': '/thumbs/Patterns.png',
    'market-dynamics': '/thumbs/foodcollector.png',
    'adaptive-learning': '/thumbs/basic.png',
  };
  return thumbnailMap[slug] || null;
};

// 3D Challenge Card Component
interface ChallengeCard3DProps {
  env: typeof ENVIRONMENTS[0];
  index: number;
  getDifficultyStyle: (difficulty: string) => { backgroundColor: string; color: string };
}

function ChallengeCard3D({ env, index, getDifficultyStyle }: ChallengeCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const thumbnail = getThumbnailForEnv(env.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/livesim?challenge=${env.slug}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-xl border h-full group cursor-pointer overflow-hidden"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            perspective: 800,
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Thumbnail */}
            {thumbnail && (
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={thumbnail}
                  alt={env.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, var(--bg-secondary) 100%)',
                  }}
                />
                {/* Difficulty badge */}
                <span 
                  className="absolute top-3 right-3 text-xs px-2 py-1 rounded"
                  style={getDifficultyStyle(env.difficulty)}
                >
                  {env.difficulty}
                </span>
                {/* Icon */}
                <span 
                  className="absolute bottom-3 left-4 text-3xl"
                  style={{ 
                    transform: 'translateZ(30px)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                  }}
                >
                  {env.icon}
                </span>
              </div>
            )}
            
            {/* Content */}
            <div className="p-5" style={{ transform: 'translateZ(10px)' }}>
              {!thumbnail && (
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{env.icon}</span>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={getDifficultyStyle(env.difficulty)}
                  >
                    {env.difficulty}
                  </span>
                </div>
              )}
              
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {env.name}
              </h3>
              <p 
                className="text-sm mb-4 line-clamp-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {env.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {env.cognitiveSkills.slice(0, 3).map(skill => (
                  <span 
                    key={skill} 
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <p 
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--accent)' }}
              >
                {env.opusAdvantage}
              </p>
            </div>

            {/* Glare effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ChallengesPage() {
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert':
        return { 
          backgroundColor: 'rgba(194, 117, 81, 0.2)',
          color: 'var(--accent)'
        };
      case 'Advanced':
        return { 
          backgroundColor: 'rgba(163, 163, 158, 0.2)',
          color: 'var(--text-secondary)'
        };
      default:
        return { 
          backgroundColor: 'var(--border)',
          color: 'var(--text-muted)'
        };
    }
  };

  const groupedEnvs = {
    Standard: ENVIRONMENTS.filter(e => e.difficulty === 'Standard'),
    Advanced: ENVIRONMENTS.filter(e => e.difficulty === 'Advanced'),
    Expert: ENVIRONMENTS.filter(e => e.difficulty === 'Expert'),
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 3D Background Elements */}
      <FloatingOrb color="var(--claude-accent)" size={300} x="5%" y="15%" delay={0} blur={80} />
      <FloatingOrb color="#10A37F" size={200} x="90%" y="40%" delay={2} blur={60} />
      <FloatingOrb color="#4285F4" size={150} x="80%" y="70%" delay={4} blur={50} />
      <FloatingParticles count={12} color="var(--claude-accent)" />
      <Grid3D opacity={0.03} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header with 3D text */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.p 
              variants={staggerItem} 
              className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Cognitive Challenges
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)',
                textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 20px 60px rgba(194,117,81,0.15)',
              }}
            >
              15 Environments
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              Each challenge tests a different aspect of general intelligence. From spatial reasoning to social dynamics.
            </motion.p>
          </motion.div>

          {/* Grouped environments with 3D cards */}
          {Object.entries(groupedEnvs).map(([difficulty, envs]) => (
            <motion.div
              key={difficulty}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 
                  className="text-2xl font-semibold"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {difficulty}
                </h2>
                <motion.span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={getDifficultyStyle(difficulty)}
                  whileHover={{ scale: 1.05 }}
                >
                  {envs.length} challenges
                </motion.span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1000px' }}>
                {envs.map((env, index) => (
                  <ChallengeCard3D 
                    key={env.id} 
                    env={env} 
                    index={index} 
                    getDifficultyStyle={getDifficultyStyle}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

