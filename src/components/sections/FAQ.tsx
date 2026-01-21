'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '@/lib/constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">DOCUMENTATION</span>
            </div>
            <div className="px-4 py-3">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> FAQ
              </h2>
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="hud-panel"
              style={{ 
                border: `1px solid ${openIndex === index ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {/* Question Header */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left hud-panel-header transition-colors"
                style={{ 
                  background: openIndex === index ? 'rgba(0, 212, 170, 0.05)' : 'transparent' 
                }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-sm font-bold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {openIndex === index ? '[-]' : '[+]'}
                  </span>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.question}
                  </span>
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="hud-panel-content"
                      style={{ borderTop: '1px solid var(--border)' }}
                    >
                      <div className="flex gap-3">
                        <span style={{ color: 'var(--accent)' }}>{'>'}</span>
                        <p 
                          className="text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Help Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">ADDITIONAL RESOURCES</span>
            </div>
            <div className="hud-panel-content">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'HOW IT WORKS', path: '/how-it-works' },
                  { label: 'RESEARCH', path: '/research' },
                  { label: 'TWITTER', path: 'https://x.com/i/communities/2014039906209935379' },
                ].map((item) => (
                  <a 
                    key={item.label}
                    href={item.path}
                    className="hud-button text-center text-xs py-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
