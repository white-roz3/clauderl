'use client';

import { TAGLINES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative font-mono safe-area-inset" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8">
          
          {/* Brand Panel */}
          <div className="col-span-2">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <div className="flex items-center gap-2">
                  <span className="status-dot" style={{ width: 5, height: 5 }} />
                  <span className="hud-panel-title text-[10px] sm:text-xs">CLAUDEARENA</span>
                </div>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--green)' }}>ONLINE</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <p 
                  className="text-xs sm:text-sm mb-2 sm:mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {TAGLINES.footer}
                </p>
                <p 
                  className="text-[10px] sm:text-xs hidden sm:block"
                  style={{ color: 'var(--text-muted)' }}
                >
                  // {TAGLINES.built}
                </p>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Link href="https://x.com/i/communities/1971956497015009337">
                    <span 
                      className="hud-button text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-1"
                    >
                      TWITTER
                    </span>
                  </Link>
                  <Link href="https://github.com/ClaudeArena">
                    <span 
                      className="hud-button text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-1"
                    >
                      GITHUB
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <div className="hud-panel h-full" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">PLATFORM</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                {[
                  { href: '/livesim', label: 'LIVE ARENA' },
                  { href: '/challenges', label: 'CHALLENGES' },
                  { href: '/rankings', label: 'RANKINGS' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs transition-colors py-0.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent)' }}>{'>'}</span>
                    <span className="hover:text-[var(--accent)]">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <div className="hud-panel h-full" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">RESOURCES</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                {[
                  { href: '/research', label: 'RESEARCH' },
                  { href: '/how-it-works', label: 'DOCS' },
                  { href: '/api', label: 'API' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs transition-colors py-0.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent)' }}>{'>'}</span>
                    <span className="hover:text-[var(--accent)]">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 text-[10px] sm:text-xs"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span style={{ color: 'var(--text-muted)' }}>
              <span className="hidden sm:inline">VERSION: </span>
              <span className="sm:hidden">v</span>
              <span style={{ color: 'var(--text-primary)' }}>1.0.0</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              <span className="hidden sm:inline">STATUS: </span>
              <span style={{ color: 'var(--green)' }}>ONLINE</span>
            </span>
            <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
              UPTIME: <span style={{ color: 'var(--text-primary)' }}>99.97%</span>
            </span>
          </div>
          
          {/* Contract Address */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-hidden">
            <span style={{ color: 'var(--accent)' }}>$CA:</span>
            <code className="truncate text-[9px] sm:text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="sm:hidden">ZFV14P2wf72AP...pump</span>
              <span className="hidden sm:inline">ZFV14P2wf72AP9HNz4i8FK8KfDETFuM8Tgc3hGapump</span>
            </code>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
