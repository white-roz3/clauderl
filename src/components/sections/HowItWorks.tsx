'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress((prev) => {
      const newProgress = [...prev];
      newProgress[activeStep] = 100;
      return newProgress;
    });
  }, [activeStep]);

  const steps = [
    {
      id: '01',
      title: 'NEURAL INITIALIZATION',
      command: './init_cores --model opus-4.5',
      status: 'COMPLETE',
      metrics: { cores: 128, memory: '4.2TB', latency: '12ms' },
      output: ['Loading model weights...', 'Allocating VRAM: 80GB', 'Neural cores: ONLINE']
    },
    {
      id: '02', 
      title: 'ENVIRONMENT DEPLOYMENT',
      command: './deploy_env --seed random',
      status: 'ACTIVE',
      metrics: { seed: '0x7F3A2B', complexity: 'HIGH', agents: 4 },
      output: ['Generating world...', 'Seed: 0x7F3A2B1C', 'Environment: READY']
    },
    {
      id: '03',
      title: 'REASONING EXECUTION',
      command: './run_inference --realtime',
      status: 'PENDING',
      metrics: { tokens: '32K', throughput: '150/s', accuracy: '96%' },
      output: ['Processing input...', 'Generating response...', 'Confidence: 0.96']
    },
    {
      id: '04',
      title: 'SCORE RECORDING',
      command: './record_score --verify',
      status: 'PENDING',
      metrics: { score: 94520, verified: true, rank: '#1' },
      output: ['Calculating score...', 'Verification: PASS', 'Rank updated: #1']
    }
  ];

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
              <span className="hud-panel-title text-[10px] sm:text-xs">SYSTEM WORKFLOW</span>
            </div>
            <div className="px-3 py-2 sm:px-4 sm:py-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> HOW IT WORKS
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Main HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Steps Timeline - Horizontal scroll on mobile, vertical on desktop */}
          <div className="lg:col-span-1 order-1">
            {/* Mobile: Horizontal scrollable steps */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden mobile-scroll">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hud-panel cursor-pointer flex-shrink-0 w-[140px]"
                  style={{ 
                    border: `1px solid ${activeStep === index ? 'var(--accent)' : 'var(--border)'}`,
                    background: activeStep === index ? 'rgba(0, 212, 170, 0.05)' : 'var(--bg-panel)'
                  }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-sm font-bold"
                        style={{ color: activeStep === index ? 'var(--accent)' : 'var(--text-muted)' }}
                      >
                        [{step.id}]
                      </span>
                      <span 
                        className="text-[9px] px-1 py-0.5"
                        style={{ 
                          border: `1px solid ${
                            step.status === 'COMPLETE' ? 'var(--green)' :
                            step.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)'
                          }`,
                          color: step.status === 'COMPLETE' ? 'var(--green)' :
                                 step.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)'
                        }}
                      >
                        {step.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </div>
                    <div className="hud-progress mt-2 h-1">
                      <motion.div 
                        className="hud-progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: activeStep >= index ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Desktop: Vertical steps */}
            <div className="hidden lg:block space-y-2">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hud-panel cursor-pointer"
                  style={{ 
                    border: `1px solid ${activeStep === index ? 'var(--accent)' : 'var(--border)'}`,
                    background: activeStep === index ? 'rgba(0, 212, 170, 0.05)' : 'var(--bg-panel)'
                  }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-lg font-bold"
                        style={{ color: activeStep === index ? 'var(--accent)' : 'var(--text-muted)' }}
                      >
                        [{step.id}]
                      </span>
                      <span 
                        className="text-xs px-2 py-0.5"
                        style={{ 
                          border: `1px solid ${
                            step.status === 'COMPLETE' ? 'var(--green)' :
                            step.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)'
                          }`,
                          color: step.status === 'COMPLETE' ? 'var(--green)' :
                                 step.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-muted)'
                        }}
                      >
                        {step.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </div>
                    {/* Progress bar */}
                    <div className="hud-progress">
                      <motion.div 
                        className="hud-progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: activeStep >= index ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Display - Center */}
          <div className="lg:col-span-2 order-2">
            <div 
              className="hud-panel h-full min-h-[280px] sm:min-h-[350px] relative"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Corner decorations - hidden on mobile */}
              <div className="hidden sm:block absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="hidden sm:block absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: 'var(--accent)' }} />

              <div className="hud-panel-header">
                <div className="flex items-center gap-2">
                  <span className="status-dot" style={{ width: 5, height: 5 }} />
                  <span className="hud-panel-title text-[10px] sm:text-xs">TERMINAL OUTPUT</span>
                </div>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  STEP {steps[activeStep].id}/04
                </span>
              </div>

              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {/* Command */}
                <div 
                  className="p-2 sm:p-3"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                >
                  <div className="text-[10px] sm:text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    $ COMMAND
                  </div>
                  <code className="text-xs sm:text-sm break-all" style={{ color: 'var(--accent)' }}>
                    {steps[activeStep].command}
                  </code>
                </div>

                {/* Output */}
                <div 
                  className="p-2 sm:p-3 min-h-[80px] sm:min-h-[120px]"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                >
                  <div className="text-[10px] sm:text-xs mb-1 sm:mb-2" style={{ color: 'var(--text-muted)' }}>
                    $ OUTPUT
                  </div>
                  {steps[activeStep].output.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-xs sm:text-sm py-0.5 sm:py-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span style={{ color: 'var(--accent)' }}>{'>'}</span> {line}
                    </motion.div>
                  ))}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {Object.entries(steps[activeStep].metrics).map(([key, value]) => (
                    <div 
                      key={key}
                      className="p-1.5 sm:p-2 text-center"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                    >
                      <div className="text-[9px] sm:text-xs uppercase truncate" style={{ color: 'var(--text-muted)' }}>
                        {key}
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate" style={{ color: 'var(--accent)' }}>
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Panel - Right */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4 order-3">
            
            {/* System Stats */}
            <div className="hud-panel col-span-2 sm:col-span-1" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">SYSTEM STATS</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3 space-y-2 sm:space-y-3">
                {[
                  { label: 'ENVIRONMENTS', value: '15', status: 'ACTIVE' },
                  { label: 'AVG MATCH TIME', value: '4.2min', status: null },
                  { label: 'MODELS', value: '4', status: null },
                  { label: 'UPTIME', value: '99.97%', status: 'ONLINE' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {stat.value}
                      </span>
                      {stat.status && (
                        <span 
                          className="text-[9px] sm:text-xs px-1"
                          style={{ 
                            color: 'var(--green)',
                            border: '1px solid var(--green)'
                          }}
                        >
                          {stat.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network */}
            <div className="hud-panel col-span-2 sm:col-span-1" style={{ border: '1px solid var(--border)' }}>
              <div className="hud-panel-header">
                <span className="hud-panel-title text-[10px] sm:text-xs">NETWORK</span>
              </div>
              <div className="hud-panel-content p-2 sm:p-3">
                <div className="h-12 sm:h-16 flex items-end gap-0.5 mb-2">
                  {[...Array(20)].map((_, i) => {
                    const height = 30 + Math.sin(i * 0.5 + Date.now() / 1000) * 30 + Math.random() * 20;
                    return (
                      <div 
                        key={i}
                        className="flex-1 transition-all"
                        style={{ 
                          height: `${height}%`,
                          background: 'var(--accent)',
                          opacity: 0.3 + (i / 20) * 0.7
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>↓ 1.6 GBps</span>
                  <span>↑ 1.2 GBps</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
