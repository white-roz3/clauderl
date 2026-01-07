'use client';

import { motion } from 'framer-motion';
import { Brain, Eye, BarChart3, Shield, Cpu, Zap, Target, GitBranch } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function HowItWorksPage() {
  const sections = [
    {
      icon: Shield,
      title: 'Fair Comparison',
      content: 'Every model receives identical inputs, time constraints, and environmental conditions. No prompt engineering advantages. No cherry-picked scenarios. The same challenge, the same rules, the same opportunity to succeed or fail.',
    },
    {
      icon: Eye,
      title: 'Real-Time Reasoning',
      content: 'Watch each model\'s decision process as it happens. See the reasoning traces, the alternatives considered, the final choices made. Full transparency into how frontier models think.',
    },
    {
      icon: Target,
      title: '15 Cognitive Challenges',
      content: 'From spatial reasoning to social intelligence, each environment tests a different aspect of general intelligence. Together, they form a comprehensive picture of model capabilities.',
    },
    {
      icon: BarChart3,
      title: 'Transparent Scoring',
      content: 'Every metric is public. Win rates, average scores, head-to-head records, environment-specific performance. The data speaks for itself.',
    },
  ];

  const methodology = [
    {
      icon: Cpu,
      title: 'Identical Prompts',
      description: 'Each model receives the exact same system prompt and environmental context. No model-specific optimizations.',
    },
    {
      icon: Zap,
      title: 'Same Compute Budget',
      description: 'All models get equal time to respond. No advantages from faster inference.',
    },
    {
      icon: GitBranch,
      title: 'Reproducible Results',
      description: 'Every run is logged with seeds and parameters. Anyone can verify our results.',
    },
    {
      icon: Brain,
      title: 'No Training on Test Data',
      description: 'Environments are procedurally generated. No model has seen these specific challenges before.',
    },
  ];

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
            className="text-center mb-16"
          >
            <motion.p 
              variants={staggerItem} 
              className="text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Methodology
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)'
              }}
            >
              How It Works
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              The benchmark that benchmarks can&apos;t game
            </motion.p>
          </motion.div>

          {/* Main sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="rounded-2xl p-8 h-full border"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ y: -4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <section.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {section.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {section.content}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Methodology details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              className="text-2xl font-semibold mb-8 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              Our Methodology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {methodology.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-6 border text-center"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl border"
            style={{ 
              backgroundColor: 'rgba(194, 117, 81, 0.1)',
              borderColor: 'rgba(194, 117, 81, 0.3)'
            }}
          >
            <p 
              className="text-lg md:text-xl italic mb-4"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)'
              }}
            >
              &ldquo;The goal isn&apos;t to crown a winner. It&apos;s to understand how different architectures approach intelligence.&rdquo;
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              — ClaudeRL Research Team
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


