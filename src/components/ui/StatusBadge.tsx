'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'coming_soon' | 'prototype' | 'available';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          text: 'Available',
          bgColor: 'bg-black',
          textColor: 'text-white'
        };
      case 'prototype':
        return {
          text: 'Prototype',
          bgColor: 'bg-gray-800',
          textColor: 'text-white'
        };
      case 'coming_soon':
        return {
          text: 'Coming Soon',
          bgColor: 'bg-gray-200',
          textColor: 'text-gray-600'
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-gray-400',
          textColor: 'text-white'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span 
      className={`px-3 py-1.5 text-xs font-medium rounded-full ${config.bgColor} ${config.textColor} ${className}`}
      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
