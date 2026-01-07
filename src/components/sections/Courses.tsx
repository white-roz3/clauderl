'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ENVIRONMENTS } from '@/lib/constants';

const Courses: React.FC = () => {
  // Featured challenges (first 4)
  const featuredChallenges = ENVIRONMENTS.slice(0, 4);

  const getThumbnailPath = (envId: string): string | null => {
    const thumbnailMap: Record<string, string | null> = {
      'spatial-reasoning': '/thumbs/dungeon.png',
      'resource-optimization': '/thumbs/soccer.png',
      'threat-assessment': '/thumbs/wallclimb.png',
      'strategic-placement': '/thumbs/3dball.png',
    };
    return thumbnailMap[envId] || '/thumbs/dungeon.png';
  };

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

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p variants={staggerItem} className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4" style={{ color: 'var(--text-muted)' }}>
            Cognitive Challenges
          </motion.p>
          <motion.h2 
            variants={staggerItem}
            className="text-3xl md:text-5xl lg:text-7xl font-normal mb-4 md:mb-6"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-accent)'
            }}
          >
            Challenges
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-base md:text-xl max-w-xs md:max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)' 
            }}
          >
            15 adversarial environments testing different aspects of intelligence
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {featuredChallenges.map((env) => (
            <motion.div
              key={env.id}
              variants={staggerItem}
              className="group"
            >
              <Link href={`/livesim?challenge=${env.slug}`}>
                <motion.div 
                  className="rounded-2xl md:rounded-3xl overflow-hidden border h-full"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ 
                    y: -12,
                    borderColor: 'rgba(194, 117, 81, 0.5)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image */}
                  <div className="relative h-28 md:h-48 overflow-hidden">
                    <div className="absolute inset-1 md:inset-2 rounded-xl md:rounded-2xl overflow-hidden">
                      <Image 
                        src={getThumbnailPath(env.id)!}
                        alt={`${env.name} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Difficulty badge */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                      <span 
                        className="px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold"
                        style={getDifficultyStyle(env.difficulty)}
                      >
                        {env.difficulty}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-10">
                      <span className="text-lg md:text-2xl">{env.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-7">
                    <h3 
                      className="text-sm md:text-xl font-semibold mb-1 md:mb-3" 
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-primary)' 
                      }}
                    >
                      {env.name}
                    </h3>
                    <p 
                      className="leading-relaxed text-xs md:text-sm mb-2 md:mb-4 line-clamp-2" 
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-secondary)' 
                      }}
                    >
                      {env.description}
                    </p>

                    {/* Cognitive skills tags */}
                    <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                      {env.cognitiveSkills.slice(0, 2).map((skill) => (
                        <span 
                          key={skill}
                          className="text-[9px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded"
                          style={{
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Opus advantage - shows on hover */}
                    <p 
                      className="text-[10px] md:text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--accent)' }}
                    >
                      {env.opusAdvantage}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-8 md:mt-16"
        >
          <Link href="/challenges">
            <motion.button 
              className="px-8 md:px-12 py-3.5 md:py-5 font-medium text-base md:text-lg rounded-lg"
              style={{ 
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              View All 15 Challenges
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
