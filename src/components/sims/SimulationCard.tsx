'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SimCatalogItem, CourseId } from '@/data/sims';
import StatusBadge from '@/components/ui/StatusBadge';

interface SimulationCardProps {
  sim: SimCatalogItem;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ sim }) => {
  const isClickable = sim.status === 'prototype' || sim.status === 'available';

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
  
  const CardContent = () => (
    <motion.div 
      className="bg-white border border-gray-100 rounded-2xl p-0 h-full overflow-hidden"
      whileHover={isClickable ? { y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.12)' } : {}}
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
    >
      {/* Thumbnail */}
      <div className="relative">
        {(() => {
          const thumbnailPath = getThumbnailPath(sim.id);
          return thumbnailPath ? (
            <div className="relative w-full bg-gray-100" style={{ aspectRatio: '16/9' }}>
              <Image 
                src={thumbnailPath}
                alt={`${sim.name} thumbnail`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Status badge overlay */}
              <div className="absolute top-4 left-4">
                <StatusBadge status={sim.status} />
              </div>
            </div>
          ) : (
            <div className="p-8 bg-gray-50 text-center relative" style={{ aspectRatio: '16/9' }}>
              <div className="absolute top-4 left-4">
                <StatusBadge status={sim.status} />
              </div>
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 
          className="text-xl font-bold text-black mb-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {sim.name}
        </h3>

        {/* Synopsis */}
        <p className="text-gray-500 mb-5 text-sm leading-relaxed line-clamp-2">
          {sim.synopsis}
        </p>

        {/* Skills */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {sim.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg border border-gray-200"
              >
                {skill}
              </span>
            ))}
            {sim.skills.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg border border-gray-200">
                +{sim.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-5">
          <div className="flex gap-2">
            {sim.difficulty.map((diff) => (
              <span
                key={diff}
                className="px-3 py-1.5 bg-black/5 text-gray-700 text-xs font-medium rounded-lg"
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.button 
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isClickable 
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!isClickable}
          whileHover={isClickable ? { scale: 1.02 } : {}}
          whileTap={isClickable ? { scale: 0.98 } : {}}
          style={{ boxShadow: isClickable ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }}
        >
          {isClickable ? (
            <>
              View Details
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            'Coming Soon'
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  if (isClickable) {
    return (
      <Link href={`/sims/${sim.id}`} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="h-full opacity-75">
      <CardContent />
    </div>
  );
};

export default SimulationCard;
