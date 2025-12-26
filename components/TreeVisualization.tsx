import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const NODE_WIDTH = 140;
const NODE_HEIGHT = 58;

interface TreeVisualizationProps {
    isDark?: boolean;
}

// Asymmetric tree with a bit more depth - darker colors for light mode visibility
const NODES = [
    // ROOT - indigo
    { id: 'root', x: 50, y: 8, label: 'Input', type: 'input', delay: 0, color: '#6366f1', icons: ['/logos/claude-ai-icon.svg', '/logos/openai.svg'] },

    // L1 - blue
    { id: 'L1-Left', x: 26, y: 24, parentId: 'root', label: 'Claude', delay: 0.5, color: '#3b82f6', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L1-Right', x: 74, y: 24, parentId: 'root', label: 'GPT-4o', delay: 0.5, color: '#3b82f6', icons: ['/logos/openai.svg'] },

    // L2 - emerald
    { id: 'L2-L1', x: 26, y: 40, parentId: 'L1-Left', label: 'Explore', delay: 1.0, color: '#10b981', icons: ['/logos/gemini.svg'] },
    { id: 'L2-R1', x: 60, y: 40, parentId: 'L1-Right', label: 'Analyze', delay: 1.0, color: '#10b981', icons: ['/logos/mistral-ai_logo.svg'] },
    { id: 'L2-R2', x: 88, y: 40, parentId: 'L1-Right', label: 'Compare', delay: 1.1, color: '#10b981', icons: ['/logos/ollama_light.svg'] },

    // L3 - violet
    { id: 'L3-L1', x: 14, y: 56, parentId: 'L2-L1', label: 'Refine', delay: 1.5, color: '#8b5cf6', icons: ['/logos/openai.svg'] },
    { id: 'L3-L2', x: 38, y: 56, parentId: 'L2-L1', label: 'Expand', delay: 1.6, color: '#8b5cf6', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L3-R1', x: 60, y: 56, parentId: 'L2-R1', label: 'Merge', delay: 1.55, color: '#8b5cf6', icons: ['/logos/gemini.svg'] },
    { id: 'L3-R2', x: 88, y: 56, parentId: 'L2-R2', label: 'Synth', delay: 1.6, color: '#8b5cf6', icons: ['/logos/xai_light.svg'] },

    // L4 - rose
    { id: 'L4-L1', x: 14, y: 72, parentId: 'L3-L1', label: 'Final', delay: 1.9, color: '#f43f5e', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L4-R1', x: 50, y: 72, parentId: 'L3-R1', label: 'Draft A', delay: 1.9, color: '#f43f5e', icons: ['/logos/openai.svg'] },
    { id: 'L4-R2', x: 70, y: 72, parentId: 'L3-R1', label: 'Draft B', delay: 1.95, color: '#f43f5e', icons: ['/logos/gemini.svg'] },
];

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ isDark = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        updateSize();
        const observer = new ResizeObserver(updateSize);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const padding = { x: 30, y: 50 };
    const getX = (percent: number) => padding.x + ((percent / 100) * (size.width - padding.x * 2));
    const getY = (percent: number) => padding.y + ((percent / 100) * (size.height - padding.y * 2));

    // Smart path - straight if same X, orthogonal otherwise
    const getPath = (x1: number, y1: number, x2: number, y2: number) => {
        const startY = y1 + NODE_HEIGHT / 2;
        const endY = y2 - NODE_HEIGHT / 2;

        if (Math.abs(x1 - x2) < 5) {
            return `M ${x1} ${startY} L ${x1} ${endY}`;
        }

        const midY = startY + (endY - startY) / 2;
        return `M ${x1} ${startY} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${endY}`;
    };

    const bgColor = isDark ? "#070707" : "#ffffff";

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* Grid pattern */}
            <div
                className={`absolute inset-0 ${isDark ? 'opacity-[0.12]' : 'opacity-[0.35]'}`}
                style={{
                    backgroundImage: `radial-gradient(${isDark ? '#505050' : '#9ca3af'} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Subtle gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)'
                        : 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'
                }}
            />

            {size.width > 0 && (
                <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Connections */}
                    {NODES.map((node) => {
                        if (!node.parentId) return null;
                        const parent = NODES.find((n) => n.id === node.parentId);
                        if (!parent) return null;

                        const x1 = getX(parent.x);
                        const y1 = getY(parent.y);
                        const x2 = getX(node.x);
                        const y2 = getY(node.y);

                        return (
                            <motion.path
                                key={`link-${parent.id}-${node.id}`}
                                d={getPath(x1, y1, x2, y2)}
                                fill="none"
                                strokeWidth={2}
                                strokeLinecap="round"
                                stroke={node.color}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: isDark ? 0.6 : 0.9 }}
                                transition={{
                                    duration: 1.5,
                                    delay: node.delay + 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            />
                        );
                    })}

                    {/* Label backgrounds */}
                    {NODES.map((node) => {
                        const x = getX(node.x);
                        const y = getY(node.y);
                        const isInput = node.type === 'input';
                        const labelY = isInput ? y - NODE_HEIGHT / 2 - 10 : y + NODE_HEIGHT / 2 + 14;
                        const labelWidth = node.label.length * 7 + 14;

                        return (
                            <motion.rect
                                key={`label-bg-${node.id}`}
                                x={x - labelWidth / 2}
                                y={labelY - 7}
                                width={labelWidth}
                                height={14}
                                rx={4}
                                fill={bgColor}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: node.delay }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {NODES.map((node) => {
                        const x = getX(node.x);
                        const y = getY(node.y);
                        const isInput = node.type === 'input';

                        const fill = isDark ? "#0a0a0a" : "#ffffff";

                        return (
                            <motion.g
                                key={node.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: node.delay,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                <rect
                                    x={x - NODE_WIDTH / 2}
                                    y={y - NODE_HEIGHT / 2}
                                    width={NODE_WIDTH}
                                    height={NODE_HEIGHT}
                                    rx={12}
                                    fill={fill}
                                    stroke={node.color}
                                    strokeWidth={1.5}
                                    strokeOpacity={isDark ? 0.6 : 0.8}
                                />

                                <g transform={`translate(${x - NODE_WIDTH / 2}, ${y - NODE_HEIGHT / 2})`}>
                                    {node.icons && node.icons.map((icon, index) => (
                                        <image
                                            key={index}
                                            href={icon}
                                            x={14 + (index * 16)}
                                            y={12}
                                            height="14"
                                            width="14"
                                            style={{ opacity: 0.8 }}
                                        />
                                    ))}

                                    <rect
                                        x={node.icons ? 14 + (node.icons.length * 16) + 8 : 30}
                                        y={16}
                                        width={isInput ? 26 : 38}
                                        height={4}
                                        rx={2}
                                        fill={isDark ? "#333" : "#d1d5db"}
                                    />

                                    <rect
                                        x={14} y={30} width={NODE_WIDTH - 28} height={4} rx={2}
                                        fill={isDark ? "#262626" : "#e5e7eb"}
                                    />
                                    <rect
                                        x={14} y={40} width={(NODE_WIDTH - 28) * 0.55} height={4} rx={2}
                                        fill={isDark ? "#262626" : "#e5e7eb"}
                                    />
                                </g>

                                <text
                                    x={x}
                                    y={isInput ? y - NODE_HEIGHT / 2 - 10 : y + NODE_HEIGHT / 2 + 14}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-[10px] font-medium uppercase tracking-wider"
                                    style={{ fill: node.color }}
                                    opacity={isDark ? 0.75 : 0.85}
                                >
                                    {node.label}
                                </text>
                            </motion.g>
                        );
                    })}
                </svg>
            )}
        </div>
    );
};

export default TreeVisualization;
