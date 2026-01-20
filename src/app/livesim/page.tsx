'use client';

import HeroViewport from '@/components/3d/HeroViewport';
import Scoreboard from '@/components/Scoreboard';
import WebGLIframe from '@/components/ui/WebGLIframe';
import { CourseId, SIM_CATALOG, SimCatalogItem } from '@/data/sims';
import { Ball3DChatMessage } from '@/lib/3dball-ai-service';
import { BasicChatMessage } from '@/lib/basic-ai-service';
import { AI_MODELS } from '@/lib/constants';
import { CrawlerChatMessage } from '@/lib/crawler-ai-service';
import { DungeonChatMessage } from '@/lib/dungeon-ai-service';
import { FoodCollectorChatMessage } from '@/lib/foodcollector-ai-service';
import { GridWorldChatMessage } from '@/lib/gridworld-ai-service';
import { HallwayChatMessage } from '@/lib/hallway-ai-service';
import { PatternsChatMessage } from '@/lib/patterns-ai-service';
import { PushBlockChatMessage } from '@/lib/pushblock-ai-service';
import { PyramidsChatMessage } from '@/lib/pyramids-ai-service';
import { SoccerChatMessage } from '@/lib/soccer-ai-service';
import { SorterChatMessage } from '@/lib/sorter-ai-service';
import { WalkerChatMessage } from '@/lib/walker-ai-service';
import { WallclimbChatMessage } from '@/lib/wallclimb-ai-service';
import { WormChatMessage } from '@/lib/worm-ai-service';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

// 3D Simulation Card Component
interface SimulationCard3DProps {
  course: SimCatalogItem;
  index: number;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: () => void;
  thumbnailPath: string | null;
}

