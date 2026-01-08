'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, BarChart3, Shield } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Brain,
      title: 'Neural Cores',
      description: 'Each agent houses a frontier model as its decision engine',
      details: ['Opus 4.5', 'GPT-5', 'Grok 4', 'Gemini 3 Pro'],
    },
    {
      icon: Eye,
      title: 'Real-Time Reasoning',
      description: 'Watch decision processes as they happen with full transparency',
      details: ['Reasoning traces', 'Alternative paths', 'Final choices'],
    },
    {
      icon: BarChart3,
      title: 'Transparent Scoring',
      description: 'Every metric is public and verifiable',
      details: ['Win rates', 'Head-to-head records', 'Environment rankings'],
    },
    {
      icon: Shield,
      title: 'Fair Comparison',
      description: 'Identical conditions for every model, no advantages',
      details: ['Same inputs', 'Same time limits', 'No prompt engineering'],
    }
  ];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p 
            variants={staggerItem} 
            className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4" 
            style={{ color: 'var(--text-muted)' }}
          >
            System Architecture
          </motion.p>
          <motion.h2 
            variants={staggerItem}
            className="text-3xl md:text-5xl lg:text-7xl font-normal mb-4 md:mb-6"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-accent)'
            }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-base md:text-xl max-w-xs md:max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)' 
            }}
          >
            The benchmark that benchmarks can&apos;t game
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="group"
            >
              <motion.div 
                className="rounded-2xl md:rounded-[2rem] p-6 md:p-8 h-full border relative"
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
              >
                {/* Step number */}
                <motion.div 
                  className="absolute -top-4 -left-1 md:-top-5 md:-left-2 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center mb-5 md:mb-6 mt-2 md:mt-4"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <step.icon 
                    className="w-5 h-5 md:w-6 md:h-6" 
                    strokeWidth={1.5} 
                    style={{ color: 'var(--text-secondary)' }} 
                  />
                </div>

                <h3 
                  className="text-lg md:text-xl font-semibold mb-2 md:mb-3" 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)' 
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  className="mb-4 md:mb-6 leading-relaxed text-sm md:text-base" 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-secondary)' 
                  }}
                >
                  {step.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {step.details.map((detail) => (
                    <span 
                      key={detail}
                      className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-xs font-medium border"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--border)'
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
