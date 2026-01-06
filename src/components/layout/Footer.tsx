'use client';

import { LEGAL_LINKS } from '@/lib/constants';
import { Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'var(--claude-cream)', borderTop: '1px solid #E5E1DB' }}>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand - full width on mobile */}
          <div className="col-span-2">
            <Link href="/">
              <motion.div
                className="text-xl md:text-2xl font-bold inline-block"
                style={{ 
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: 'var(--claude-charcoal)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                Claude<span style={{ color: 'var(--claude-orange)' }}>RL</span>
              </motion.div>
            </Link>
            <p 
              className="mt-3 md:mt-4 max-w-md leading-relaxed text-sm md:text-base"
              style={{ 
                color: 'var(--claude-warm-gray)',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              A 3D reinforcement learning sandbox where AI models learn to navigate challenges and evolve.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mt-5 md:mt-6">
              <Link
                href="https://x.com/i/communities/1971956497015009337"
                aria-label="Twitter"
              >
                <motion.div 
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--claude-warm-white)',
                    border: '1px solid #E5E1DB',
                    color: 'var(--claude-warm-gray)'
                  }}
                  whileHover={{ 
                    y: -3, 
                    color: 'var(--claude-orange)',
                    boxShadow: '0 8px 20px rgba(217, 119, 6, 0.1)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-semibold mb-3 md:mb-4 text-sm md:text-base"
              style={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: 'var(--claude-charcoal)'
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { href: '/livesim', label: 'Live Sim' },
                { href: '/sims', label: 'Simulations' },
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/faq', label: 'FAQ' },
                { href: '/docs', label: 'Docs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors text-xs md:text-sm hover:underline"
                    style={{ 
                      color: 'var(--claude-warm-gray)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 
              className="font-semibold mb-3 md:mb-4 text-sm md:text-base"
              style={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: 'var(--claude-charcoal)'
              }}
            >
              Legal
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors text-xs md:text-sm hover:underline"
                    style={{ 
                      color: 'var(--claude-warm-gray)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8" style={{ borderTop: '1px solid #E5E1DB' }}>
          <p 
            className="text-xs md:text-sm text-center md:text-left"
            style={{ 
              color: 'var(--claude-warm-gray)',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            © 2025 ClaudeRL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
