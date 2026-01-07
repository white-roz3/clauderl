'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ENVIRONMENTS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
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
                color: 'var(--text-accent)'
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

          {/* Grouped environments */}
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
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={getDifficultyStyle(difficulty)}
                >
                  {envs.length} challenges
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {envs.map((env, index) => (
                  <motion.div
                    key={env.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/livesim?challenge=${env.slug}`}>
                      <motion.div
                        className="rounded-xl p-6 border h-full group cursor-pointer"
                        style={{ 
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--border)',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                        }}
                        whileHover={{ 
                          y: -8,
                          borderColor: 'rgba(194, 117, 81, 0.5)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{env.icon}</span>
                          <span 
                            className="text-xs px-2 py-1 rounded"
                            style={getDifficultyStyle(env.difficulty)}
                          >
                            {env.difficulty}
                          </span>
                        </div>
                        
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
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

