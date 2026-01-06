'use client';

import { NAVIGATION_LINKS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="backdrop-blur-md sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(250, 249, 247, 0.95)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo with Anthropic style */}
          <Link href="/">
            <motion.div
              className="text-xl md:text-2xl font-bold"
              style={{ 
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: 'var(--claude-charcoal)'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Claude<span style={{ color: 'var(--claude-orange)' }}>RL</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden lg:flex items-center">
            <div 
              className="flex items-center gap-1 p-1.5 rounded-xl"
              style={{
                backgroundColor: 'rgba(240, 237, 232, 0.5)'
              }}
            >
              {NAVIGATION_LINKS.map((link) => {
                const isExternal = link.href.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href };

                return (
                  <LinkComponent
                    key={link.href}
                    {...linkProps}
                  >
                    <motion.div
                      className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                      style={{ 
                        color: 'var(--claude-warm-gray)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}
                      whileHover={{ 
                        color: 'var(--claude-charcoal)',
                        backgroundColor: 'var(--claude-warm-white)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                    </motion.div>
                  </LinkComponent>
                );
              })}
            </div>
          </nav>

          {/* CTA Button - Desktop only */}
          <div className="hidden lg:block">
            <Link href="/livesim">
              <motion.button 
                className="px-6 py-2.5 text-white font-semibold text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--claude-orange)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)'
                }}
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.35)'
                }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                Launch
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 rounded-lg"
            style={{
              color: 'var(--claude-charcoal)',
              backgroundColor: 'rgba(240, 237, 232, 0.5)'
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <nav 
                className="flex flex-col gap-1 p-3 rounded-xl"
                style={{
                  backgroundColor: 'var(--claude-warm-white)',
                  border: '1px solid #E5E1DB'
                }}
              >
                {NAVIGATION_LINKS.map((link, index) => {
                  const isExternal = link.href.startsWith('http');
                  const LinkComponent = isExternal ? 'a' : Link;
                  const linkProps = isExternal
                    ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: link.href };

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <LinkComponent
                        {...linkProps}
                        className="flex items-center px-4 py-3 rounded-lg transition-all font-medium text-base"
                        style={{ 
                          color: 'var(--claude-charcoal)',
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </LinkComponent>
                    </motion.div>
                  );
                })}
                
                {/* Mobile CTA Button */}
                <motion.div 
                  className="pt-3 mt-2"
                  style={{ borderTop: '1px solid #E5E1DB' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link href="/livesim" onClick={() => setIsMenuOpen(false)}>
                    <motion.button 
                      className="w-full py-3.5 text-white font-semibold rounded-lg text-base"
                      style={{
                        backgroundColor: 'var(--claude-orange)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        boxShadow: '0 4px 16px rgba(217, 119, 6, 0.25)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Launch Simulation
                    </motion.button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
