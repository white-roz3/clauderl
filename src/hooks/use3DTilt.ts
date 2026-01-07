'use client';

import { useRef, useState, useCallback, MouseEvent } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface Use3DTiltOptions {
  max?: number; // Maximum tilt rotation in degrees
  scale?: number; // Scale on hover
  speed?: number; // Transition speed in ms
  perspective?: number; // CSS perspective value
}

export function use3DTilt(options: Use3DTiltOptions = {}) {
  const {
    max = 15,
    scale = 1.05,
    speed = 400,
    perspective = 1000,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX - width / 2) / width) * max;
    const rotateX = -((mouseY - height / 2) / height) * max;

    setTilt({ rotateX, rotateY, scale });
  }, [max, scale]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const style = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  };

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

// Simplified version for components that just need the transform values
export function calculate3DTilt(
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
  max: number = 15
) {
  const rotateY = ((mouseX - width / 2) / width) * max;
  const rotateX = -((mouseY - height / 2) / height) * max;
  return { rotateX, rotateY };
}

