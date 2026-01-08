'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { SimCatalogItem, getAllTags, getAllDifficulties } from '@/data/sims';

interface SimulationFiltersProps {
  sims: SimCatalogItem[];
  onFilteredSims: (filteredSims: SimCatalogItem[]) => void;
}

const SimulationFilters: React.FC<SimulationFiltersProps> = ({ sims, onFilteredSims }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const allTags = getAllTags();
  const allDifficulties = getAllDifficulties();
  const allStatuses = ['available', 'prototype', 'coming_soon'];

  const applyFilters = useCallback(() => {
    let filtered = [...sims];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(sim => 
        sim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(sim => 
        sim.tags && sim.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(sim => 
        sim.difficulty.some(diff => selectedDifficulties.includes(diff))
      );
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(sim => 
        selectedStatuses.includes(sim.status)
      );
    }

    onFilteredSims(filtered);
  }, [sims, searchTerm, selectedTags, selectedDifficulties, selectedStatuses, onFilteredSims]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(newDifficulties);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedDifficulties([]);
    setSelectedStatuses([]);
    setSearchTerm('');
    onFilteredSims(sims);
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedDifficulties.length > 0 || selectedStatuses.length > 0 || searchTerm !== '';

  // Apply filters when dependencies change
  React.useEffect(() => {
    applyFilters();
  }, [selectedTags, selectedDifficulties, selectedStatuses, searchTerm, sims, applyFilters]);

  return (
    <motion.div 
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
    >
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search simulations..."
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-black text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          />
        </div>
      </div>

      {/* Filter sections */}
      <div className="space-y-5">
        {/* Tags */}
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulties */}
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Difficulty
          </div>
          <div className="flex flex-wrap gap-2">
            {allDifficulties.map((difficulty) => (
              <motion.button
                key={difficulty}
                onClick={() => toggleDifficulty(difficulty)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  selectedDifficulties.includes(difficulty)
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Status
          </div>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <motion.button
                key={status}
                onClick={() => toggleStatus(status)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  selectedStatuses.includes(status)
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SimulationFilters;

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SimulationFilters;
