'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  logs: string[];
  title?: string;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ 
  logs, 
  title = "AGENT ACTIVITY LOG",
  className = "" 
}) => {
  const [displayLogs, setDisplayLogs] = useState<string[]>([]);

  useEffect(() => {
    setDisplayLogs(logs.slice(-6)); // Show last 6 logs
  }, [logs]);

  return (
    <div className={`bg-black/95 backdrop-blur-sm border border-[#00FF00]/30 font-mono ${className}`}>
      {/* Terminal header */}
      <div className="border-b border-[#00FF00]/30 px-4 py-2 bg-[#00FF00]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF3355]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
            <div className="w-3 h-3 rounded-full bg-[#00FF00]"></div>
          </div>
          <div className="text-[#00FF00] text-xs">
            {title}
          </div>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4">
        <div className="text-[#00FF00] mb-2 text-xs">
          ┌─ {title} ─────────────────────────────────────────┐
        </div>
        
        <div className="h-32 overflow-hidden">
          <AnimatePresence>
            {displayLogs.map((log, index) => {
              // Remove emojis from the log text
              const cleanLog = log.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F018}-\u{1F0FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FB00}-\u{1FBFF}]|[\u{1FC00}-\u{1FCFF}]|[\u{1FD00}-\u{1FDFF}]|[\u{1FE00}-\u{1FEFF}]|[\u{1FF00}-\u{1FFFF}]/gu, '');
              
              return (
                <motion.div
                  key={`${log}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#00FF00] text-xs mb-1 font-mono"
                >
                  {cleanLog}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="text-[#00FF00] text-xs">
          └──────────────────────────────────────────────────┘
        </div>
        
        {/* Blinking cursor */}
        <div className="flex items-center mt-2">
          <span className="text-[#00FF00] text-xs mr-1">$</span>
          <div className="w-2 h-4 bg-[#00FF00] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;