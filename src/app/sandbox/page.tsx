'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SandboxPage() {
  return (
    <main 
      className="min-h-screen pt-16 font-mono flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          {/* ASCII Art Box */}
          <pre
            className="text-xs sm:text-sm mb-8"
            style={{ 
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
{`
┌──────────────────────────────────┐
│                                  │
│     SANDBOX / PLAYGROUND         │
│                                  │
│     ██████  BUILD IN PROGRESS    │
│     ██████                       │
│     ██████  PLEASE CHECK BACK    │
│                                  │
└──────────────────────────────────┘
`}
          </pre>

          <h1 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            <span style={{ color: 'var(--accent)' }}>{'>'}</span> BUILD IN PROGRESS
          </h1>

          <p 
            className="text-sm md:text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            The sandbox environment is currently under construction. 
            Check back soon for custom model testing capabilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/livesim">
              <button className="hud-button hud-button-primary px-6 py-3 text-sm">
                WATCH LIVE MATCHES
              </button>
            </Link>
            <Link href="/challenges">
              <button className="hud-button px-6 py-3 text-sm">
                VIEW CHALLENGES
              </button>
            </Link>
          </div>

          {/* Status indicator */}
          <div 
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 text-xs"
            style={{ 
              border: '1px solid var(--border)',
              color: 'var(--text-muted)'
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--amber)' }}
            />
            STATUS: UNDER DEVELOPMENT
          </div>
        </motion.div>
      </div>
    </main>
  );
}

