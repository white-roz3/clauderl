'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Move, 
  ArrowUp, 
  Mountain, 
  Compass, 
  Brain, 
  RefreshCw,
  Lock,
  Check,
  ChevronRight
} from 'lucide-react';

const Abilities: React.FC = () => {
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);

  const abilities = [
    {
      id: 'movement',
      name: 'Movement',
      description: 'Basic locomotion and directional control',
      icon: Move,
      unlocked: true,
      unlockedBy: 'Default',
      details: 'Fundamental ability that allows agents to navigate in 3D space. Includes forward, backward, left, and right movement with smooth acceleration.',
    },
    {
      id: 'jumping',
      name: 'Jumping',
      description: 'Ability to leap over obstacles',
      icon: ArrowUp,
      unlocked: true,
      unlockedBy: 'Obstacle Course',
      details: 'Enables agents to overcome vertical barriers by calculating optimal jump timing and trajectory.',
    },
    {
      id: 'climbing',
      name: 'Climbing',
      description: 'Scale walls and vertical surfaces',
      icon: Mountain,
      unlocked: true,
      unlockedBy: 'Climbing Wall',
      details: 'Advanced motor skill allowing agents to ascend vertical surfaces by finding and utilizing handholds.',
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Advanced pathfinding and spatial awareness',
      icon: Compass,
      unlocked: true,
      unlockedBy: 'Soccer',
      details: 'Sophisticated spatial reasoning that enables efficient route planning and obstacle avoidance.',
    },
    {
      id: 'planning',
      name: 'Planning',
      description: 'Strategic thinking and multi-step reasoning',
      icon: Brain,
      unlocked: false,
      unlockedBy: 'Advanced Courses',
      details: 'High-level cognitive ability that allows agents to plan multiple moves ahead.',
    },
    {
      id: 'adaptation',
      name: 'Adaptation',
      description: 'Learning from failures and adjusting strategy',
      icon: RefreshCw,
      unlocked: false,
      unlockedBy: 'Meta-Learning',
      details: 'The ultimate ability that enables agents to learn from their mistakes and continuously improve.',
    }
  ];

  const unlockedCount = abilities.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / abilities.length) * 100);

  return (
    <section className="py-16 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white border border-gray-100 hidden md:block" 
        style={{ boxShadow: '20px 20px 60px rgba(0,0,0,0.04)' }} 
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
            Agent Capabilities
          </p>
          <h2 
            className="text-3xl md:text-5xl lg:text-7xl font-black text-black mb-4 md:mb-6"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.06)'
            }}
          >
            Abilities
          </h2>
          <p className="text-base md:text-xl text-gray-500 max-w-xs md:max-w-2xl mx-auto">
            AI agents unlock new capabilities as they overcome challenges
          </p>
        </motion.div>

        {/* Abilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 mb-8 md:mb-12">
          {abilities.map((ability, index) => {
            const Icon = ability.icon;
            const isSelected = selectedAbility === ability.id;
            
            return (
              <motion.div
                key={ability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedAbility(isSelected ? null : ability.id)}
                className="cursor-pointer"
              >
                <motion.div 
                  className={`
                    relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 h-full
                    border-2 transition-colors duration-300
                    ${isSelected ? 'border-black' : 'border-transparent'}
                    ${!ability.unlocked ? 'opacity-70' : ''}
                  `}
                  whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    boxShadow: isSelected 
                      ? '0 25px 50px rgba(0,0,0,0.12)' 
                      : '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Status badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3">
                    {ability.unlocked ? (
                      <div 
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center"
                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                      >
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div 
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      >
                        <Lock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div 
                    className={`
                      w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4
                      ${ability.unlocked 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }
                    `}
                    style={ability.unlocked ? { boxShadow: '0 6px 20px rgba(0,0,0,0.2)' } : {}}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 
                    className={`font-bold text-sm md:text-base mb-1 ${ability.unlocked ? 'text-black' : 'text-gray-400'}`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {ability.name}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {ability.description}
                  </p>

                  {/* Progress indicator */}
                  <div className="mt-3 md:mt-4">
                    <div className="h-1 md:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${ability.unlocked ? 'bg-black' : 'bg-gray-200'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: ability.unlocked ? '100%' : '0%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected ability details */}
        <AnimatePresence>
          {selectedAbility && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 md:mb-12 overflow-hidden"
            >
              {(() => {
                const ability = abilities.find(a => a.id === selectedAbility);
                if (!ability) return null;
                const Icon = ability.icon;

                return (
                  <div 
                    className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-100"
                    style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Icon */}
                      <div 
                        className={`
                          w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0
                          ${ability.unlocked ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}
                        `}
                        style={ability.unlocked ? { boxShadow: '0 10px 30px rgba(0,0,0,0.2)' } : {}}
                      >
                        <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 
                            className="text-xl md:text-2xl font-bold text-black"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {ability.name}
                          </h3>
                          <span 
                            className={`
                              px-3 py-1 rounded-full text-xs font-bold
                              ${ability.unlocked 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                              }
                            `}
                          >
                            {ability.unlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                        
                        <p className="text-gray-500 leading-relaxed mb-4 text-sm md:text-base">
                          {ability.details}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400">Unlocked by:</span>
                          <span className="font-medium text-black">{ability.unlockedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div 
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 inline-block border border-gray-100"
            style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-6 md:gap-10">
              {/* Progress circle */}
              <div className="relative">
                <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#000"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: progressPercent / 100 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    style={{ 
                      strokeDasharray: "283",
                      strokeDashoffset: "0"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black text-black">{progressPercent}%</span>
                </div>
              </div>

              {/* Stats */}
              <div>
                <div className="text-3xl md:text-4xl font-black text-black mb-1">
                  {unlockedCount}<span className="text-gray-300">/{abilities.length}</span>
                </div>
                <p className="text-gray-500 text-sm md:text-base mb-3">Abilities Unlocked</p>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Next:</span>
                  <span className="font-bold text-black flex items-center gap-1">
                    {abilities.find(a => !a.unlocked)?.name || 'All Complete'}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Abilities;
