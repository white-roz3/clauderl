'use client';

import { TAGLINES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative font-mono" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container mx-auto px-4 py-10 md:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Panel */}
          <div className="md:col-span-2">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <div className="flex items-center gap-2">
                  <span className="status-dot" style={{ width: 6, height: 6 }} />
                  <span className="hud-panel-title">CLAUDEARENA</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--hud-green)' }}>ONLINE</span>
              </div>
              <div className="hud-panel-content">
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {TAGLINES.footer}
                </p>
                <p 
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  // {TAGLINES.built}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  <Link href="https://x.com/i/communities/1971956497015009337">
                    <span 
                      className="hud-button text-xs px-3 py-1"
                    >
                      TWITTER
                    </span>
                  </Link>
                  <Link href="https://github.com/ClaudeArena">
                    <span 
                      className="hud-button text-xs px-3 py-1"
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
                <span className="hud-panel-title">PLATFORM</span>
              </div>
              <div className="hud-panel-content space-y-2">
                {[
                  { href: '/livesim', label: 'LIVE ARENA' },
                  { href: '/challenges', label: 'CHALLENGES' },
                  { href: '/rankings', label: 'RANKINGS' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-xs transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--hud-cyan)' }}>{'>'}</span>
                    <span className="hover:text-[var(--hud-cyan)]">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <div className="hud-panel h-full" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title">RESOURCES</span>
              </div>
              <div className="hud-panel-content space-y-2">
                {[
                  { href: '/research', label: 'RESEARCH' },
                  { href: '/how-it-works', label: 'DOCUMENTATION' },
                  { href: '/api', label: 'API' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-xs transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--hud-cyan)' }}>{'>'}</span>
                    <span className="hover:text-[var(--hud-cyan)]">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-4">
            <span style={{ color: 'var(--text-muted)' }}>
              VERSION: <span style={{ color: 'var(--text-primary)' }}>1.0.0</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              STATUS: <span style={{ color: 'var(--hud-green)' }}>OPERATIONAL</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              UPTIME: <span style={{ color: 'var(--text-primary)' }}>99.97%</span>
            </span>
          </div>
          
          {/* Contract Address */}
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--hud-cyan)' }}>$CA:</span>
            <code style={{ color: 'var(--text-secondary)' }}>
              ZFV14P2wf72AP9HNz4i8FK8KfDETFuM8Tgc3hGapump
            </code>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
