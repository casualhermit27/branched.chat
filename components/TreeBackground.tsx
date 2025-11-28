
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TREE_NODES } from '../constants';

const NODE_WIDTH = 140;
const NODE_HEIGHT = 60;

const TreeBackground: React.FC = () => {
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

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0a0a0a]">
      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#505050 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

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
              stroke={node.active ? nodeColor : "#333"}
              strokeWidth={node.active ? 1.5 : 1}
              strokeDasharray={node.active ? '8 10' : '4 12'}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: node.active ? 0.35 : 0.05
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

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: node.delay + 0.2 }}
            >
              {/* Node Background */}
              <rect
                x={x - NODE_WIDTH / 2}
                y={y - NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={8}
                fill={isInput ? "#121212" : "#0a0a0a"}
                stroke={isActive ? nodeColor : "#333"}
                strokeWidth={isActive ? 1.5 : 1}
                strokeOpacity={isActive ? 0.4 : 0.1}
              />

              {/* Node Content Skeleton */}
              <g transform={`translate(${x - NODE_WIDTH / 2}, ${y - NODE_HEIGHT / 2})`}>
                {/* Header Icon(s) or Dot */}
                {node.icons && node.icons.length > 0 ? (
                  node.icons.map((icon, index) => (
                    <image
                      key={index}
                      href={icon}
                      x={8 + (index * 16)}
                      y={8}
                      height="16"
                      width="16"
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    />
                  ))
                ) : (
                  <circle
                    cx={16}
                    cy={16}
                    r={3}
                    fill={isInput ? "#444" : (isActive ? nodeColor : "#333")}
                    fillOpacity={isActive ? 0.8 : 0.2}
                  />
                )}

                {/* Header Line */}
                <rect
                  x={node.icons && node.icons.length > 0 ? 8 + (node.icons.length * 16) + 8 : 32}
                  y={14}
                  width={isInput ? 30 : 50}
                  height={4}
                  rx={2}
                  fill={isInput ? "#333" : (isActive ? nodeColor : "#1f1f1f")}
                  fillOpacity={isActive ? 0.4 : 0.3}
                />

                {/* Text Lines */}
                <rect x={16} y={30} width={NODE_WIDTH - 32} height={3} rx={1.5} fill={isInput ? "#222" : (isActive ? "#334155" : "#1a1a1a")} fillOpacity={0.6} />
                <rect x={16} y={38} width={(NODE_WIDTH - 32) * 0.7} height={3} rx={1.5} fill={isInput ? "#222" : (isActive ? "#334155" : "#1a1a1a")} fillOpacity={0.6} />
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
                  style={{ fill: isActive ? nodeColor : '#555' }}
                >
                  {node.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none h-24 top-0 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none h-64 bottom-0 top-auto opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none opacity-60" />
    </div>
  );
};

export default TreeBackground;