function SimulationCard3D({ course, index, isAvailable, isSelected, onSelect, thumbnailPath }: SimulationCard3DProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isAvailable) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={!isAvailable}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`p-4 text-left rounded-xl group relative overflow-hidden ${
        !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        backgroundColor: isSelected ? 'var(--claude-accent)' : 'var(--claude-bg-tertiary)',
        border: isSelected ? '2px solid var(--claude-accent)' : '1px solid var(--claude-border)',
        boxShadow: isSelected 
          ? '0 20px 40px rgba(194,117,81,0.4), 0 0 0 1px rgba(194,117,81,0.5)'
          : '0 4px 20px rgba(0,0,0,0.2)'
      }}
    >
      <motion.div
        style={{
          rotateX: isAvailable ? rotateX : 0,
          rotateY: isAvailable ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 100%)',
          }}
        />

        <div className="flex justify-between items-start mb-2" style={{ transform: 'translateZ(10px)' }}>
          <h3 className="font-medium text-sm" style={{ color: isSelected ? 'white' : 'var(--claude-text)' }}>
            {course.name}
          </h3>
          {!isAvailable && (
            <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: 'var(--claude-bg-hover)', color: 'var(--claude-text-muted)' }}>Soon</span>
          )}
        </div>

        <div className="mb-3" style={{ transform: 'translateZ(20px)' }}>
          {thumbnailPath ? (
            <div className="relative w-full rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow" style={{ aspectRatio: '16/9', backgroundColor: 'var(--claude-bg)' }}>
              <Image
                src={thumbnailPath}
                alt={`${course.name} thumbnail`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="w-full rounded-lg flex items-center justify-center" style={{ aspectRatio: '16/9', backgroundColor: 'var(--claude-bg)' }}>
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: 'var(--claude-bg-hover)' }} />
            </div>
          )}
        </div>

        <p className="text-xs mb-3 line-clamp-2" style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--claude-text-secondary)', transform: 'translateZ(5px)' }}>
          {course.synopsis}
        </p>

        <div className="flex flex-wrap gap-1" style={{ transform: 'translateZ(15px)' }}>
          {course.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded-md"
              style={{ 
                backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--claude-bg)', 
                color: isSelected ? 'white' : 'var(--claude-text-muted)' 
              }}
            >
              {skill}
            </span>
          ))}
          {course.skills.length > 2 && (
            <span className="px-2 py-1 text-xs rounded-md" style={{ 
              backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--claude-bg)', 
              color: isSelected ? 'white' : 'var(--claude-text-muted)' 
            }}>
              +{course.skills.length - 2}
            </span>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

function LiveSimContent() {
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState<string[]>([]);
  const [soccerChatLogs, setSoccerChatLogs] = useState<SoccerChatMessage[]>([]);
  const [ball3DChatLogs, setBall3DChatLogs] = useState<Ball3DChatMessage[]>([]);
  const [dungeonChatLogs, setDungeonChatLogs] = useState<DungeonChatMessage[]>([]);
  const [wallclimbChatLogs, setWallclimbChatLogs] = useState<WallclimbChatMessage[]>([]);
  const [pushblockChatLogs, setPushblockChatLogs] = useState<PushBlockChatMessage[]>([]);
  const [pyramidsChatLogs, setPyramidsChatLogs] = useState<PyramidsChatMessage[]>([]);
  const [foodcollectorChatLogs, setFoodcollectorChatLogs] = useState<FoodCollectorChatMessage[]>([]);
  const [hallwayChatLogs, setHallwayChatLogs] = useState<HallwayChatMessage[]>([]);
  const [gridworldChatLogs, setGridworldChatLogs] = useState<GridWorldChatMessage[]>([]);
  const [walkerChatLogs, setWalkerChatLogs] = useState<WalkerChatMessage[]>([]);
  const [crawlerChatLogs, setCrawlerChatLogs] = useState<CrawlerChatMessage[]>([]);
  const [patternsChatLogs, setPatternsChatLogs] = useState<PatternsChatMessage[]>([]);
  const [sorterChatLogs, setSorterChatLogs] = useState<SorterChatMessage[]>([]);
  const [wormChatLogs, setWormChatLogs] = useState<WormChatMessage[]>([]);
  const [basicChatLogs, setBasicChatLogs] = useState<BasicChatMessage[]>([]);

  // Soccer goal announcement state
  const [soccerGoalAnnouncement, setSoccerGoalAnnouncement] = useState<string | null>(null);

  const messageCounterRef = useRef(0);
  const chatMessageCounterRef = useRef(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [soccerChatScrollOffset, setSoccerChatScrollOffset] = useState(0);
  const [ball3DChatScrollOffset, setBall3DChatScrollOffset] = useState(0);
  const [dungeonChatScrollOffset, setDungeonChatScrollOffset] = useState(0);
  const [wallclimbChatScrollOffset, setWallclimbChatScrollOffset] = useState(0);
  const [pushblockChatScrollOffset, setPushblockChatScrollOffset] = useState(0);
  const [pyramidsChatScrollOffset, setPyramidsChatScrollOffset] = useState(0);
  const [foodcollectorChatScrollOffset, setFoodcollectorChatScrollOffset] = useState(0);
  const [hallwayChatScrollOffset, setHallwayChatScrollOffset] = useState(0);
  const [gridworldChatScrollOffset, setGridworldChatScrollOffset] = useState(0);
  const [walkerChatScrollOffset, setWalkerChatScrollOffset] = useState(0);
  const [crawlerChatScrollOffset, setCrawlerChatScrollOffset] = useState(0);
  const [patternsChatScrollOffset, setPatternsChatScrollOffset] = useState(0);
  const [sorterChatScrollOffset, setSorterChatScrollOffset] = useState(0);
  const [wormChatScrollOffset, setWormChatScrollOffset] = useState(0);
  const [basicChatScrollOffset, setBasicChatScrollOffset] = useState(0);
  const soccerChatSessionId = useRef(`soccer_chat_${Date.now()}`);
  const ball3DChatSessionId = useRef(`ball3d_chat_${Date.now()}`);
  const dungeonChatSessionId = useRef(`dungeon_chat_${Date.now()}`);
  const wallclimbChatSessionId = useRef(`wallclimb_chat_${Date.now()}`);
  const pushblockChatSessionId = useRef(`pushblock_chat_${Date.now()}`);
  const pyramidsChatSessionId = useRef(`pyramids_chat_${Date.now()}`);
  const foodcollectorChatSessionId = useRef(`foodcollector_chat_${Date.now()}`);
  const hallwayChatSessionId = useRef(`hallway_chat_${Date.now()}`);
  const gridworldChatSessionId = useRef(`gridworld_chat_${Date.now()}`);
  const walkerChatSessionId = useRef(`walker_chat_${Date.now()}`);
  const crawlerChatSessionId = useRef(`crawler_chat_${Date.now()}`);
  const patternsChatSessionId = useRef(`patterns_chat_${Date.now()}`);
  const sorterChatSessionId = useRef(`sorter_chat_${Date.now()}`);
  const wormChatSessionId = useRef(`worm_chat_${Date.now()}`);
  const basicChatSessionId = useRef(`basic_chat_${Date.now()}`);
  const [isGeneratingSoccerChat, setIsGeneratingSoccerChat] = useState(false);
  const [isGeneratingBall3DChat, setIsGeneratingBall3DChat] = useState(false);
  const [isGeneratingDungeonChat, setIsGeneratingDungeonChat] = useState(false);
  const [isGeneratingWallclimbChat, setIsGeneratingWallclimbChat] = useState(false);
  const [isGeneratingPushblockChat, setIsGeneratingPushblockChat] = useState(false);
  const [isGeneratingPyramidsChat, setIsGeneratingPyramidsChat] = useState(false);
  const [isGeneratingFoodcollectorChat, setIsGeneratingFoodcollectorChat] = useState(false);
  const [isGeneratingHallwayChat, setIsGeneratingHallwayChat] = useState(false);
  const [isGeneratingGridworldChat, setIsGeneratingGridworldChat] = useState(false);
  const [isGeneratingWalkerChat, setIsGeneratingWalkerChat] = useState(false);
  const [isGeneratingCrawlerChat, setIsGeneratingCrawlerChat] = useState(false);
  const [isGeneratingPatternsChat, setIsGeneratingPatternsChat] = useState(false);
  const [isGeneratingSorterChat, setIsGeneratingSorterChat] = useState(false);
  const [isGeneratingWormChat, setIsGeneratingWormChat] = useState(false);
  const [isGeneratingBasicChat, setIsGeneratingBasicChat] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<SimCatalogItem | null>(null);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const continuousChatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [serviceTimeout, setServiceTimeout] = useState(false);
  const serviceStartTimeRef = useRef<number>(Date.now());

  // User-based rate limiting
  const userRateLimitRef = useRef<Map<string, { count: number; resetTime: number }>>(new Map());
  const maxRequestsPerMinute = 16; // Per user

  // Rate limiting function
  const checkRateLimit = useCallback((userId: string): boolean => {
    const now = Date.now();
    const userLimit = userRateLimitRef.current.get(userId);

    if (!userLimit || now > userLimit.resetTime) {
      // Reset or initialize user limit
      userRateLimitRef.current.set(userId, {
        count: 1,
        resetTime: now + 60000 // Reset in 1 minute
      });
      return true;
    }

    if (userLimit.count >= maxRequestsPerMinute) {
      console.log(`Rate limit exceeded for user ${userId}`);
      return false;
    }

    // Increment count
    userLimit.count++;
    return true;
  }, [maxRequestsPerMinute]);

  // Helper function to get thumbnail path for each course
  const getThumbnailPath = (courseId: CourseId): string | null => {
    const thumbnailMap: Record<CourseId, string | null> = {
      'soccer': '/thumbs/soccer.png',
      'ball3d': '/thumbs/3dball.png',
      'obstacle': '/thumbs/dungeon.png',
      'wallclimb': '/thumbs/wallclimb.png',
      'pushblock': '/thumbs/pushblock.png',
      'pyramids': '/thumbs/pyramids.png',
      'food_collector': '/thumbs/foodcollector.png',
      'hallway': '/thumbs/Hallway.png',
      'gridworld': '/thumbs/Gridworld.png',
      'walker': '/thumbs/Walker.png',
      'crawler': '/thumbs/Crawler.png',
      'basic': '/thumbs/basic.png',
      'patterns': '/thumbs/Patterns.png',
      'sorter': '/thumbs/Sorter.png',
      'worm': '/thumbs/worm.png',
    };
    return thumbnailMap[courseId] || null;
  };

  // Handle course selection from URL parameter or localStorage
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      const course = SIM_CATALOG.find(sim => sim.id === courseParam as CourseId);
      if (course) {
        setSelectedCourse(course);
        // Save to localStorage for persistence
        localStorage.setItem('selectedSimulation', courseParam);
      }
    } else {
      // Try to restore from localStorage
      const savedSimulation = localStorage.getItem('selectedSimulation') as CourseId;
      const savedCourse = savedSimulation ? SIM_CATALOG.find(sim => sim.id === savedSimulation) : null;
      setSelectedCourse(savedCourse || SIM_CATALOG.find(sim => sim.id === 'soccer') || null);
    }
  }, [searchParams]);

  // Check for 30-minute service timeout
  useEffect(() => {
    const checkTimeout = () => {
      const elapsed = Date.now() - serviceStartTimeRef.current;
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (elapsed >= thirtyMinutes && !serviceTimeout) {
        console.log('30-minute service timeout reached, stopping all AI services');
        setServiceTimeout(true);

        // Clear any running intervals
        if (continuousChatIntervalRef.current) {
          clearInterval(continuousChatIntervalRef.current);
          continuousChatIntervalRef.current = null;
        }

        // Clear all chat logs
        setSoccerChatLogs([]);
        setBall3DChatLogs([]);
        setDungeonChatLogs([]);
      }
    };

    // Check every minute
    const timeoutCheckInterval = setInterval(checkTimeout, 60000);

    return () => clearInterval(timeoutCheckInterval);
  }, [serviceTimeout]);

  // Function to generate a single soccer chat message
  const generateSoccerChatMessage = useCallback(async () => {
    if (isGeneratingSoccerChat || selectedCourse?.id !== 'soccer' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Soccer chat rate limited');
      return;
    }

    setIsGeneratingSoccerChat(true);
    try {
      console.log('Generating continuous soccer chat message...', { sessionId: soccerChatSessionId.current, logsCount: logs.length });
      const response = await fetch('/api/soccer-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: soccerChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous soccer chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous soccer chat API response data:', data);
        if (data.success && data.messages && data.messages.length > 0) {
          console.log('Successfully received continuous soccer messages:', data.messages.length);
          setSoccerChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setSoccerChatScrollOffset(24);
            } else {
              setSoccerChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous soccer chat API returned no messages or error:', data.error || 'No messages');
          // Show error in chat if it's the first attempt
          setSoccerChatLogs(prev => {
            if (prev.length === 0) {
              return [{
                id: `error_${Date.now()}`,
                agent: 'agent1' as const,
                message: 'Waiting for AI service to initialize...',
                timestamp: new Date(),
                personality: 'analytical' as const
              }];
            }
            return prev;
          });
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.log('Continuous soccer chat API request failed with status:', response.status, errorData);
        // Show error in chat if it's the first attempt
        setSoccerChatLogs(prev => {
          if (prev.length === 0) {
            return [{
              id: `error_${Date.now()}`,
              agent: 'agent1' as const,
              message: 'Chat service temporarily unavailable. Retrying...',
              timestamp: new Date(),
              personality: 'analytical' as const
            }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Failed to generate continuous soccer chat:', error);
      // Show error in chat if it's the first attempt
      setSoccerChatLogs(prev => {
        if (prev.length === 0) {
          return [{
            id: `error_${Date.now()}`,
            agent: 'agent1' as const,
            message: 'Failed to connect to chat service. Please refresh.',
            timestamp: new Date(),
            personality: 'analytical' as const
          }];
        }
        return prev;
      });
    } finally {
      setIsGeneratingSoccerChat(false);
    }
  }, [isGeneratingSoccerChat, selectedCourse?.id, serviceTimeout, checkRateLimit, logs]);

  // Function to generate a single 3D Ball chat message
  const generateBall3DChatMessage = useCallback(async () => {
    if (isGeneratingBall3DChat || selectedCourse?.id !== 'ball3d' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('3D Ball chat rate limited');
      return;
    }

    setIsGeneratingBall3DChat(true);
    try {
      console.log('Generating continuous 3D Ball chat message...');
      const response = await fetch('/api/3dball-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: ball3DChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous 3D Ball chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous 3D Ball chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous 3D Ball messages:', data.messages.length);
          setBall3DChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setBall3DChatScrollOffset(24);
            } else {
              setBall3DChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous 3D Ball chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous 3D Ball chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous 3D Ball chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingBall3DChat(false);
    }
  }, [isGeneratingBall3DChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Dungeon chat message
  const generateDungeonChatMessage = useCallback(async () => {
    if (isGeneratingDungeonChat || selectedCourse?.id !== 'obstacle' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Dungeon chat rate limited');
      return;
    }

    setIsGeneratingDungeonChat(true);
    try {
      console.log('Generating continuous Dungeon chat message...');
      const response = await fetch('/api/dungeon-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: dungeonChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Dungeon chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Dungeon chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Dungeon messages:', data.messages.length);
          setDungeonChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setDungeonChatScrollOffset(24);
            } else {
              setDungeonChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Dungeon chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Dungeon chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Dungeon chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingDungeonChat(false);
    }
  }, [isGeneratingDungeonChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Wallclimb chat message
  const generateWallclimbChatMessage = useCallback(async () => {
    if (isGeneratingWallclimbChat || selectedCourse?.id !== 'wallclimb' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Wallclimb chat rate limited');
      return;
    }

    setIsGeneratingWallclimbChat(true);
    try {
      console.log('Generating continuous Wallclimb chat message...');
      const response = await fetch('/api/wallclimb-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: wallclimbChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Wallclimb chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Wallclimb chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Wallclimb messages:', data.messages.length);
          setWallclimbChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setWallclimbChatScrollOffset(24);
            } else {
              setWallclimbChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Wallclimb chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Wallclimb chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Wallclimb chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingWallclimbChat(false);
    }
  }, [isGeneratingWallclimbChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Push Block chat message
  const generatePushblockChatMessage = useCallback(async () => {
    if (isGeneratingPushblockChat || selectedCourse?.id !== 'pushblock' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Push Block chat rate limited');
      return;
    }

    setIsGeneratingPushblockChat(true);
    try {
      console.log('Generating continuous Push Block chat message...');
      const response = await fetch('/api/pushblock-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: pushblockChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Push Block chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Push Block chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Push Block messages:', data.messages.length);
          setPushblockChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setPushblockChatScrollOffset(24);
            } else {
              setPushblockChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Push Block chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Push Block chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Push Block chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingPushblockChat(false);
    }
  }, [isGeneratingPushblockChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Pyramids chat message
  const generatePyramidsChatMessage = useCallback(async () => {
    if (isGeneratingPyramidsChat || selectedCourse?.id !== 'pyramids' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Pyramids chat rate limited');
      return;
    }

    setIsGeneratingPyramidsChat(true);
    try {
      console.log('Generating continuous Pyramids chat message...');
      const response = await fetch('/api/pyramids-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: pyramidsChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Pyramids chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Pyramids chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Pyramids messages:', data.messages.length);
          setPyramidsChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setPyramidsChatScrollOffset(24);
            } else {
              setPyramidsChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Pyramids chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Pyramids chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Pyramids chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingPyramidsChat(false);
    }
  }, [isGeneratingPyramidsChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Food Collector chat message
  const generateFoodcollectorChatMessage = useCallback(async () => {
    if (isGeneratingFoodcollectorChat || selectedCourse?.id !== 'food_collector' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Food Collector chat rate limited');
      return;
    }

    setIsGeneratingFoodcollectorChat(true);
    try {
      console.log('Generating continuous Food Collector chat message...');
      const response = await fetch('/api/foodcollector-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: foodcollectorChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Food Collector chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Food Collector chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Food Collector messages:', data.messages.length);
          setFoodcollectorChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setFoodcollectorChatScrollOffset(24);
            } else {
              setFoodcollectorChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Food Collector chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Food Collector chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Food Collector chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingFoodcollectorChat(false);
    }
  }, [isGeneratingFoodcollectorChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Hallway chat message
  const generateHallwayChatMessage = useCallback(async () => {
    if (isGeneratingHallwayChat || selectedCourse?.id !== 'hallway' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Hallway chat rate limited');
      return;
    }

    setIsGeneratingHallwayChat(true);
    try {
      console.log('Generating continuous Hallway chat message...');
      const response = await fetch('/api/hallway-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: hallwayChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Hallway chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Hallway chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Hallway messages:', data.messages.length);
          setHallwayChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setHallwayChatScrollOffset(24);
            } else {
              setHallwayChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Hallway chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Hallway chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Hallway chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingHallwayChat(false);
    }
  }, [isGeneratingHallwayChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single GridWorld chat message
  const generateGridworldChatMessage = useCallback(async () => {
    if (isGeneratingGridworldChat || selectedCourse?.id !== 'gridworld' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('GridWorld chat rate limited');
      return;
    }

    setIsGeneratingGridworldChat(true);
    try {
      console.log('Generating continuous GridWorld chat message...');
      const response = await fetch('/api/gridworld-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: gridworldChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous GridWorld chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous GridWorld chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous GridWorld messages:', data.messages.length);
          setGridworldChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setGridworldChatScrollOffset(24);
            } else {
              setGridworldChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous GridWorld chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous GridWorld chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous GridWorld chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingGridworldChat(false);
    }
  }, [isGeneratingGridworldChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Walker chat message
  const generateWalkerChatMessage = useCallback(async () => {
    if (isGeneratingWalkerChat || selectedCourse?.id !== 'walker' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Walker chat rate limited');
      return;
    }

    setIsGeneratingWalkerChat(true);
    try {
      console.log('Generating continuous Walker chat message...');
      const response = await fetch('/api/walker-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: walkerChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Walker chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Walker chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Walker messages:', data.messages.length);
          setWalkerChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setWalkerChatScrollOffset(24);
            } else {
              setWalkerChatScrollOffset(0);
            }

            return sliced;
          });
        } else {
          console.log('Continuous Walker chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Walker chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Walker chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingWalkerChat(false);
    }
  }, [isGeneratingWalkerChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Crawler chat message
  const generateCrawlerChatMessage = useCallback(async () => {
    if (isGeneratingCrawlerChat || selectedCourse?.id !== 'crawler' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Crawler chat rate limited');
      return;
    }

    setIsGeneratingCrawlerChat(true);
    try {
      console.log('Generating continuous Crawler chat message...');
      const response = await fetch('/api/crawler-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: crawlerChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.messages) {
        console.log('Crawler chat messages received:', data.messages.length);

        // Add new messages to the chat logs
        setCrawlerChatLogs(prev => {
          const newLogs = [...prev, ...data.messages];
          // Keep only the last 50 messages to prevent memory issues
          return newLogs.slice(-50);
        });

        // Auto-scroll to bottom
        setTimeout(() => {
          setCrawlerChatScrollOffset(prev => prev + 1);
        }, 100);
      } else {
        console.error('Crawler chat API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to generate Crawler chat message:', error);
      if (error instanceof Error && error.message.includes('timeout')) {
        setServiceTimeout(true);
      }

      // Don't add error message to chat logs
    } finally {
      setIsGeneratingCrawlerChat(false);
    }
  }, [isGeneratingCrawlerChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Patterns chat message
  const generatePatternsChatMessage = useCallback(async () => {
    if (isGeneratingPatternsChat || selectedCourse?.id !== 'patterns' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Patterns chat rate limited');
      return;
    }

    setIsGeneratingPatternsChat(true);
    try {
      console.log('Generating continuous Patterns chat message...');
      const response = await fetch('/api/patterns-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: patternsChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.messages) {
        console.log('Patterns chat messages received:', data.messages.length);

        // Add new messages to the chat logs
        setPatternsChatLogs(prev => {
          const newLogs = [...prev, ...data.messages];
          // Keep only the last 50 messages to prevent memory issues
          return newLogs.slice(-50);
        });

        // Auto-scroll to bottom
        setTimeout(() => {
          setPatternsChatScrollOffset(prev => prev + 1);
        }, 100);
      } else {
        console.error('Patterns chat API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to generate Patterns chat message:', error);
      if (error instanceof Error && error.message.includes('timeout')) {
        setServiceTimeout(true);
      }

      // Don't add error message to chat logs
    } finally {
      setIsGeneratingPatternsChat(false);
    }
  }, [isGeneratingPatternsChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Sorter chat message
  const generateSorterChatMessage = useCallback(async () => {
    if (isGeneratingSorterChat || selectedCourse?.id !== 'sorter' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Sorter chat rate limited');
      return;
    }

    setIsGeneratingSorterChat(true);
    try {
      console.log('Generating continuous Sorter chat message...');
      const response = await fetch('/api/sorter-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sorterChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.messages) {
        console.log('Sorter chat messages received:', data.messages.length);

        // Add new messages to the chat logs
        setSorterChatLogs(prev => {
          const newLogs = [...prev, ...data.messages];
          // Keep only the last 50 messages to prevent memory issues
          return newLogs.slice(-50);
        });

        // Auto-scroll to bottom
        setTimeout(() => {
          setSorterChatScrollOffset(prev => prev + 1);
        }, 100);
      } else {
        console.error('Sorter chat API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to generate Sorter chat message:', error);
      if (error instanceof Error && error.message.includes('timeout')) {
        setServiceTimeout(true);
      }
    } finally {
      setIsGeneratingSorterChat(false);
    }
  }, [isGeneratingSorterChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Worm chat message
  const generateWormChatMessage = useCallback(async () => {
    if (isGeneratingWormChat || selectedCourse?.id !== 'worm' || serviceTimeout) return;

    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Worm chat rate limited');
      return;
    }

    setIsGeneratingWormChat(true);
    try {
      console.log('Generating continuous Worm chat message...');
      const response = await fetch('/api/worm-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: wormChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.messages) {
        console.log('Worm chat messages received:', data.messages.length);

        // Add new messages to the chat logs
        setWormChatLogs(prev => {
          const newLogs = [...prev, ...data.messages];
          // Keep only the last 50 messages to prevent memory issues
          return newLogs.slice(-50);
        });

        // Auto-scroll to bottom
        setTimeout(() => {
          setWormChatScrollOffset(prev => prev + 1);
        }, 100);
      } else {
        console.error('Worm chat API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to generate Worm chat message:', error);
      if (error instanceof Error && error.message.includes('timeout')) {
        setServiceTimeout(true);
      }
    } finally {
      setIsGeneratingWormChat(false);
    }
  }, [isGeneratingWormChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Basic chat message
  const generateBasicChatMessage = useCallback(async () => {
    if (isGeneratingBasicChat || selectedCourse?.id !== 'basic' || serviceTimeout) return;
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Basic chat rate limited');
      return;
    }

    setIsGeneratingBasicChat(true);
    try {
      console.log('Generating Basic chat message...');
      const response = await fetch('/api/basic-ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: basicChatSessionId.current, agentLogs: logs.slice(-10) })
      });

      console.log('Basic chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.messages) {
          console.log('Basic messages received:', data.messages.length);
          setBasicChatLogs(prev => {
            const updated = [...prev, ...data.messages];
            const sliced = updated.slice(-6);
            if (sliced.length > 5) setBasicChatScrollOffset(24); else setBasicChatScrollOffset(0);
            return sliced;
          });
        } else {
          console.log('Basic chat API returned error:', data.error);
        }
      } else {
        console.log('Basic chat API request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Failed to generate Basic chat message:', error);
    } finally {
      setIsGeneratingBasicChat(false);
    }
  }, [isGeneratingBasicChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Clear chat logs when switching away from a simulation and set up new chat
  useEffect(() => {
    // ALWAYS clear any existing interval when switching courses
    if (continuousChatIntervalRef.current) {
      console.log('Clearing existing chat interval...');
      clearInterval(continuousChatIntervalRef.current);
      continuousChatIntervalRef.current = null;
    }

    // Clear all chat logs when switching
    setSoccerChatLogs([]);
    setBall3DChatLogs([]);
    setDungeonChatLogs([]);
    setWallclimbChatLogs([]);
    setPushblockChatLogs([]);
    setPyramidsChatLogs([]);
    setFoodcollectorChatLogs([]);
    setHallwayChatLogs([]);
    setGridworldChatLogs([]);
    setWalkerChatLogs([]);
    setCrawlerChatLogs([]);
    setPatternsChatLogs([]);
    setSorterChatLogs([]);
    setWormChatLogs([]);
    setBasicChatLogs([]);

    // Only start chat for specific simulations (if not timed out)
    if (!serviceTimeout) {
      if (selectedCourse?.id === 'soccer') {
        console.log('Soccer selected, initializing continuous chat...');

        // Generate initial soccer chat message
        generateSoccerChatMessage();

        // Set up continuous soccer chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateSoccerChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'ball3d') {
        console.log('3D Ball selected, initializing continuous chat...');

        // Generate initial 3D Ball chat message
        generateBall3DChatMessage();

        // Set up continuous 3D Ball chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateBall3DChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'obstacle') {
        console.log('Dungeon selected, initializing continuous chat...');

        // Generate initial Dungeon chat message
        generateDungeonChatMessage();

        // Set up continuous Dungeon chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateDungeonChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'wallclimb') {
        console.log('Wallclimb selected, initializing continuous chat...');

        // Generate initial Wallclimb chat message
        generateWallclimbChatMessage();

        // Set up continuous Wallclimb chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateWallclimbChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'pushblock') {
        console.log('Push Block selected, initializing continuous chat...');

        // Generate initial Push Block chat message
        generatePushblockChatMessage();

        // Set up continuous Push Block chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generatePushblockChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'pyramids') {
        console.log('Pyramids selected, initializing continuous chat...');

        // Generate initial Pyramids chat message
        generatePyramidsChatMessage();

        // Set up continuous Pyramids chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generatePyramidsChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'food_collector') {
        console.log('Food Collector selected, initializing continuous chat...');

        // Generate initial Food Collector chat message
        generateFoodcollectorChatMessage();

        // Set up continuous Food Collector chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateFoodcollectorChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'hallway') {
        console.log('Hallway selected, initializing continuous chat...');

        // Generate initial Hallway chat message
        generateHallwayChatMessage();

        // Set up continuous Hallway chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateHallwayChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'gridworld') {
        console.log('GridWorld selected, initializing continuous chat...');

        // Generate initial GridWorld chat message
        generateGridworldChatMessage();

        // Set up continuous GridWorld chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateGridworldChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'walker') {
        console.log('Walker selected, initializing continuous chat...');

        // Generate initial Walker chat message
        generateWalkerChatMessage();

        // Set up continuous Walker chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateWalkerChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'crawler') {
        console.log('Crawler selected, initializing continuous chat...');

        // Generate initial Crawler chat message
        generateCrawlerChatMessage();

        // Set up continuous Crawler chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateCrawlerChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'patterns') {
        console.log('Patterns selected, initializing continuous chat...');

        // Generate initial Patterns chat message
        generatePatternsChatMessage();

        // Set up continuous Patterns chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generatePatternsChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'sorter') {
        console.log('Sorter selected, initializing continuous chat...');

        // Generate initial Sorter chat message
        generateSorterChatMessage();

        // Set up continuous Sorter chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateSorterChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'worm') {
        console.log('Worm selected, initializing continuous chat...');

        // Generate initial Worm chat message
        generateWormChatMessage();

        // Set up continuous Worm chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateWormChatMessage();
        }, 7000);
      } else if (selectedCourse?.id === 'basic') {
        console.log('Basic selected, initializing continuous chat...');

        // Generate initial Basic chat message
        generateBasicChatMessage();

        // Set up continuous Basic chat every 7 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateBasicChatMessage();
        }, 7000);
      } else {
        console.log('No chat-enabled simulation selected, stopping all chat services');
      }
    } else {
      console.log('Service timeout active, not starting chat services');
    }
  }, [selectedCourse?.id, serviceTimeout]);

  // Cleanup: Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (continuousChatIntervalRef.current) {
        clearInterval(continuousChatIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Handle Unity log messages from iframe
    function handleUnityMessage(event: MessageEvent) {
      // Check if message is from Unity iframe
      if (event.origin !== window.location.origin) return;

      // Top-level emoji filter - clean all incoming messages
      const emojiFilter = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F018}-\u{1F0FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FB00}-\u{1FBFF}]|[\u{1FC00}-\u{1FCFF}]|[\u{1FD00}-\u{1FDFF}]|[\u{1FE00}-\u{1FEFF}]|[\u{1FF00}-\u{1FFFF}]/gu;

      let cleanedData = event.data;
      if (event.data && typeof event.data === 'string') {
        cleanedData = event.data.replace(emojiFilter, '');
      } else if (event.data && event.data.text && typeof event.data.text === 'string') {
        cleanedData = {
          ...event.data,
          text: event.data.text.replace(emojiFilter, '')
        };
      }

      // Increment message counters
      messageCounterRef.current += 1;
      chatMessageCounterRef.current += 1;

      // Only display every 100th message for agent log
      if (messageCounterRef.current % 100 === 0) {
        // Handle different types of Unity messages
        if (cleanedData?.type === "unity-log") {
          setLogs(prev => {
            // Text is already cleaned by top-level filter
            const newLog = `> agent: ${cleanedData.text}`;
            const updated = [...prev, newLog];
            const sliced = updated.slice(-6); // Keep only last 6 logs

            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              // When we have 6 logs, scroll up by 24px to show the newest 5
              setScrollOffset(24);
            } else {
              // When we have 5 or fewer logs, no scroll needed
              setScrollOffset(0);
            }

            return sliced;
          });
        } else if (cleanedData && typeof cleanedData === 'string') {
          // Handle direct Unity console messages
          if (cleanedData.includes('Unity') || cleanedData.includes('3DBall') || cleanedData.includes('dungeon') || cleanedData.includes('loading')) {
            setLogs(prev => {
              // Data is already cleaned by top-level filter
              const newLog = `> agent: ${cleanedData}`;
              const updated = [...prev, newLog];
              const sliced = updated.slice(-6);

              // Update scroll offset based on number of logs
              if (sliced.length > 5) {
                // When we have 6 logs, scroll up by 24px to show the newest 5
                setScrollOffset(24);
              } else {
                // When we have 5 or fewer logs, no scroll needed
                setScrollOffset(0);
              }

              return sliced;
            });
          }
        }
      }

      // Note: Chat generation is now handled by continuous interval, not Unity messages
    }

    window.addEventListener("message", handleUnityMessage);

    // Fallback: Add initial system message if no Unity logs received
    const fallbackTimer = setTimeout(() => {
      setLogs(prev => {
        if (prev.length === 0) {
          return ['> system: waiting for simulation logs...'];
        }
        return prev;
      });
    }, 2000);

    return () => {
      window.removeEventListener("message", handleUnityMessage);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--claude-bg)' }}>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--claude-text-muted)' }}>
              Live Arena
            </p>
            <h1 
              className="text-4xl md:text-6xl font-normal mb-3"
              style={{ 
                fontFamily: "'Tiempos Headline', Georgia, serif",
                color: 'var(--claude-text-greeting)',
                letterSpacing: '-0.02em'
              }}
            >
              Live Match
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--claude-text-secondary)' }}>
              Watch frontier models compete in real-time
            </p>
          </motion.div>

          {/* Unified Simulation Viewport */}
          <div className="mb-8">
            <motion.div 
              className="rounded-none sm:rounded-2xl p-2 sm:p-4 md:p-6 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ 
                backgroundColor: 'var(--claude-bg-secondary)',
                border: '1px solid var(--claude-border)'
              }}
            >
              {/* Current Course Title */}
              <div className="mb-3 sm:mb-4 flex items-center justify-between px-1 sm:px-0">
                <h2 
                  className="text-lg sm:text-xl md:text-2xl font-medium"
                  style={{ color: 'var(--claude-text)' }}
                >
                  {selectedCourse ? selectedCourse.name : 'Select a Simulation'}
                </h2>
                {selectedCourse && (
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full" style={{ backgroundColor: 'var(--claude-accent)', color: 'white' }}>
                    Running
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* WebGL Simulation */}
                <div className="lg:col-span-2 -mx-2 sm:mx-0">
                  {selectedCourse?.id === 'soccer' ? (
                    <WebGLIframe
                      src="/Scenes/soccer/index.html"
                      title="Soccer Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Soccer simulation loaded successfully')}
                      onError={() => console.error('Soccer simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'ball3d' ? (
                    <WebGLIframe
                      src="/Scenes/3dball/index.html"
                      title="3D Ball Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('3D Ball simulation loaded successfully')}
                      onError={() => console.error('3D Ball simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'obstacle' ? (
                    <WebGLIframe
                      src="/Scenes/dungeon/index.html"
                      title="Dungeon Escape Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Dungeon Escape simulation loaded successfully')}
                      onError={() => console.error('Dungeon Escape simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'wallclimb' ? (
                    <WebGLIframe
                      src="/Scenes/Wallclimb/index.html"
                      title="Climbing Wall Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Climbing Wall simulation loaded successfully')}
                      onError={() => console.error('Climbing Wall simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'pushblock' ? (
                    <WebGLIframe
                      src="/Scenes/PushBlock/index.html"
                      title="Push Block Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Push Block simulation loaded successfully')}
                      onError={() => console.error('Push Block simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'pyramids' ? (
                    <WebGLIframe
                      src="/Scenes/Pyramids/index.html"
                      title="Pyramids Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Pyramids simulation loaded successfully')}
                      onError={() => console.error('Pyramids simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'food_collector' ? (
                    <WebGLIframe
                      src="/Scenes/FoodCollection/index.html"
                      title="Food Collector Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Food Collector simulation loaded successfully')}
                      onError={() => console.error('Food Collector simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'hallway' ? (
                    <WebGLIframe
                      src="/Scenes/Hallway/index.html"
                      title="Hallway Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Hallway simulation loaded successfully')}
                      onError={() => console.error('Hallway simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'gridworld' ? (
                    <WebGLIframe
                      src="/Scenes/GridWorld/index.html"
                      title="GridWorld Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('GridWorld simulation loaded successfully')}
                      onError={() => console.error('GridWorld simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'walker' ? (
                    <WebGLIframe
                      src="/Scenes/Walker/index.html"
                      title="Walker Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Walker simulation loaded successfully')}
                      onError={() => console.error('Walker simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'crawler' ? (
                    <WebGLIframe
                      src="/Scenes/Crawler/index.html"
                      title="Crawler Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Crawler simulation loaded successfully')}
                      onError={() => console.error('Crawler simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'patterns' ? (
                    <WebGLIframe
                      src="/Scenes/Patterns/index.html"
                      title="Patterns Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Patterns simulation loaded successfully')}
                      onError={() => console.error('Patterns simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'sorter' ? (
                    <WebGLIframe
                      src="/Scenes/Sorter/index.html"
                      title="Sorter Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Sorter simulation loaded successfully')}
                      onError={() => console.error('Sorter simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'worm' ? (
                    <WebGLIframe
                      src="/Scenes/Worm/index.html"
                      title="Worm Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Worm simulation loaded successfully')}
                      onError={() => console.error('Worm simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'basic' ? (
                    <WebGLIframe
                      src="/Scenes/Basic/index.html"
                      title="Basic Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Basic simulation loaded successfully')}
                      onError={() => console.error('Basic simulation failed to load - check console for details')}
                    />
                  ) : (
                    <div className="h-96">
                      <HeroViewport
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                      />
                    </div>
                  )}
                </div>

                {/* Terminal Log Feed */}
                <div className="lg:col-span-1">
                  {(selectedCourse?.id === 'soccer' || selectedCourse?.id === 'ball3d' || selectedCourse?.id === 'obstacle' || selectedCourse?.id === 'wallclimb' || selectedCourse?.id === 'pushblock' || selectedCourse?.id === 'pyramids' || selectedCourse?.id === 'food_collector' || selectedCourse?.id === 'hallway' || selectedCourse?.id === 'gridworld' || selectedCourse?.id === 'walker' || selectedCourse?.id === 'crawler' || selectedCourse?.id === 'patterns' || selectedCourse?.id === 'sorter' || selectedCourse?.id === 'worm' || selectedCourse?.id === 'basic') ? (
                    // Simulations with chat: Scoreboard + Unity Agent Log + Agents Chat
                    <div className="space-y-4">
                      {/* Unity Agent Log */}
                      <div className="rounded-xl font-mono w-full overflow-hidden" style={{ aspectRatio: '16/6', backgroundColor: 'var(--claude-bg-tertiary)', border: '1px solid var(--claude-border)' }}>
                        {/* Panel header */}
                        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--claude-border)', backgroundColor: 'var(--claude-bg-secondary)' }}>
                          <h3 className="text-sm font-semibold" style={{ color: 'var(--claude-text)' }}>
                            Agent Log
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs" style={{ color: 'var(--claude-text-muted)' }}>Live</span>
                          </div>
                        </div>

                        {/* Terminal content */}
                        <div className="p-4 h-full flex flex-col" style={{ backgroundColor: '#1a1a18' }}>
                          <div className="flex-1 overflow-hidden relative min-h-0">
                            <motion.div
                              className="space-y-1 h-full"
                              animate={{ y: -scrollOffset }}
                              transition={{
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                            >
                              {logs.map((log, index) => {
                                const isNewest = index === logs.length - 1;

                                // Remove emojis from the log text
                                const cleanLog = log.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F018}-\u{1F0FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FB00}-\u{1FBFF}]|[\u{1FC00}-\u{1FCFF}]|[\u{1FD00}-\u{1FDFF}]|[\u{1FE00}-\u{1FEFF}]|[\u{1FF00}-\u{1FFFF}]/gu, '');

                                return (
                                  <motion.div
                                    key={`${log}-${index}`}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-green-400 text-xs font-mono break-words overflow-hidden"
                                    style={{
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {cleanLog}
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </div>

                          {/* Blinking cursor */}
                          <div className="flex items-center mt-2 flex-shrink-0">
                            <div className="text-xs font-mono" style={{ color: 'var(--claude-text-muted)' }}>
                              {selectedCourse?.name || 'simulation'}$
                            </div>
                            <motion.div
                              className="w-1.5 h-3 bg-green-400 ml-1"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Soccer Scoreboard */}
                      {selectedCourse?.id === 'soccer' && (
                        <div className="rounded-xl font-mono w-full overflow-hidden" style={{ aspectRatio: '16/4.5', backgroundColor: 'var(--claude-bg-secondary)', border: '1px solid var(--claude-border)' }}>
                          {/* Scoreboard header */}
                          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--claude-border)', backgroundColor: 'var(--claude-bg-tertiary)' }}>
                            <h3 className="text-sm font-semibold" style={{ color: 'var(--claude-text)' }}>
                              Scoreboard
                            </h3>
                            <span className="text-xs" style={{ color: 'var(--claude-text-muted)' }}>
                              {soccerGoalAnnouncement || "Match in progress"}
                            </span>
                          </div>

                          {/* Scoreboard content */}
                          <div className="p-4 h-full flex items-center justify-center">
                            <Scoreboard onGoalScored={setSoccerGoalAnnouncement} />
                          </div>
                        </div>
                      )}

                      {/* Agents Chat Log */}
                      <div className="rounded-xl font-mono w-full overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: 'var(--claude-bg-tertiary)', border: '1px solid var(--claude-border)' }}>
                        {/* Panel header */}
                        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--claude-border)', backgroundColor: 'var(--claude-bg-secondary)' }}>
                          <h3 className="text-sm font-semibold" style={{ color: 'var(--claude-text)' }}>
                            Agent Chat
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--claude-accent)' }}></div>
                            <span className="text-xs" style={{ color: 'var(--claude-text-muted)' }}>Active</span>
                          </div>
                        </div>

                        {/* Chat content */}
                        <div className="p-4 h-full flex flex-col" style={{ backgroundColor: '#1a1a18' }}>

                          {serviceTimeout && (
                            <div className="flex-1 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-red-400 text-sm font-mono mb-2">
                                  Service Timeout
                                </div>
                                <div className="text-xs font-mono" style={{ color: 'var(--claude-text-muted)' }}>
                                  Reload to continue to see logs
                                </div>
                              </div>
                            </div>
                          )}

                          {!serviceTimeout && (
                            <div className="flex-1 overflow-hidden relative min-h-0">
                              <motion.div
                                className="space-y-1 h-full"
                                animate={{
                                  y: selectedCourse?.id === 'soccer' ? -soccerChatScrollOffset :
                                    selectedCourse?.id === 'ball3d' ? -ball3DChatScrollOffset :
                                      selectedCourse?.id === 'basic' ? -basicChatScrollOffset :
                                        -dungeonChatScrollOffset
                                }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeOut"
                                }}
                              >
                                {selectedCourse?.id === 'basic' && basicChatLogs.map((log, index) => {
                                  const isNewest = index === basicChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]';

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> GEMINI: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'soccer' && (
                                  soccerChatLogs.length === 0 ? (
                                    <div className="text-xs font-mono" style={{ color: 'var(--claude-text-muted)' }}>
                                      {isGeneratingSoccerChat ? '> system: generating agent chat...' : '> system: waiting for agent chat...'}
                                    </div>
                                  ) : (
                                    soccerChatLogs.map((log, index) => {
                                      const isNewest = index === soccerChatLogs.length - 1;
                                      const isGROK = log.agent === 'agent2';
                                      const textColor = isGROK ? 'text-[#8B5CF6]' : 'text-[#0066CC]'; // Purple for GROK, Blue for ChatGPT

                                      return (
                                        <motion.div
                                          key={log.id}
                                          initial={isNewest ? { opacity: 0, y: 20 } : false}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.3, ease: "easeOut" }}
                                          className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                          style={{
                                            wordBreak: 'break-word',
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: '1.5'
                                          }}
                                        >
                                          {`> ${log.agent === 'agent1' ? 'Opus 4.5' : 'GPT-5'}: ${log.message}`}
                                        </motion.div>
                                      );
                                    })
                                  )
                                )}
                                {selectedCourse?.id === 'ball3d' && ball3DChatLogs.map((log, index) => {
                                  const isNewest = index === ball3DChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for Claude (solo agent)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> Claude: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'obstacle' && dungeonChatLogs.map((log, index) => {
                                  const isNewest = index === dungeonChatLogs.length - 1;
                                  const isGROK = log.agent === 'agent1';
                                  const isGemini = log.agent === 'agent2';
                                  const isChatGPT = log.agent === 'agent3';
                                  const textColor = isGROK ? 'text-[#8B5CF6]' : isGemini ? 'text-[#EAB308]' : 'text-[#0066CC]'; // Purple for GROK, Yellow for Gemini, Blue for ChatGPT

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ${log.agent === 'agent1' ? 'GROK' : log.agent === 'agent2' ? 'Gemini' : 'ChatGPT'}: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'wallclimb' && wallclimbChatLogs.map((log, index) => {
                                  const isNewest = index === wallclimbChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for Claude (solo climber)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> Claude: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'pushblock' && pushblockChatLogs.map((log, index) => {
                                  const isNewest = index === pushblockChatLogs.length - 1;
                                  const isGROK = log.agent === 'agent1';
                                  const isChatGPT = log.agent === 'agent2';
                                  const isGemini = log.agent === 'agent3';
                                  const textColor = isGROK ? 'text-[#8B5CF6]' : isChatGPT ? 'text-[#0066CC]' : 'text-[#EAB308]'; // Purple for GROK, Blue for ChatGPT, Yellow for Gemini

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ${log.agent === 'agent1' ? 'GROK' : log.agent === 'agent2' ? 'ChatGPT' : 'Gemini'}: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'pyramids' && pyramidsChatLogs.map((log, index) => {
                                  const isNewest = index === pyramidsChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for Claude (solo explorer)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> Claude: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'food_collector' && foodcollectorChatLogs.map((log, index) => {
                                  const isNewest = index === foodcollectorChatLogs.length - 1;
                                  const isChatGPT1 = log.agent === 'agent1';
                                  const isChatGPT2 = log.agent === 'agent2';
                                  const isGROK = log.agent === 'agent3';
                                  const isGemini = log.agent === 'agent4';
                                  const isClaude = log.agent === 'agent5';
                                  const textColor = isChatGPT1 ? 'text-[#0066CC]' : isChatGPT2 ? 'text-[#1E40AF]' : isGROK ? 'text-[#8B5CF6]' : isGemini ? 'text-[#EAB308]' : 'text-[#10B981]'; // Blue variants for ChatGPT, Purple for GROK, Yellow for Gemini, Green for Claude

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ${log.agent === 'agent1' ? 'ChatGPT1' : log.agent === 'agent2' ? 'ChatGPT2' : log.agent === 'agent3' ? 'GROK' : log.agent === 'agent4' ? 'Gemini' : 'Claude'}: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'hallway' && hallwayChatLogs.map((log, index) => {
                                  const isNewest = index === hallwayChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for ChatGPT (solo memory worker)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ChatGPT: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'gridworld' && gridworldChatLogs.map((log, index) => {
                                  const isNewest = index === gridworldChatLogs.length - 1;
                                  const isChatGPT = log.agent === 'agent1';
                                  const isClaude = log.agent === 'agent2';
                                  const isGROK = log.agent === 'agent3';
                                  const textColor = isChatGPT ? 'text-[#0066CC]' : isClaude ? 'text-[#10B981]' : 'text-[#8B5CF6]'; // Blue for ChatGPT, Green for Claude, Purple for GROK

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ${log.agent === 'agent1' ? 'ChatGPT' : log.agent === 'agent2' ? 'Claude' : 'GROK'}: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'walker' && walkerChatLogs.map((log, index) => {
                                  const isNewest = index === walkerChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for ChatGPT (solo walker)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> ChatGPT: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'crawler' && crawlerChatLogs.map((log, index) => {
                                  const isNewest = index === crawlerChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for GEMINI (solo crawler)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> GEMINI: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'patterns' && patternsChatLogs.map((log, index) => {
                                  const isNewest = index === patternsChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for GEMINI (solo patterns)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> GEMINI: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'sorter' && sorterChatLogs.map((log, index) => {
                                  const isNewest = index === sorterChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for GEMINI (solo sorter)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> GEMINI: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                                {selectedCourse?.id === 'worm' && wormChatLogs.map((log, index) => {
                                  const isNewest = index === wormChatLogs.length - 1;
                                  const textColor = 'text-[#0066CC]'; // Blue for Claude (solo worm)

                                  return (
                                    <motion.div
                                      key={log.id}
                                      initial={isNewest ? { opacity: 0, y: 20 } : false}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                      style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                      }}
                                    >
                                      {`> CLAUDE: ${log.message}`}
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            </div>
                          )}

                          {/* Blinking cursor */}
                          <div className="flex items-center mt-2 flex-shrink-0">
                            <span className="text-xs mr-1" style={{ color: 'var(--claude-text-muted)' }}>chat$</span>
                            <div className="w-1.5 h-3 animate-pulse" style={{ backgroundColor: 'var(--claude-accent)' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Other simulations: No panels
                    <div className="flex justify-center items-center">
                      <div className="text-center" style={{ color: 'var(--claude-text-muted)' }}>
                        <div className="text-lg font-mono mb-2">No additional panels</div>
                        <div className="text-sm">Simulation running in viewport</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Course Selector */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--claude-bg-secondary)', border: '1px solid var(--claude-border)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-medium"
                  style={{ color: 'var(--claude-text)' }}
                >
                  Select Simulation
                </h2>
                <span className="text-sm" style={{ color: 'var(--claude-text-muted)' }}>
                  {SIM_CATALOG.filter(s => s.status === 'prototype' || s.status === 'available').length} available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ perspective: '1000px' }}>
                {SIM_CATALOG.map((course, index) => {
                  const isAvailable = course.status === 'prototype' || course.status === 'available';
                  const isSelected = selectedCourse?.id === course.id;

                  return (
                    <SimulationCard3D
                      key={course.id}
                      course={course}
                      index={index}
                      isAvailable={isAvailable}
                      isSelected={isSelected}
                      onSelect={() => {
                        if (isAvailable) {
                          setSelectedCourse(course);
                          localStorage.setItem('selectedSimulation', course.id);
                        }
                      }}
                      thumbnailPath={getThumbnailPath(course.id)}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

export default function LiveSimPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--claude-bg)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--claude-border)', borderTopColor: 'var(--claude-accent)' }} />
          <p className="font-medium" style={{ color: 'var(--claude-text-secondary)' }}>
            Loading simulation...
          </p>
        </div>
      </div>
    }>
      <LiveSimContent />
    </Suspense>
  );
}