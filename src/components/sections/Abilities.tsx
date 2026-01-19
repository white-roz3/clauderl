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
      className="py-12 md:py-20 relative overflow-hidden font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">CAPABILITY ANALYSIS</span>
              <span className="status-badge">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                {activeCount}/6 ACTIVE
              </span>
            </div>
            <div className="px-4 py-3">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> COGNITIVE ABILITIES
              </h2>
            </div>
          </div>
        </motion.div>

        {/* HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Abilities List */}
          <div className="lg:col-span-2">
            <div className="hud-panel" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title">ABILITY INDEX</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="hud-table">
                  <thead>
                    <tr>
                      <th>ABILITY</th>
                      <th>STATUS</th>
                      <th>MASTERY</th>
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
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-1.5 h-6"
                              style={{ 
                                background: selectedAbility === ability.id ? 'var(--accent)' : 
                                           ability.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)'
                              }}
                            />
                            <span 
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
                            className="text-xs px-2 py-0.5"
                            style={{ 
                              border: `1px solid ${ability.status === 'ACTIVE' ? 'var(--green)' : 'var(--border)'}`,
                              color: ability.status === 'ACTIVE' ? 'var(--green)' : 'var(--text-muted)'
                            }}
                          >
                            {ability.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2" style={{ background: 'var(--border)' }}>
                              <motion.div 
                                className="h-full"
                                style={{ background: ability.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)' }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${ability.mastery}%` }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <span 
                              className="text-xs w-10"
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
          <div className="space-y-4">
            
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
                    className="hud-panel-title" 
                    style={{ color: selected.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)' }}
                  >
                    SELECTED
                  </span>
                </div>
                <div className="hud-panel-content">
                  <h3 
                    className="text-lg font-bold mb-2" 
                    style={{ color: selected.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-muted)' }}
                  >
                    {selected.name}
                  </h3>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {selected.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>STATUS</span>
                      <span 
                        className="text-xs"
                        style={{ color: selected.status === 'ACTIVE' ? 'var(--green)' : 'var(--text-muted)' }}
                      >
                        {selected.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>MASTERY</span>
                      <span 
                        className="text-xs" 
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
                <span className="hud-panel-title">SUMMARY</span>
              </div>
              <div className="hud-panel-content text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  {activeCount}<span style={{ color: 'var(--text-muted)' }}>/{abilities.length}</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  CAPABILITIES ACTIVE
                </div>
                <div className="hud-segments mt-4">
                  {abilities.map((a) => (
                    <div 
                      key={a.id} 
                      className={`hud-segment ${a.status === 'ACTIVE' ? 'active' : ''}`} 
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
