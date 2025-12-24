
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TREE_NODES } from '../constants';

const NODE_WIDTH = 140;
const NODE_HEIGHT = 60;

interface TreeBackgroundProps {
  isDark?: boolean;
}

const TreeBackground: React.FC<TreeBackgroundProps> = ({ isDark = true }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  const getX = (percent: number) => (percent / 100) * windowSize.width;
  const getY = (percent: number) => (percent / 100) * windowSize.height;

  // Orthogonal path generator
  const getPath = (x1: number, y1: number, x2: number, y2: number) => {
    const startY = y1 + NODE_HEIGHT / 2;
    const endY = y2 - NODE_HEIGHT / 2;
    const midY = startY + (endY - startY) / 2;
    return `M ${x1} ${startY} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${endY}`;
  };

  const bgColor = isDark ? "#0a0a0a" : "#fafafa";

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-700 ease-in-out`} style={{ backgroundColor: bgColor }}>

      {/* --- LIGHT MODE BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        {/* React Flow Style Dots (Light) */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#b1b1b7 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        {/* Light Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa] h-32 top-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-[#fafafa] h-64 bottom-0 top-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-transparent to-[#fafafa] opacity-40" />
      </div>

      {/* --- DARK MODE BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        {/* React Flow Style Dots (Dark) */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(#505050 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        {/* Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] h-32 top-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] h-64 bottom-0 top-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-40" />
      </div>

      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          {/* We remove the generic blue gradient and rely on specific colors */}
        </defs>

        {/* Connections */}
        {TREE_NODES.map((node) => {
          if (!node.parentId) return null;
          const parent = TREE_NODES.find((n) => n.id === node.parentId);
          if (!parent) return null;

          const x1 = getX(parent.x);
          const y1 = getY(parent.y);
          const x2 = getX(node.x);
          const y2 = getY(node.y);

          const nodeColor = node.color || "#3b82f6"; // Fallback blue

          return (
            <motion.path
              key={`link-${parent.id}-${node.id}`}
              d={getPath(x1, y1, x2, y2)}
              fill="none"
              strokeWidth={node.active ? 1.5 : 1}
              strokeDasharray={node.active ? 'none' : '4 4'}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0, stroke: isDark ? "#404040" : "#cbd5e1" }}
              animate={{
                pathLength: 1,
                opacity: node.active ? 0.4 : (isDark ? 0.08 : 0.4),
                stroke: node.active ? nodeColor : (isDark ? "#404040" : "#cbd5e1")
              }}
              transition={{ duration: 2, delay: node.delay, ease: "easeInOut" }}
            />
          );
        })}

        {/* Nodes */}
        {TREE_NODES.map((node) => {
          const x = getX(node.x);
          const y = getY(node.y);
          const isInput = node.type === 'input';
          const isActive = node.active;
          const nodeColor = node.color || "#3b82f6";

          const fill = isInput ? (isDark ? "#121212" : "#e2e8f0") : (isDark ? "#0a0a0a" : "#ffffff");
          const stroke = isActive ? nodeColor : (isDark ? "#333" : "#cbd5e1");

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: node.delay + 0.2 }}
            >
              {/* Node Background */}
              <motion.rect
                x={x - NODE_WIDTH / 2}
                y={y - NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={12}
                initial={{ fill: fill, stroke: stroke }}
                animate={{
                  fill: fill,
                  stroke: stroke,
                  strokeOpacity: isActive ? [0.3, 0.6, 0.3] : (isDark ? 0.1 : 0.5)
                }}
                strokeWidth={isActive ? 1.5 : 1}
                transition={{
                  fill: { duration: 0.5 },
                  stroke: { duration: 0.5 },
                  strokeOpacity: isActive ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }
                }}
              />

              {/* Node Content Skeleton */}
              <g transform={`translate(${x - NODE_WIDTH / 2}, ${y - NODE_HEIGHT / 2})`}>
                {/* Header Icon(s) or Dot */}
                {node.icons && node.icons.length > 0 ? (
                  node.icons.map((icon, index) => (
                    <image
                      key={index}
                      href={icon}
                      x={12 + (index * 16)}
                      y={10}
                      height="14"
                      width="14"
                      className="transition-opacity duration-500"
                      style={{ opacity: isActive ? 0.9 : 0.5 }}
                    />
                  ))
                ) : (
                  <circle
                    cx={20}
                    cy={18}
                    r={3}
                    className="transition-colors duration-500"
                    fill={isInput ? (isDark ? "#444" : "#94a3b8") : (isActive ? nodeColor : (isDark ? "#333" : "#cbd5e1"))}
                    fillOpacity={isActive ? 0.8 : (isDark ? 0.2 : 0.8)}
                  />
                )}

                {/* Header Line */}
                <rect
                  x={node.icons && node.icons.length > 0 ? 12 + (node.icons.length * 16) + 8 : 36}
                  y={16}
                  width={isInput ? 30 : 40}
                  height={3}
                  rx={1.5}
                  className="transition-all duration-500"
                  fill={isInput ? (isDark ? "#333" : "#ddd") : (isActive ? nodeColor : (isDark ? "#1f1f1f" : "#f0f0f0"))}
                  fillOpacity={isActive ? 0.4 : 0.3}
                />

                {/* Text Lines */}
                <rect
                  x={16} y={30} width={NODE_WIDTH - 32} height={3} rx={1.5}
                  className="transition-all duration-500"
                  fill={isInput ? (isDark ? "#222" : "#e5e5e5") : (isActive ? (isDark ? "#334155" : "#94a3b8") : (isDark ? "#1a1a1a" : "#f5f5f5"))}
                  fillOpacity={0.6}
                />
                <rect
                  x={16} y={38} width={(NODE_WIDTH - 32) * 0.7} height={3} rx={1.5}
                  className="transition-all duration-500"
                  fill={isInput ? (isDark ? "#222" : "#e5e5e5") : (isActive ? (isDark ? "#334155" : "#94a3b8") : (isDark ? "#1a1a1a" : "#f5f5f5"))}
                  fillOpacity={0.6}
                />
              </g>

              {/* Label */}
              {node.label && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: node.delay + 0.8 }}
                  x={x}
                  y={isInput ? y - NODE_HEIGHT / 2 - 8 : y + NODE_HEIGHT / 2 + 12}
                  textAnchor="middle"
                  className="text-[10px] font-sans font-medium uppercase tracking-widest select-none"
                  style={{ fill: isActive ? nodeColor : (isDark ? '#555' : '#999') }}
                >
                  {node.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default TreeBackground;
