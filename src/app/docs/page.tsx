'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, Cpu, Layers, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Link from 'next/link';

export default function DocsPage() {
  const docSections = [
    {
      icon: Layers,
      title: 'Getting Started',
      description: 'Learn the basics of ClaudeRL and how to navigate the platform.',
      status: 'Coming Soon'
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Complete API documentation for integrating with ClaudeRL.',
      status: 'Coming Soon'
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'How to connect different AI models and configure them.',
      status: 'Coming Soon'
    },
    {
      icon: BookOpen,
      title: 'Tutorials',
      description: 'Step-by-step guides for common tasks and workflows.',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <motion.div 
              variants={staggerItem}
              className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
              }}
            >
              Documentation
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              Everything you need to understand and work with ClaudeRL
            </motion.p>
          </motion.div>

          {/* Doc Sections Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
          >
            {docSections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 cursor-pointer group"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                    <section.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 
                        className="text-lg font-bold text-black"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {section.title}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                        {section.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div 
              className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
              </div>
              <h3 
                className="text-xl font-bold text-black mb-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Documentation In Progress
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                We&apos;re working on comprehensive documentation to help you get the most out of ClaudeRL.
                Check back soon for guides, API references, and tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/livesim">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl transition-all"
                    style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
                  >
                    Try Live Sim
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/faq">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl border-2 border-gray-200 hover:border-black transition-all"
                  >
                    View FAQ
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
