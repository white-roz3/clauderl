'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

const Courses: React.FC = () => {
  const courses = [
    {
      id: 'soccer',
      name: 'Soccer',
      description: 'Team coordination and ball control.',
      difficulty: 'Hard',
    },
    {
      id: 'ball3d',
      name: '3D Ball',
      description: 'Balance and precision physics.',
      difficulty: 'Medium',
    },
    {
      id: 'obstacle',
      name: 'Dungeon Escape',
      description: 'Navigate corridors and obstacles.',
      difficulty: 'Hard',
    },
    {
      id: 'wallclimb',
      name: 'Wall Climb',
      description: 'Vertical movement challenges.',
      difficulty: 'Expert',
    }
  ];

  const getThumbnailPath = (courseId: string): string | null => {
    const thumbnailMap: Record<string, string | null> = {
      'soccer': '/thumbs/soccer.png',
      'ball3d': '/thumbs/3dball.png',
      'obstacle': '/thumbs/dungeon.png',
      'wallclimb': '/thumbs/wallclimb.png',
    };
    return thumbnailMap[courseId] || null;
  };

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p variants={staggerItem} className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
            Training Environments
          </motion.p>
          <motion.h2 
            variants={staggerItem}
            className="text-3xl md:text-5xl lg:text-7xl font-black text-black mb-4 md:mb-6"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
            }}
          >
            Courses
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-base md:text-xl text-gray-500 max-w-xs md:max-w-2xl mx-auto"
          >
            Each course tests different aspects of AI intelligence
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={staggerItem}
              className="group"
            >
              <Link href={`/livesim?course=${course.id}`}>
                <motion.div 
                  className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 h-full"
                  whileHover={{ 
                    y: -12,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    boxShadow: '0 15px 40px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Image */}
                  <div className="relative h-28 md:h-48 overflow-hidden">
                    <div className="absolute inset-1 md:inset-2 rounded-xl md:rounded-2xl overflow-hidden">
                      <Image 
                        src={getThumbnailPath(course.id)!}
                        alt={`${course.name} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Difficulty badge */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                      <span 
                        className="px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-white text-black"
                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-7">
                    <h3 className="text-sm md:text-xl font-bold text-black mb-1 md:mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {course.name}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-xs md:text-base mb-2 md:mb-5 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-1 text-black font-bold text-xs md:text-base group-hover:translate-x-2 transition-transform">
                      <span>Launch</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-8 md:mt-16"
        >
          <Link href="/sims">
            <motion.button 
              className="px-8 md:px-12 py-3.5 md:py-5 bg-black text-white font-bold text-base md:text-lg rounded-2xl"
              whileHover={{ y: -6, boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}
            >
              Explore All Courses
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
