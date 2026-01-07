'use client';

import { LEGAL_LINKS, TAGLINES } from '@/lib/constants';
import { Twitter, Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/">
              <motion.div
                className="text-xl md:text-2xl font-normal inline-block"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-accent)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                Claude<span style={{ color: 'var(--accent)' }}>RL</span>
              </motion.div>
            </Link>
            <p 
              className="mt-3 md:mt-4 text-sm md:text-base"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-secondary)',
                lineHeight: 1.625
              }}
            >
              {TAGLINES.footer}
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
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)'
                  }}
                  whileHover={{ 
                    color: 'var(--accent)',
                    backgroundColor: 'var(--bg-hover)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </Link>
              <Link
                href="https://github.com/ClaudeRL"
                aria-label="GitHub"
              >
                <motion.div 
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center border"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)'
                  }}
                  whileHover={{ 
                    color: 'var(--accent)',
                    backgroundColor: 'var(--bg-hover)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            {/* Platform Links */}
            <div>
              <h4 
                className="font-medium mb-3 md:mb-4 text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-primary)'
                }}
              >
                Platform
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { href: '/livesim', label: 'Live Arena' },
                  { href: '/challenges', label: 'Challenges' },
                  { href: '/rankings', label: 'Rankings' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors text-xs md:text-sm hover:underline"
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 
                className="font-medium mb-3 md:mb-4 text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-primary)'
                }}
              >
                Resources
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { href: '/research', label: 'Research' },
                  { href: '/how-it-works', label: 'How It Works' },
                  { href: '/api', label: 'API' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors text-xs md:text-sm hover:underline"
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="hidden md:block">
              <h4 
                className="font-medium mb-3 md:mb-4 text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-primary)'
                }}
              >
                Legal
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors text-xs md:text-sm hover:underline"
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p 
            className="text-xs md:text-sm text-center md:text-left"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-muted)'
            }}
          >
            {TAGLINES.built}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
