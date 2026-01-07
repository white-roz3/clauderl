'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Settings, Volume2, Maximize, MessageSquare } from 'lucide-react';
import { MODELS, ENVIRONMENTS, CTAS } from '@/lib/constants';
import { useState } from 'react';

export default function LiveMatchPage() {
  const [selectedEnv, setSelectedEnv] = useState(ENVIRONMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simulated commentary
  const commentary = [
    { modelId: 'opus', action: 'Analyzing optimal path', reasoning: 'Evaluating 3 possible routes, selecting path with best visibility coverage', timestamp: '00:42' },
    { modelId: 'gpt', action: 'Gathering resources', reasoning: 'Resource node detected 15 units away', timestamp: '00:41' },
    { modelId: 'opus', action: 'Moving to high ground', reasoning: 'Strategic positioning for better observation', timestamp: '00:39' },
    { modelId: 'gemini', action: 'Avoiding obstacle', reasoning: 'Collision predicted, adjusting trajectory', timestamp: '00:38' },
    { modelId: 'grok', action: 'Exploring new area', reasoning: 'Unknown territory mapped, 23% coverage', timestamp: '00:36' },
  ];

  const getModel = (id: string) => MODELS.find(m => m.id === id);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b p-4 md:p-6" style={{ borderColor: 'var(--border)' }}>
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 
              className="text-2xl md:text-3xl font-normal"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-accent)'
              }}
            >
              Live Arena
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Watch frontier models compete in real-time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
            />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Live</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Unity viewport - 3 columns */}
        <div className="lg:col-span-3 relative">
          <div 
            className="aspect-video w-full flex items-center justify-center"
            style={{ backgroundColor: '#1A1A17' }}
          >
            {/* Placeholder for Unity WebGL */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)'
                }}
              >
                <Play className="w-10 h-10" style={{ color: 'var(--accent)' }} />
              </motion.div>
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {selectedEnv.name}
              </h3>
              <p className="text-sm max-w-md mx-auto mb-4" style={{ color: 'var(--text-muted)' }}>
                {selectedEnv.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Unity WebGL Loading...
              </div>
            </div>
          </div>

          {/* Video controls */}
          <div 
            className="p-4 flex items-center gap-4 border-t"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)'
            }}
          >
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Play className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
            <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <SkipForward className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </button>
            
            {/* Progress bar */}
            <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            </div>

            <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>00:42 / 02:00</span>

            <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <Volume2 className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <Settings className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <Maximize className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
        
        {/* Commentary panel - 1 column */}
        <div 
          className="border-l flex flex-col h-[calc(100vh-160px)]"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)'
          }}
        >
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Live Commentary
              </h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {commentary.map((entry, index) => {
              const model = getModel(entry.modelId);
              if (!model) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg p-3"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: model.color }}
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {model.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {entry.action}
                  </p>
                  <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                    &ldquo;{entry.reasoning}&rdquo;
                  </p>
                </motion.div>
              );
            })}
          </div>
          
          <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
          </div>
        </div>
      </div>
      
      {/* Match controls */}
      <div 
        className="border-t p-4 md:p-6"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            {/* Match type buttons */}
            <div className="flex gap-2">
              {['1v1 Duel', 'Battle Royale', 'Challenge Run'].map((type, index) => (
                <button
                  key={type}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: index === 0 ? 'var(--accent)' : 'var(--bg-primary)',
                    color: index === 0 ? 'white' : 'var(--text-secondary)',
                    border: index === 0 ? 'none' : '1px solid var(--border)'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="flex-1" />
            
            {/* Environment selector */}
            <select 
              className="px-4 py-2 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)'
              }}
              value={selectedEnv.id}
              onChange={(e) => {
                const env = ENVIRONMENTS.find(env => env.id === e.target.value);
                if (env) setSelectedEnv(env);
              }}
            >
              {ENVIRONMENTS.map(env => (
                <option key={env.id} value={env.id}>{env.name}</option>
              ))}
            </select>
            
            {/* Start button */}
            <motion.button 
              className="px-6 py-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'white'
              }}
              whileHover={{ backgroundColor: 'var(--accent-hover)' }}
              whileTap={{ scale: 0.98 }}
            >
              {CTAS.start}
            </motion.button>
          </div>

          {/* Model status */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {MODELS.map((model) => (
              <div
                key={model.id}
                className="rounded-lg p-4 border flex items-center gap-3"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: model.isLeading ? model.color : 'var(--border)'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: model.color }}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {model.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {model.company}
                  </p>
                </div>
                {model.isLeading && (
                  <span className="text-xs" style={{ color: model.color }}>★</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

