'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Abilities: React.FC = () => {
  const [selectedAbility, setSelectedAbility] = useState<string>('spatial');

  const abilities = [
    {
      id: 'spatial',
      name: 'SPATIAL REASONING',
      status: 'ACTIVE',
      mastery: 94,
      description: 'Navigate and understand 3D environments',
    },
    {
      id: 'temporal',
      name: 'TEMPORAL PLANNING',
      status: 'ACTIVE',
      mastery: 87,
      description: 'Multi-step reasoning over time horizons',
    },
    {
      id: 'adversarial',
      name: 'ADVERSARIAL REASONING',
      status: 'ACTIVE',
      mastery: 91,
      description: 'Model and counter opponent behavior',
    },
    {
      id: 'abstract',
      name: 'PATTERN RECOGNITION',
      status: 'ACTIVE',
      mastery: 89,
      description: 'Identify and exploit hidden patterns',
    },
    {
      id: 'social',
      name: 'SOCIAL INTELLIGENCE',
      status: 'LOCKED',
      mastery: 0,
      description: 'Coordinate and negotiate with others',
    },
    {
      id: 'adaptation',
      name: 'REALTIME ADAPTATION',
      status: 'LOCKED',
      mastery: 0,
      description: 'Learn and adjust mid-challenge',
    }
  ];

  const selected = abilities.find(a => a.id === selectedAbility);
  const activeCount = abilities.filter(a => a.status === 'ACTIVE').length;

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
              <span className="hud-panel-title text-[10px] sm:text-xs">CAPABILITY ANALYSIS</span>
              <span className="status-badge text-[9px] sm:text-[10px]">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                {activeCount}/6 ACTIVE
              </span>
            </div>
            <div className="px-3 py-2 sm:px-4 sm:py-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> COGNITIVE ABILITIES
              </h2>
            </div>
          </div>
        </motion.div>

        {/* HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Abilities List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">ABILITY INDEX</span>
              </div>
              
              <div className="overflow-x-auto mobile-scroll">
                <table className="hud-table text-[10px] sm:text-xs">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">ABILITY</th>
                      <th className="whitespace-nowrap">STATUS</th>
                      <th className="whitespace-nowrap">MASTERY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abilities.map((ability) => (
                      <tr 
                        key={ability.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedAbility(ability.id)}
                        style={{ 
                          background: selectedAbility === ability.id ? 'rgba(0, 212, 170, 0.1)' : 'transparent'
                        }}
                      >
                        <td>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span 
                              className="w-1 sm:w-1.5 h-5 sm:h-6 flex-shrink-0"
                              style={{ 
                                background: selectedAbility === ability.id ? 'var(--accent)' : 
                                           ability.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)'
                              }}
                            />
                            <span 
                              className="truncate max-w-[120px] sm:max-w-none"
                              style={{ 
                                color: ability.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-muted)'
                              }}
                            >
                              {ability.name}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span 
                            className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                            style={{ 
                              border: `1px solid ${ability.status === 'ACTIVE' ? 'var(--green)' : 'var(--border)'}`,
                              color: ability.status === 'ACTIVE' ? 'var(--green)' : 'var(--text-muted)'
                            }}
                          >
                            {ability.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5 sm:gap-3">
                            <div className="w-16 sm:w-24 h-1.5 sm:h-2" style={{ background: 'var(--border)' }}>
                              <motion.div 
                                className="h-full"
                                style={{ background: ability.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)' }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${ability.mastery}%` }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <span 
                              className="text-[9px] sm:text-xs w-8 sm:w-10"
                              style={{ 
                                color: ability.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)'
                              }}
                            >
                              {ability.mastery}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Selected Ability Detail */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            
            {/* Detail Panel */}
            {selected && (
              <div 
                className="hud-panel" 
                style={{ 
                  border: `1px solid ${selected.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)'}` 
                }}
              >
                <div 
                  className="hud-panel-header" 
                  style={{ 
                    background: selected.status === 'ACTIVE' ? 'rgba(0, 212, 170, 0.1)' : 'transparent'
                  }}
                >
                  <span 
                    className="hud-panel-title text-[10px] sm:text-xs" 
                    style={{ color: selected.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)' }}
                  >
                    SELECTED
                  </span>
                </div>
                <div className="hud-panel-content p-2 sm:p-3">
                  <h3 
                    className="text-sm sm:text-lg font-bold mb-1 sm:mb-2" 
                    style={{ color: selected.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-muted)' }}
                  >
                    {selected.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs mb-3 sm:mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {selected.description}
                  </p>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>STATUS</span>
                      <span 
                        className="text-[10px] sm:text-xs"
                        style={{ color: selected.status === 'ACTIVE' ? 'var(--green)' : 'var(--text-muted)' }}
                      >
                        {selected.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>MASTERY</span>
                      <span 
                        className="text-[10px] sm:text-xs" 
                        style={{ color: selected.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)' }}
                      >
                        {selected.mastery}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Summary */}
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">SUMMARY</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  {activeCount}<span style={{ color: 'var(--text-muted)' }}>/{abilities.length}</span>
                </div>
                <div className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  CAPABILITIES ACTIVE
                </div>
                <div className="hud-segments mt-3 sm:mt-4">
                  {abilities.map((a) => (
                    <div 
                      key={a.id} 
                      className={`hud-segment ${a.status === 'ACTIVE' ? 'active' : ''}`}
                      style={{ height: '14px' }}
                    />
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

export default Abilities;
