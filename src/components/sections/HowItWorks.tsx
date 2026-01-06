'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, RotateCcw, BarChart3 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Brain,
      title: 'Neural Cores',
      description: 'Each shape houses a different AI model as its decision engine',
      details: ['ChatGPT', 'Claude', 'Grok', 'Gemini'],
    },
    {
      icon: RotateCcw,
      title: 'Learning Loop',
      description: 'Agents learn through trial and error, developing new capabilities',
      details: ['Reward signals', 'Adaptive behavior', 'Skill evolution'],
    },
    {
      icon: BarChart3,
      title: 'Performance',
      description: 'Fair comparison across time, attempts, and abilities unlocked',
      details: ['Standardized scoring', 'Live rankings'],
    }
  ];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--claude-bg)' }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p variants={staggerItem} className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4" style={{ color: 'var(--claude-text-muted)' }}>
            System Architecture
          </motion.p>
          <motion.h2 
            variants={staggerItem}
            className="text-3xl md:text-5xl lg:text-7xl font-normal mb-4 md:mb-6"
            style={{ 
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'var(--claude-text-greeting)'
            }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-base md:text-xl max-w-xs md:max-w-2xl mx-auto"
            style={{ color: 'var(--claude-text-secondary)' }}
          >
            Revolutionary AI evaluation through 3D reinforcement learning
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="group"
            >
              <motion.div 
                className="rounded-2xl md:rounded-[2rem] p-6 md:p-10 h-full border relative"
                style={{ 
                  backgroundColor: 'var(--claude-bg-secondary)',
                  borderColor: 'var(--claude-border)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ 
                  y: -12,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Step number */}
                <motion.div 
                  className="absolute -top-4 -left-1 md:-top-6 md:-left-2 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl font-bold text-base md:text-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--claude-accent)',
                    color: 'var(--claude-text)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <div 
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center mb-5 md:mb-8 mt-2 md:mt-4"
                  style={{ 
                    backgroundColor: 'var(--claude-bg)',
                    borderColor: 'var(--claude-border)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <step.icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} style={{ color: 'var(--claude-text-secondary)' }} />
                </div>

                <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4" style={{ color: 'var(--claude-text)' }}>
                  {step.title}
                </h3>
                <p className="mb-4 md:mb-8 leading-relaxed text-sm md:text-lg" style={{ color: 'var(--claude-text-secondary)' }}>
                  {step.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {step.details.map((detail) => (
                    <span 
                      key={detail}
                      className="px-2.5 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium border"
                      style={{
                        backgroundColor: 'var(--claude-bg)',
                        color: 'var(--claude-text-secondary)',
                        borderColor: 'var(--claude-border)'
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
