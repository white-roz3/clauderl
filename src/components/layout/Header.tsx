'use client';

import { NAVIGATION_LINKS, CTAS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 font-mono"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: isScrolled ? 'rgba(10, 15, 15, 0.95)' : 'rgba(10, 15, 15, 0.8)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border)' : 'transparent'}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 text-sm font-bold tracking-wider"
              whileHover={{ x: 2 }}
            >
              <span className="status-dot" style={{ width: 6, height: 6 }} />
              <span style={{ color: 'var(--hud-cyan)' }}>CLAUDE</span>
              <span style={{ color: 'var(--text-primary)' }}>ARENA</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link, index) => {
              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: link.href };

              return (
                <LinkComponent key={link.href} {...linkProps}>
                  <motion.span
                    className="px-3 py-2 text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    whileHover={{ color: 'var(--hud-cyan)' }}
                  >
                    {link.label}
                  </motion.span>
                </LinkComponent>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/livesim">
              <button className="hud-button hud-button-primary text-xs px-4 py-2">
                {CTAS.live.toUpperCase()}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2"
            style={{
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ borderColor: 'var(--hud-cyan)' }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-4 h-4" />
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
              transition={{ duration: 0.2 }}
            >
              <nav 
                className="hud-panel"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="hud-panel-header">
                  <span className="hud-panel-title">NAVIGATION</span>
                </div>
                
                {NAVIGATION_LINKS.map((link, index) => {
                  const isExternal = link.href.startsWith('http');
                  const LinkComponent = isExternal ? 'a' : Link;
                  const linkProps = isExternal
                    ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: link.href };

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <LinkComponent
                        {...linkProps}
                        className="flex items-center px-4 py-3 text-sm uppercase tracking-wider transition-colors"
                        style={{ 
                          color: 'var(--text-primary)',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span style={{ color: 'var(--hud-cyan)' }}>{'>'}</span>
                        <span className="ml-2">{link.label}</span>
                      </LinkComponent>
                    </motion.div>
                  );
                })}
                
                {/* Mobile CTA Button */}
                <motion.div 
                  className="p-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href="/livesim" onClick={() => setIsMenuOpen(false)}>
                    <button className="hud-button hud-button-primary w-full py-3 text-sm">
                      {CTAS.live.toUpperCase()}
                    </button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
