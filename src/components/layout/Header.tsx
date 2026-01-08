'use client';

import { NAVIGATION_LINKS, CTAS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D Navigation Tab Component
function NavTab3D({ link, index }: { link: { label: string; href: string }; index: number }) {
  const tabRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tabRef.current) return;
    const rect = tabRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: link.href };

              return (
    <LinkComponent {...linkProps}>
      <motion.div
        ref={tabRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer relative group"
        style={{ 
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-secondary)',
          perspective: 600,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ 
            color: 'var(--text-primary)',
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Glow background on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              boxShadow: '0 4px 15px rgba(194, 117, 81, 0.15)',
            }}
            initial={false}
            transition={{ duration: 0.2 }}
          />
          <span style={{ transform: 'translateZ(5px)', display: 'block' }}>
                  {link.label}
          </span>
        </motion.div>
      </motion.div>
                </LinkComponent>
              );
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);

  const logoXSpring = useSpring(logoX, { stiffness: 200, damping: 15 });
  const logoYSpring = useSpring(logoY, { stiffness: 200, damping: 15 });

  const logoRotateX = useTransform(logoYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const logoRotateY = useTransform(logoXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleLogoMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    logoX.set(xPct);
    logoY.set(yPct);
  };

  const handleLogoMouseLeave = () => {
    logoX.set(0);
    logoY.set(0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - 3D hover effect */}
          <Link href="/">
            <motion.div
              ref={logoRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              className="text-xl md:text-2xl font-normal relative group"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)',
                perspective: 800,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  rotateX: logoRotateX,
                  rotateY: logoRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 -z-10 blur-md"
                  style={{
                    background: 'radial-gradient(circle, rgba(194,117,81,0.3) 0%, transparent 70%)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span style={{ transform: 'translateZ(10px)', display: 'inline-block' }}>Claude</span>
                <motion.span 
                  style={{ 
                    color: 'var(--accent)', 
                    transform: 'translateZ(15px)',
                    display: 'inline-block',
                    textShadow: '0 0 20px rgba(194,117,81,0.5)',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(194,117,81,0.3)',
                      '0 0 20px rgba(194,117,81,0.5)',
                      '0 0 10px rgba(194,117,81,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  RL
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - 3D tabs */}
          <nav className="hidden lg:flex items-center gap-1" style={{ perspective: '1000px' }}>
            {NAVIGATION_LINKS.map((link, index) => (
              <NavTab3D key={link.href} link={link} index={index} />
            ))}
          </nav>

          {/* CTA Button - Desktop only with 3D effect */}
          <div className="hidden lg:block" style={{ perspective: '600px' }}>
            <Link href="/livesim">
              <motion.button 
                className="px-6 py-2.5 font-medium text-sm rounded-lg relative overflow-hidden group"
                style={{
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(194, 117, 81, 0.4)',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -5,
                  boxShadow: '0 10px 30px rgba(194, 117, 81, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">{CTAS.live}</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button - 3D effect */}
          <motion.button
            className="lg:hidden p-2.5 rounded-lg relative"
            style={{
              color: 'var(--text-primary)',
              backgroundColor: 'transparent',
              perspective: '400px',
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
            }}
            whileTap={{ scale: 0.9, rotateY: -10 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - 3D animated */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 overflow-hidden"
              initial={{ height: 0, opacity: 0, rotateX: -15 }}
              animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
              exit={{ height: 0, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ perspective: '1000px', transformOrigin: 'top' }}
            >
              <nav 
                className="flex flex-col gap-1 p-3 rounded-xl border relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Subtle glow */}
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top, rgba(194,117,81,0.15) 0%, transparent 50%)',
                  }}
                />
                
                {NAVIGATION_LINKS.map((link, index) => {
              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: link.href };

              return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                <LinkComponent
                  {...linkProps}
                        className="flex items-center px-4 py-3 rounded-lg transition-all font-medium text-base relative overflow-hidden group"
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--text-primary)'
                        }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                        {/* Hover highlight */}
                        <span 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        />
                        <span className="relative z-10">{link.label}</span>
                </LinkComponent>
                    </motion.div>
              );
            })}
                
                {/* Mobile CTA Button - 3D */}
                <motion.div 
                  className="pt-3 mt-2"
                  style={{ borderTop: '1px solid var(--border)' }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                <Link href="/livesim" onClick={() => setIsMenuOpen(false)}>
                    <motion.button 
                      className="w-full py-3.5 font-medium rounded-lg text-base relative overflow-hidden"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(194, 117, 81, 0.4)'
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(194, 117, 81, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shine */}
                      <motion.span
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="relative z-10">{CTAS.live}</span>
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

    logoY.set(yPct);
  };

  const handleLogoMouseLeave = () => {
    logoX.set(0);
    logoY.set(0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - 3D hover effect */}
          <Link href="/">
            <motion.div
              ref={logoRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              className="text-xl md:text-2xl font-normal relative group"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)',
                perspective: 800,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  rotateX: logoRotateX,
                  rotateY: logoRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 -z-10 blur-md"
                  style={{
                    background: 'radial-gradient(circle, rgba(194,117,81,0.3) 0%, transparent 70%)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span style={{ transform: 'translateZ(10px)', display: 'inline-block' }}>Claude</span>
                <motion.span 
                  style={{ 
                    color: 'var(--accent)', 
                    transform: 'translateZ(15px)',
                    display: 'inline-block',
                    textShadow: '0 0 20px rgba(194,117,81,0.5)',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(194,117,81,0.3)',
                      '0 0 20px rgba(194,117,81,0.5)',
                      '0 0 10px rgba(194,117,81,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  RL
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - 3D tabs */}
          <nav className="hidden lg:flex items-center gap-1" style={{ perspective: '1000px' }}>
            {NAVIGATION_LINKS.map((link, index) => (
              <NavTab3D key={link.href} link={link} index={index} />
            ))}
          </nav>

          {/* CTA Button - Desktop only with 3D effect */}
          <div className="hidden lg:block" style={{ perspective: '600px' }}>
            <Link href="/livesim">
              <motion.button 
                className="px-6 py-2.5 font-medium text-sm rounded-lg relative overflow-hidden group"
                style={{
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(194, 117, 81, 0.4)',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -5,
                  boxShadow: '0 10px 30px rgba(194, 117, 81, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">{CTAS.live}</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button - 3D effect */}
          <motion.button
            className="lg:hidden p-2.5 rounded-lg relative"
            style={{
              color: 'var(--text-primary)',
              backgroundColor: 'transparent',
              perspective: '400px',
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
            }}
            whileTap={{ scale: 0.9, rotateY: -10 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - 3D animated */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 overflow-hidden"
              initial={{ height: 0, opacity: 0, rotateX: -15 }}
              animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
              exit={{ height: 0, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ perspective: '1000px', transformOrigin: 'top' }}
            >
              <nav 
                className="flex flex-col gap-1 p-3 rounded-xl border relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Subtle glow */}
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top, rgba(194,117,81,0.15) 0%, transparent 50%)',
                  }}
                />
                
                {NAVIGATION_LINKS.map((link, index) => {
                const isExternal = link.href.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href };

                return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                  <LinkComponent
                    {...linkProps}
                        className="flex items-center px-4 py-3 rounded-lg transition-all font-medium text-base relative overflow-hidden group"
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--text-primary)'
                        }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                        {/* Hover highlight */}
                        <span 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        />
                        <span className="relative z-10">{link.label}</span>
                  </LinkComponent>
                    </motion.div>
                );
              })}
                
                {/* Mobile CTA Button - 3D */}
                <motion.div 
                  className="pt-3 mt-2"
                  style={{ borderTop: '1px solid var(--border)' }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                <Link href="/livesim" onClick={() => setIsMenuOpen(false)}>
                    <motion.button 
                      className="w-full py-3.5 font-medium rounded-lg text-base relative overflow-hidden"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(194, 117, 81, 0.4)'
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(194, 117, 81, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shine */}
                      <motion.span
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="relative z-10">{CTAS.live}</span>
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
