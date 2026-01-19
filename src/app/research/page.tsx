'use client';

import { motion } from 'framer-motion';
import { FileText, Code, Database, ExternalLink, BookOpen, Microscope, Terminal } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Link from 'next/link';

export default function ResearchPage() {
  const sections = [
    {
      id: 'methodology',
      icon: Microscope,
      title: 'Methodology',
      description: 'How we measure intelligence fairly across different architectures',
      status: 'Published',
    },
    {
      id: 'environments',
      icon: BookOpen,
      title: 'Environment Design',
      description: 'Why these 15 challenges cover the spectrum of cognitive abilities',
      status: 'Published',
    },
    {
      id: 'scoring',
      icon: Database,
      title: 'Scoring System',
      description: 'Transparent metrics and how they\'re calculated',
      status: 'Published',
    },
    {
      id: 'api',
      icon: Terminal,
      title: 'API Access',
      description: 'Run your own benchmarks against our environments',
      status: 'Coming Soon',
    },
    {
      id: 'whitepaper',
      icon: FileText,
      title: 'Whitepaper',
      description: 'Technical deep-dive into ClaudeRL architecture',
      status: 'In Progress',
    },
    {
      id: 'code',
      icon: Code,
      title: 'Open Source',
      description: 'Environment code and evaluation scripts',
      status: 'Coming Soon',
    },
  ];

  const publications = [
    {
      title: 'Adversarial Benchmarking for Frontier Models',
      authors: 'ClaudeRL Research Team',
      date: 'January 2026',
      abstract: 'We present a novel approach to evaluating large language models in adversarial 3D environments, demonstrating significant performance differences across reasoning-heavy tasks.',
    },
    {
      title: 'Extended Thinking in Real-Time Decision Making',
      authors: 'ClaudeRL Research Team',
      date: 'Coming Soon',
      abstract: 'An analysis of how chain-of-thought reasoning impacts performance in time-constrained environments.',
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
              Documentation
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)'
              }}
            >
              Research
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              Technical documentation, publications, and API access
            </motion.p>
          </motion.div>

          {/* Documentation sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="rounded-xl p-6 h-full border cursor-pointer relative overflow-hidden"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ 
                    y: -4,
                    borderColor: 'rgba(194, 117, 81, 0.5)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <section.icon className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: section.status === 'Published' 
                          ? 'rgba(34, 197, 94, 0.2)' 
                          : section.status === 'In Progress'
                          ? 'rgba(194, 117, 81, 0.2)'
                          : 'var(--border)',
                        color: section.status === 'Published' 
                          ? '#22c55e' 
                          : section.status === 'In Progress'
                          ? 'var(--accent)'
                          : 'var(--text-muted)'
                      }}
                    >
                      {section.status}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {section.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {section.description}
                  </p>

                  {section.status === 'Published' && (
                    <div className="mt-4 flex items-center gap-1 text-sm" style={{ color: 'var(--accent)' }}>
                      <span>Read more</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              className="text-2xl font-semibold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Publications
            </h2>
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-6 border"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ 
                        backgroundColor: 'var(--accent)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {pub.title}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                        {pub.authors} • {pub.date}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {pub.abstract}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* API Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)'
              }}
            >
              <Terminal className="w-8 h-8" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 
              className="text-2xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              API Access Coming Soon
            </h3>
            <p 
              className="mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Run your own benchmarks against our standardized environments. Full reproducibility, transparent scoring.
            </p>
            <div 
              className="inline-block px-4 py-2 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)'
              }}
            >
              Join the waitlist →
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




import { motion } from 'framer-motion';
import { FileText, Code, Database, ExternalLink, BookOpen, Microscope, Terminal } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Link from 'next/link';

export default function ResearchPage() {
  const sections = [
    {
      id: 'methodology',
      icon: Microscope,
      title: 'Methodology',
      description: 'How we measure intelligence fairly across different architectures',
      status: 'Published',
    },
    {
      id: 'environments',
      icon: BookOpen,
      title: 'Environment Design',
      description: 'Why these 15 challenges cover the spectrum of cognitive abilities',
      status: 'Published',
    },
    {
      id: 'scoring',
      icon: Database,
      title: 'Scoring System',
      description: 'Transparent metrics and how they\'re calculated',
      status: 'Published',
    },
    {
      id: 'api',
      icon: Terminal,
      title: 'API Access',
      description: 'Run your own benchmarks against our environments',
      status: 'Coming Soon',
    },
    {
      id: 'whitepaper',
      icon: FileText,
      title: 'Whitepaper',
      description: 'Technical deep-dive into ClaudeRL architecture',
      status: 'In Progress',
    },
    {
      id: 'code',
      icon: Code,
      title: 'Open Source',
      description: 'Environment code and evaluation scripts',
      status: 'Coming Soon',
    },
  ];

  const publications = [
    {
      title: 'Adversarial Benchmarking for Frontier Models',
      authors: 'ClaudeRL Research Team',
      date: 'January 2026',
      abstract: 'We present a novel approach to evaluating large language models in adversarial 3D environments, demonstrating significant performance differences across reasoning-heavy tasks.',
    },
    {
      title: 'Extended Thinking in Real-Time Decision Making',
      authors: 'ClaudeRL Research Team',
      date: 'Coming Soon',
      abstract: 'An analysis of how chain-of-thought reasoning impacts performance in time-constrained environments.',
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
              Documentation
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)'
              }}
            >
              Research
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)' 
              }}
            >
              Technical documentation, publications, and API access
            </motion.p>
          </motion.div>

          {/* Documentation sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="rounded-xl p-6 h-full border cursor-pointer relative overflow-hidden"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ 
                    y: -4,
                    borderColor: 'rgba(194, 117, 81, 0.5)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <section.icon className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: section.status === 'Published' 
                          ? 'rgba(34, 197, 94, 0.2)' 
                          : section.status === 'In Progress'
                          ? 'rgba(194, 117, 81, 0.2)'
                          : 'var(--border)',
                        color: section.status === 'Published' 
                          ? '#22c55e' 
                          : section.status === 'In Progress'
                          ? 'var(--accent)'
                          : 'var(--text-muted)'
                      }}
                    >
                      {section.status}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {section.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {section.description}
                  </p>

                  {section.status === 'Published' && (
                    <div className="mt-4 flex items-center gap-1 text-sm" style={{ color: 'var(--accent)' }}>
                      <span>Read more</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              className="text-2xl font-semibold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Publications
            </h2>
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-6 border"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ 
                        backgroundColor: 'var(--accent)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {pub.title}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                        {pub.authors} • {pub.date}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {pub.abstract}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* API Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)'
              }}
            >
              <Terminal className="w-8 h-8" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 
              className="text-2xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              API Access Coming Soon
            </h3>
            <p 
              className="mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Run your own benchmarks against our standardized environments. Full reproducibility, transparent scoring.
            </p>
            <div 
              className="inline-block px-4 py-2 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)'
              }}
            >
              Join the waitlist →
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



