'use client';

import Accordion from '@/components/ui/Accordion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { FAQ_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { HelpCircle, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
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
              <HelpCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
              }}
            >
              FAQ
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              Everything you need to know about ClaudeArena and how it works
            </motion.p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={staggerItem}>
              <Accordion
                items={FAQ_ITEMS}
                className="space-y-4"
              />
            </motion.div>
          </motion.div>

          {/* Additional help section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div 
              className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 text-center"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
            >
              <h3 
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Still have questions?
              </h3>

              <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
                Learn how the benchmark platform works and join our community for discussions and support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/how-it-works">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl transition-all"
                    style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
                  >
                    <BookOpen className="w-5 h-5" />
                    How It Works
                  </motion.button>
                </Link>
                <a href="https://x.com/i/communities/2014039906209935379" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl border-2 border-gray-200 hover:border-black transition-all"
                  >
                    <Users className="w-5 h-5" />
                    Join Community
                  </motion.button>
                </a>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-mono">
                  GXKC9BCWCiYVeEpQ8cFoFHpgAeXTzX3YCFX4BnaZpump
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
