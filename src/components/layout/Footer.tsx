'use client';

import { LEGAL_LINKS } from '@/lib/constants';
import { Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--claude-bg)', borderColor: 'var(--claude-border)' }}>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand - full width on mobile */}
          <div className="col-span-2">
            <Link href="/">
              <motion.div
                className="text-xl md:text-2xl font-normal inline-block"
                style={{ 
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  color: 'var(--claude-text-greeting)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                Claude<span style={{ color: 'var(--claude-accent)' }}>RL</span>
              </motion.div>
            </Link>
            <p 
              className="mt-3 md:mt-4 max-w-md text-sm md:text-base"
              style={{ 
                color: 'var(--claude-text-secondary)',
                lineHeight: 1.625
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
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center border"
                  style={{
                    backgroundColor: 'var(--claude-bg-secondary)',
                    borderColor: 'var(--claude-border)',
                    color: 'var(--claude-text-secondary)'
                  }}
                  whileHover={{ 
                    color: 'var(--claude-accent)',
                    backgroundColor: 'var(--claude-bg-hover)'
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
                color: 'var(--claude-text)'
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
                      color: 'var(--claude-text-secondary)'
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
                color: 'var(--claude-text)'
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
                      color: 'var(--claude-text-secondary)'
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
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t" style={{ borderColor: 'var(--claude-border)' }}>
          <p 
            className="text-xs md:text-sm text-center md:text-left"
            style={{ 
              color: 'var(--claude-text-muted)'
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
