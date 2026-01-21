'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'STANDARD' | 'ADVANCED' | 'EXPERT';
  opusWinRate: number;
  status: 'ACTIVE' | 'STANDBY';
}

const challenges: Challenge[] = [
  {
    id: 'spatial',
    name: 'SPATIAL REASONING',
    description: 'Navigate procedural labyrinths with working memory',
    difficulty: 'STANDARD',
    opusWinRate: 82,
    status: 'ACTIVE',
  },
  {
    id: 'resource',
    name: 'RESOURCE OPTIMIZATION',
    description: 'Manage scarce resources under time pressure',
    difficulty: 'STANDARD',
    opusWinRate: 76,
    status: 'ACTIVE',
  },
  {
    id: 'threat',
    name: 'THREAT ASSESSMENT',
    description: 'Survive against intelligent pursuers',
    difficulty: 'ADVANCED',
    opusWinRate: 71,
    status: 'ACTIVE',
  },
  {
    id: 'strategic',
    name: 'STRATEGIC PLACEMENT',
    description: 'Defend against waves through resource allocation',
    difficulty: 'EXPERT',
    opusWinRate: 85,
    status: 'STANDBY',
  },
];

const Courses: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>('spatial');
  
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'EXPERT': return 'var(--amber)';
      case 'ADVANCED': return 'var(--accent)';
      default: return 'var(--text-secondary)';
    }
  };

  const selected = challenges.find(c => c.id === selectedChallenge);

  return (
    <section 
      className="py-8 sm:py-12 md:py-20 relative overflow-hidden font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 sm:mb-8"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title text-[10px] sm:text-xs">ARENA CHALLENGES</span>
              <span className="status-badge text-[9px] sm:text-[10px]">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                15 ACTIVE
              </span>
            </div>
            <div className="px-3 py-2 sm:px-4 sm:py-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> COGNITIVE CHALLENGES
              </h2>
            </div>
          </div>
        </motion.div>

        {/* HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Challenge List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">ENVIRONMENT SELECT</span>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  4 OF 15
                </span>
              </div>
              
              <div className="overflow-x-auto mobile-scroll">
                <table className="hud-table text-[10px] sm:text-xs">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">ENV</th>
                      <th className="whitespace-nowrap hidden sm:table-cell">DIFF</th>
                      <th className="whitespace-nowrap">WIN%</th>
                      <th className="whitespace-nowrap hidden sm:table-cell">MATCHES</th>
                      <th className="whitespace-nowrap">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges.map((challenge) => (
                      <tr 
                        key={challenge.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedChallenge(challenge.id)}
                        style={{ 
                          background: selectedChallenge === challenge.id ? 'rgba(0, 212, 170, 0.1)' : 'transparent'
                        }}
                      >
                        <td>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span 
                              className="w-1 sm:w-1.5 h-5 sm:h-6 flex-shrink-0"
                              style={{ 
                                background: selectedChallenge === challenge.id ? 'var(--accent)' : 'var(--border)'
                              }}
                            />
                            <span className="truncate max-w-[100px] sm:max-w-none" style={{ color: 'var(--text-primary)' }}>
                              {challenge.name}
                            </span>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell">
                          <span 
                            className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                            style={{ 
                              border: `1px solid ${getDifficultyColor(challenge.difficulty)}`,
                              color: getDifficultyColor(challenge.difficulty)
                            }}
                          >
                            {challenge.difficulty}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span style={{ color: challenge.opusWinRate > 75 ? 'var(--accent)' : 'var(--text-primary)' }}>
                              {challenge.opusWinRate}%
                            </span>
                            <div className="hidden sm:block w-16 h-1" style={{ background: 'var(--border)' }}>
                              <div 
                                className="h-full"
                                style={{ 
                                  width: `${challenge.opusWinRate}%`,
                                  background: 'var(--accent)'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>
                          {challenge.totalMatches.toLocaleString()}
                        </td>
                        <td>
                          <span className="flex items-center gap-1">
                            <span 
                              className="status-dot flex-shrink-0" 
                              style={{ 
                                width: 4, 
                                height: 4,
                                background: challenge.status === 'ACTIVE' ? 'var(--green)' : 'var(--amber)',
                                boxShadow: `0 0 8px ${challenge.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(212, 160, 0, 0.4)'}`
                              }} 
                            />
                            <span 
                              className="text-[9px] sm:text-xs"
                              style={{ color: challenge.status === 'ACTIVE' ? 'var(--green)' : 'var(--amber)' }}
                            >
                              {challenge.status}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 sm:p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <Link href="/challenges">
                  <button className="hud-button w-full text-[10px] sm:text-xs py-2.5 sm:py-2">
                    VIEW ALL 15 CHALLENGES
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Selected Challenge Detail */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            
            {/* Challenge Info */}
            {selected && (
              <div className="hud-panel" style={{ border: '1px solid var(--accent)' }}>
                <div className="hud-panel-header" style={{ background: 'rgba(0, 212, 170, 0.1)' }}>
                  <span className="hud-panel-title text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>
                    SELECTED
                  </span>
                </div>
                <div className="hud-panel-content p-2 sm:p-3">
                  <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                    {selected.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs mb-3 sm:mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {selected.description}
                  </p>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>DIFFICULTY</span>
                      <span 
                        className="text-[10px] sm:text-xs"
                        style={{ color: getDifficultyColor(selected.difficulty) }}
                      >
                        {selected.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>OPUS WIN RATE</span>
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--accent)' }}>
                        {selected.opusWinRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>TOTAL MATCHES</span>
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-primary)' }}>
                        {selected.totalMatches.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link href={`/challenges/${selected.id}`}>
                    <button className="hud-button hud-button-primary w-full mt-3 sm:mt-4 text-[10px] sm:text-xs py-2.5 sm:py-2">
                      ENTER CHALLENGE
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Opus Performance */}
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">OPUS PERFORMANCE</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <div className="space-y-1.5 sm:space-y-2">
                  {challenges.map((c) => (
                    <div key={c.id} className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[9px] sm:text-xs w-16 sm:w-20 truncate" style={{ color: 'var(--text-muted)' }}>
                        {c.name.split(' ')[0]}
                      </span>
                      <div className="flex-1 h-1.5 sm:h-2" style={{ background: 'var(--border)' }}>
                        <motion.div 
                          className="h-full"
                          style={{ background: 'var(--accent)' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.opusWinRate}%` }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <span className="text-[9px] sm:text-xs w-8 sm:w-10 text-right" style={{ color: 'var(--accent)' }}>
                        {c.opusWinRate}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Courses;
