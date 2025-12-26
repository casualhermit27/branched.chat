import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TREE_NODES } from '../constants';

const NODE_WIDTH = 120;
const NODE_HEIGHT = 52;

interface TreeBackgroundProps {
  isDark?: boolean;
}

// Scroll-based reveal
const BRANCH_LEVELS: Record<string, { start: number; end: number }> = {
  'root': { start: 0, end: 0 },
  'L1-Left': { start: 0, end: 0 },
  'L1-Right': { start: 0, end: 0 },
  'L2-Left-1': { start: 0, end: 0 },
  'L2-Right-1': { start: 0, end: 0 },
  'L2-Right-2': { start: 0, end: 0 },
  'L2-Right-3': { start: 0, end: 0 },
  'L3-Left-1': { start: 150, end: 900 },
  'L3-Left-2': { start: 150, end: 900 },
  'L3-Left-3': { start: 150, end: 900 },
  'L3-Right-1': { start: 150, end: 900 },
  'L3-Right-2': { start: 150, end: 900 },
};

const TreeBackground: React.FC<TreeBackgroundProps> = ({ isDark = true }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (windowSize.width === 0) return null;

  // Position tree on right side of screen (offset by 15% to push right)
  const treeOffsetX = 15;
  const getX = (percent: number) => ((percent + treeOffsetX) / 100) * windowSize.width;
  const getY = (percent: number) => (percent / 100) * windowSize.height;

  const getScrollProgress = (nodeId: string) => {
    const scrollRange = BRANCH_LEVELS[nodeId];
    if (!scrollRange || (scrollRange.start === 0 && scrollRange.end === 0)) {
      return 1;
    }
    const progress = (scrollY - scrollRange.start) / (scrollRange.end - scrollRange.start);
    return Math.max(0, Math.min(1, progress));
  };

  const getPath = (x1: number, y1: number, x2: number, y2: number) => {
    const startY = y1 + NODE_HEIGHT / 2;
    const endY = y2 - NODE_HEIGHT / 2;
    const midY = startY + (endY - startY) / 2;
    return `M ${x1} ${startY} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${endY}`;
  };

  const getPathLength = (x1: number, y1: number, x2: number, y2: number) => {
    const startY = y1 + NODE_HEIGHT / 2;
    const endY = y2 - NODE_HEIGHT / 2;
    const midY = startY + (endY - startY) / 2;
    return Math.abs(midY - startY) + Math.abs(x2 - x1) + Math.abs(endY - midY);
  };

  const bgColor = isDark ? "#0a0a0a" : "#fafafa";

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      {/* Light Mode Background */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(#c0c0c5 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Dark Mode Background */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#505050 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Connections */}
        {TREE_NODES.map((node) => {
          if (!node.parentId) return null;
          const parent = TREE_NODES.find((n) => n.id === node.parentId);
          if (!parent) return null;

          const x1 = getX(parent.x);
          const y1 = getY(parent.y);
          const x2 = getX(node.x);
          const y2 = getY(node.y);

          const nodeColor = node.color || "#3b82f6";
          const scrollRange = BRANCH_LEVELS[node.id] || { start: 0, end: 0 };
          const isInitiallyVisible = scrollRange.start === 0 && scrollRange.end === 0;
          const progress = getScrollProgress(node.id);

          const baseOpacity = 0.45;
          const pathLength = getPathLength(x1, y1, x2, y2);
          const strokeWidth = 1;

          if (isInitiallyVisible) {
            return (
              <motion.path
                key={`link-${parent.id}-${node.id}`}
                d={getPath(x1, y1, x2, y2)}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                stroke={nodeColor}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: baseOpacity }}
                transition={{ duration: 2, delay: node.delay || 0, ease: "easeOut" }}
              />
            );
          }

          return (
            <path
              key={`link-${parent.id}-${node.id}`}
              d={getPath(x1, y1, x2, y2)}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              stroke={nodeColor}
              opacity={progress * baseOpacity}
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out, opacity 0.5s ease-out' }}
            />
          );
        })}

        {/* Nodes */}
        {TREE_NODES.map((node) => {
          const x = getX(node.x);
          const y = getY(node.y);
          const isInput = node.type === 'input';
          const nodeColor = node.color || "#3b82f6";
          const scrollRange = BRANCH_LEVELS[node.id] || { start: 0, end: 0 };
          const isInitiallyVisible = scrollRange.start === 0 && scrollRange.end === 0;
          const progress = getScrollProgress(node.id);

          const fill = isDark ? "#0d0d0d" : "#f8f8f8";
          const stroke = nodeColor;

          const baseOpacity = 0.75;
          const currentOpacity = isInitiallyVisible ? baseOpacity : progress * baseOpacity;
          const currentScale = isInitiallyVisible ? 1 : 0.9 + (0.1 * progress);

          const nodeContent = (
            <>
              <rect
                x={x - NODE_WIDTH / 2}
                y={y - NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={10}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                strokeOpacity={0.4}
              />

              <g transform={`translate(${x - NODE_WIDTH / 2}, ${y - NODE_HEIGHT / 2})`}>
                {node.icons && node.icons.length > 0 ? (
                  node.icons.map((icon, index) => (
                    <image
                      key={index}
                      href={icon}
                      x={10 + (index * 14)}
                      y={8}
                      height="12"
                      width="12"
                      style={{ opacity: 0.6 }}
                    />
                  ))
                ) : (
                  <circle
                    cx={18}
                    cy={14}
                    r={2.5}
                    fill={isDark ? "#444" : "#aaa"}
                    fillOpacity={0.5}
                  />
                )}

                <rect
                  x={node.icons && node.icons.length > 0 ? 10 + (node.icons.length * 14) + 6 : 32}
                  y={12}
                  width={isInput ? 25 : 35}
                  height={2.5}
                  rx={1.25}
                  fill={isDark ? "#222" : "#ddd"}
                  fillOpacity={0.6}
                />

                <rect
                  x={12} y={26} width={NODE_WIDTH - 24} height={2.5} rx={1.25}
                  fill={isDark ? "#1a1a1a" : "#e5e5e5"}
                  fillOpacity={0.5}
                />
                <rect
                  x={12} y={34} width={(NODE_WIDTH - 24) * 0.65} height={2.5} rx={1.25}
                  fill={isDark ? "#1a1a1a" : "#e5e5e5"}
                  fillOpacity={0.5}
                />
              </g>

              {node.label && (
                <text
                  x={x}
                  y={isInput ? y - NODE_HEIGHT / 2 - 6 : y + NODE_HEIGHT / 2 + 10}
                  textAnchor="middle"
                  className="text-[9px] font-sans font-medium uppercase tracking-widest select-none"
                  style={{ fill: nodeColor }}
                  opacity={0.5}
                >
                  {node.label}
                </text>
              )}
            </>
          );

          if (isInitiallyVisible) {
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: baseOpacity, scale: 1 }}
                transition={{ duration: 1.5, delay: node.delay || 0, ease: "easeOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {nodeContent}
              </motion.g>
            );
          }

          return (
            <g
              key={node.id}
              opacity={currentOpacity}
              style={{
                transform: `scale(${currentScale})`,
                transformOrigin: `${x}px ${y}px`,
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              {nodeContent}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TreeBackground;
