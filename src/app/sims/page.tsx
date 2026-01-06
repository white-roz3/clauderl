'use client';

import SimulationCard from '@/components/sims/SimulationCard';
import SimulationFilters from '@/components/sims/SimulationFilters';
import { SIM_CATALOG, SimCatalogItem } from '@/data/sims';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Layers, CheckCircle, Clock, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SimulationsPage: React.FC = () => {
  const [filteredSims, setFilteredSims] = useState<SimCatalogItem[]>(SIM_CATALOG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Loading simulations...
          </p>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { 
      icon: Layers, 
      value: SIM_CATALOG.length, 
      label: 'Total Simulations',
      color: 'bg-black'
    },
    { 
      icon: Zap, 
      value: SIM_CATALOG.filter(sim => sim.status === 'prototype').length, 
      label: 'Prototypes',
      color: 'bg-gray-800'
    },
    { 
      icon: Clock, 
      value: SIM_CATALOG.filter(sim => sim.status === 'coming_soon').length, 
      label: 'Coming Soon',
      color: 'bg-gray-600'
    },
    { 
      icon: CheckCircle, 
      value: SIM_CATALOG.filter(sim => sim.status === 'available').length, 
      label: 'Available',
      color: 'bg-gray-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p 
              variants={staggerItem} 
              className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4"
            >
              Environment Catalog
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: '2px 2px 0 #e5e5e5, 3px 3px 8px rgba(0,0,0,0.08)'
              }}
            >
              Simulations
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              A catalog of 3D environments where AI models compete and evolve.
              Watch them learn, adapt, and master each challenge.
            </motion.p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-3xl font-black text-black mb-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters */}
          <SimulationFilters
            sims={SIM_CATALOG}
            onFilteredSims={setFilteredSims}
          />

          {/* Results Count */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white border border-gray-100 rounded-xl py-4 px-6 text-center"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
            >
              <span className="text-gray-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Showing <span className="font-bold text-black">{filteredSims.length}</span> of{' '}
                <span className="font-bold text-black">{SIM_CATALOG.length}</span> simulations
              </span>
            </div>
          </motion.div>

          {/* Simulation Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
          >
            {filteredSims.map((sim, index) => (
              <motion.div
                key={sim.id}
                variants={staggerItem}
                className="h-full"
              >
                <SimulationCard sim={sim} />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredSims.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div 
                className="bg-white border border-gray-100 rounded-2xl p-12 max-w-md mx-auto"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Layers className="w-8 h-8 text-gray-400" />
                </div>
                <h3 
                  className="text-xl font-bold text-black mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  No simulations found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationsPage;
