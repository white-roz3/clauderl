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
    <section className="py-16 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background elements - hidden on mobile */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 rounded-3xl bg-white border border-gray-200 hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ boxShadow: '20px 20px 60px rgba(0,0,0,0.06)' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p variants={staggerItem} className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
            System Architecture
          </motion.p>
          <motion.h2 
            variants={staggerItem}
            className="text-3xl md:text-5xl lg:text-7xl font-black text-black mb-4 md:mb-6"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
            }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-base md:text-xl text-gray-500 max-w-xs md:max-w-2xl mx-auto"
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
                className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 h-full border border-gray-100 relative"
                whileHover={{ 
                  y: -12,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                }}
                style={{ 
                  boxShadow: '0 15px 40px rgba(0,0,0,0.06)'
                }}
              >
                {/* Step number */}
                <motion.div 
                  className="absolute -top-4 -left-1 md:-top-6 md:-left-2 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black text-white font-bold text-base md:text-xl flex items-center justify-center"
                  style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <div 
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5 md:mb-8 mt-2 md:mt-4"
                  style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), 4px 4px 12px rgba(0,0,0,0.04)' }}
                >
                  <step.icon className="w-5 h-5 md:w-7 md:h-7 text-gray-600" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-gray-500 mb-4 md:mb-8 leading-relaxed text-sm md:text-lg">
                  {step.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {step.details.map((detail) => (
                    <span 
                      key={detail}
                      className="px-2.5 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200"
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
