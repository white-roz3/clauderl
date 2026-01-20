'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Target, TrendingUp, Zap, Tag, Settings, ArrowRight } from 'lucide-react';
import { SimCatalogItem, CourseId } from '@/data/sims';
import StatusBadge from '@/components/ui/StatusBadge';

interface SimulationDetailProps {
  sim: SimCatalogItem;
  mockMetrics?: Record<string, number> | null;
}

const SimulationDetail: React.FC<SimulationDetailProps> = ({ sim, mockMetrics }) => {
  const defaultMetrics = {
    time_ms: Math.floor(Math.random() * 100000) + 10000,
    success_rate: Math.random() * 0.8 + 0.2,
    attempts: Math.floor(Math.random() * 50) + 10
  };

  const metrics = mockMetrics || defaultMetrics;

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

  const isAvailable = sim.status === 'prototype' || sim.status === 'available';

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <motion.div 
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
      >
        {/* Hero Image */}
        <div className="relative w-full bg-gray-100" style={{ aspectRatio: '21/9' }}>
          {getThumbnailPath(sim.id) ? (
            <Image 
              src={getThumbnailPath(sim.id)!}
              alt={`${sim.name} thumbnail`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl" />
            </div>
          )}
          <div className="absolute top-6 left-6">
            <StatusBadge status={sim.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h1 
            className="text-3xl md:text-4xl font-black text-black mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {sim.name}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {sim.synopsis}
          </p>

          {/* Launch Button */}
          {isAvailable && (
            <Link href={`/livesim?course=${sim.id}`}>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-xl"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              >
                <Play className="w-5 h-5" />
                Launch Simulation
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div 
            className="text-2xl font-black text-black mb-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {(metrics.time_ms / 1000).toFixed(1)}s
          </div>
          <div className="text-sm text-gray-500">Average Time</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div 
            className="text-2xl font-black text-black mb-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {(metrics.success_rate * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-gray-500">Success Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div 
            className="text-2xl font-black text-black mb-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {metrics.attempts}
          </div>
          <div className="text-sm text-gray-500">Total Attempts</div>
        </motion.div>
      </div>

      {/* Skills and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-gray-100 rounded-2xl p-6"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </div>
            <h3 
              className="text-lg font-bold text-black"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Required Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sim.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-100 rounded-2xl p-6"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </div>
            <h3 
              className="text-lg font-bold text-black"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Difficulty Levels
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sim.difficulty.map((diff) => (
              <span
                key={diff}
                className="px-3 py-2 bg-black text-white text-sm font-medium rounded-lg"
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Evolution Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white border border-gray-100 rounded-2xl p-6"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
          </div>
          <h3 
            className="text-lg font-bold text-black"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Evolution Rewards
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Abilities and capabilities that AI agents may unlock through this simulation
        </p>
        <div className="flex flex-wrap gap-2">
          {sim.evolutionRewards.map((reward) => (
            <span
              key={reward}
              className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200"
            >
              {reward}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tags */}
      {sim.tags && sim.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl p-6"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </div>
            <h3 
              className="text-lg font-bold text-black"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Tags
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sim.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white border border-gray-100 rounded-2xl p-6"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
          </div>
          <h3 
            className="text-lg font-bold text-black"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Integration Status
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Unity Build', status: sim.status === 'available' ? 'Ready' : 'Pending' },
            { label: 'WebGL Export', status: sim.status === 'available' ? 'Complete' : 'Queued' },
            { label: 'API Integration', status: sim.status === 'available' ? 'Active' : 'Planned' }
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'Ready' || item.status === 'Complete' || item.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SimulationDetail;
