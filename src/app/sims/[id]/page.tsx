'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { getSimById, SimCatalogItem, CourseId } from '@/data/sims';
import SimulationDetail from '@/components/sims/SimulationDetail';

const SimulationDetailPage: React.FC = () => {
  const params = useParams();
  const [sim, setSim] = useState<SimCatalogItem | null>(null);
  const [mockMetrics, setMockMetrics] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const simData = getSimById(params.id as CourseId);
      if (simData) {
        setSim(simData);
        
        // Generate mock metrics
        setMockMetrics({
          time_ms: Math.floor(Math.random() * 100000) + 10000,
          success_rate: Math.random() * 0.8 + 0.2,
          attempts: Math.floor(Math.random() * 50) + 10
        });
      }
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Loading simulation...
          </p>
        </div>
      </div>
    );
  }

  if (!sim) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div 
              className="bg-white border border-gray-100 rounded-2xl p-8"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 
                className="text-2xl font-bold text-black mb-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Simulation Not Found
              </h2>
              <p className="text-gray-500 mb-6">
                The requested simulation does not exist or has been removed.
              </p>
              <Link href="/sims">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl"
                  style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Simulations
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Back Button and Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/sims">
              <motion.button
                whileHover={{ x: -3 }}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Simulations</span>
              </motion.button>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/sims" className="hover:text-black transition-colors">
              Simulations
            </Link>
            <span>/</span>
            <span className="text-black font-medium">{sim.name}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={staggerItem}>
            <SimulationDetail sim={sim} mockMetrics={mockMetrics} />
          </motion.div>
        </motion.div>

        {/* Back to Simulations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/sims">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-lg rounded-xl"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              Explore All Simulations
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SimulationDetailPage;
