import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { HERO_COPY } from '../constants';
import TreeVisualization from './TreeVisualization';
import ComparisonView from './ComparisonView';
import { Header } from './Header';



const HIGHLIGHTS = [
    'Compare models side-by-side',
    'Fork at any node',
    'Bring your own keys',
];

// Glow Button with cursor-following border glow
const GlowButton: React.FC<{ onClick: () => void; isDark: boolean }> = ({ onClick, isDark }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-medium transition-all duration-300 ${isDark
                ? 'text-white'
                : 'text-gray-900'
                }`}
        >
            {/* Base background */}
            <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`} />

            {/* Static border */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
                }}
            />

            {/* Inner fill glow - follows cursor */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(150px circle at ${glowPosition.x}px ${glowPosition.y}px, ${isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)'}, transparent 50%)`,
                }}
            />

            {/* Border glow - follows cursor with stronger effect */}
            <div
                className="absolute inset-[-1px] rounded-full pointer-events-none transition-opacity duration-200"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(80px circle at ${glowPosition.x}px ${glowPosition.y}px, ${isDark ? 'rgba(139, 92, 246, 1)' : 'rgba(139, 92, 246, 0.8)'}, ${isDark ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.3)'} 40%, transparent 70%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px',
                }}
            />

            {/* Outer glow blur - ambient effect */}
            <div
                className="absolute inset-[-8px] rounded-full pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovering ? 0.6 : 0,
                    background: `radial-gradient(100px circle at ${glowPosition.x + 8}px ${glowPosition.y + 8}px, ${isDark ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.25)'}, transparent 60%)`,
                    filter: 'blur(8px)',
                }}
            />

            {/* Play icon */}
            <motion.span
                className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 ${isDark
                    ? 'bg-white/10 group-hover:bg-white/15'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}
                whileHover={{ scale: 1.05 }}
            >
                <Play className="w-4 h-4 fill-current ml-0.5" />
            </motion.span>

            {/* Text */}
            <span className="relative z-10 font-medium">See the Workflow</span>

            {/* Arrow on hover */}
            <motion.span
                className="relative z-10"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: isHovering ? 1 : 0, x: isHovering ? 0 : -4 }}
                transition={{ duration: 0.2 }}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.span>
        </motion.button>
    );
};

// Visualization Panel with toggle between Tree and Comparison views
const CYCLE_DURATION = 6000; // 6 seconds per view

const VisualizationPanel: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const [viewIndex, setViewIndex] = useState(0);
    const [key, setKey] = useState(0); // For resetting animation

    // Auto-cycle between views
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setViewIndex((prev) => (prev + 1) % 2);
            setKey((prev) => prev + 1); // Reset animation
        }, CYCLE_DURATION);
        return () => clearTimeout(timer);
    }, [viewIndex]);

    const handleClick = (index: number) => {
        setViewIndex(index);
        setKey((prev) => prev + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`relative w-full h-full rounded-2xl overflow-hidden ${isDark
                ? 'bg-[#070707] border border-white/[0.06]'
                : 'bg-white border border-gray-200'
                }`}
        >
            {/* CSS for border animation */}
            <style>{`
                @keyframes border-progress {
                    0% { stroke-dashoffset: 280; }
                    100% { stroke-dashoffset: 0; }
                }
                .border-anim {
                    stroke-dasharray: 280;
                    stroke-dashoffset: 280;
                    animation: border-progress ${CYCLE_DURATION}ms linear forwards;
                }
            `}</style>

            {/* Slide preview thumbnails - centered at top */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                {/* Tree view thumbnail */}
                <div className="flex flex-col items-center gap-1.5">
                    <button
                        onClick={() => handleClick(0)}
                        className={`relative w-20 h-14 rounded-lg overflow-visible transition-all ${viewIndex === 0 ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                    >
                        {/* Animated border */}
                        {viewIndex === 0 && (
                            <svg
                                key={key}
                                className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none"
                            >
                                <rect
                                    x="1" y="1"
                                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                                    rx="8" ry="8"
                                    fill="none"
                                    stroke={isDark ? '#fff' : '#3b82f6'}
                                    strokeWidth="2"
                                    className="border-anim"
                                />
                            </svg>
                        )}
                        <div className={`w-full h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-[#111]' : 'bg-white border border-gray-200'
                            }`}>
                            <svg className={`w-8 h-8 ${isDark ? 'text-white/50' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                                <circle cx="12" cy="3" r="1.5" />
                                <circle cx="6" cy="10" r="1.5" />
                                <circle cx="18" cy="10" r="1.5" />
                                <circle cx="4" cy="17" r="1.5" />
                                <circle cx="9" cy="17" r="1.5" />
                                <circle cx="15" cy="17" r="1.5" />
                                <circle cx="20" cy="17" r="1.5" />
                                <path d="M12 4.5v2M12 6.5L6 8.5M12 6.5l6 2M6 11.5l-2 4M6 11.5l3 4M18 11.5l-3 4M18 11.5l2 4" />
                            </svg>
                        </div>
                    </button>
                    <span className={`text-[9px] uppercase tracking-wider font-medium ${viewIndex === 0
                        ? (isDark ? 'text-white/70' : 'text-gray-600')
                        : (isDark ? 'text-white/30' : 'text-gray-400')
                        }`}>Map</span>
                </div>

                {/* Compare view thumbnail */}
                <div className="flex flex-col items-center gap-1.5">
                    <button
                        onClick={() => handleClick(1)}
                        className={`relative w-20 h-14 rounded-lg overflow-visible transition-all ${viewIndex === 1 ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                    >
                        {/* Animated border */}
                        {viewIndex === 1 && (
                            <svg
                                key={key}
                                className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none"
                            >
                                <rect
                                    x="1" y="1"
                                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                                    rx="8" ry="8"
                                    fill="none"
                                    stroke={isDark ? '#fff' : '#3b82f6'}
                                    strokeWidth="2"
                                    className="border-anim"
                                />
                            </svg>
                        )}
                        <div className={`w-full h-full rounded-lg flex items-center justify-center gap-1 p-2 ${isDark ? 'bg-[#111]' : 'bg-white border border-gray-200'
                            }`}>
                            <div className={`flex-1 h-full rounded ${isDark ? 'bg-white/15' : 'bg-gray-100'}`} />
                            <div className={`flex-1 h-full rounded ${isDark ? 'bg-white/15' : 'bg-gray-100'}`} />
                        </div>
                    </button>
                    <span className={`text-[9px] uppercase tracking-wider font-medium ${viewIndex === 1
                        ? (isDark ? 'text-white/70' : 'text-gray-600')
                        : (isDark ? 'text-white/30' : 'text-gray-400')
                        }`}>Compare</span>
                </div>
            </div>

            {/* Main view area - full */}
            <AnimatePresence mode="wait">
                {viewIndex === 0 ? (
                    <motion.div
                        key="tree"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                    >
                        <TreeVisualization isDark={isDark} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="comparison"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                    >
                        <ComparisonView isDark={isDark} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

interface HeroProps {
    onWatchDemo: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchDemo, isDark, toggleTheme }) => {
    return (
        <section className="relative min-h-[100vh] w-full flex">
            {/* Left Half - Content */}
            <div className={`w-full lg:w-1/2 flex flex-col py-6 px-6 md:px-10 lg:px-14 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f9fa]'}`}>
                {/* Header */}
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                {/* Center-aligned Content */}
                <div className="flex-1 flex flex-col items-center justify-center mt-4">
                    <div className="w-full max-w-xl text-center">
                        {/* Coming Soon - Clean, simple, honest */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`mb-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                        >
                            <span className={`italic px-2 py-0.5 rounded ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.04]'}`}>Coming soon</span>
                            <span className="mx-1">—</span>
                            join the waitlist
                        </motion.p>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            {HERO_COPY.title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`mt-6 text-lg sm:text-xl leading-relaxed font-light mx-auto max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            {HERO_COPY.subtitle}
                        </motion.p>

                        {/* Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3"
                        >
                            {HIGHLIGHTS.map((text, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
                                >
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Watch Demo Button - with cursor glow */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-10"
                        >
                            <GlowButton onClick={onWatchDemo} isDark={isDark} />
                        </motion.div>

                        {/* Waitlist Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="mt-8 max-w-sm mx-auto"
                        >
                            <WaitlistForm isDark={isDark} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right Half - Visualization Container with Toggle */}
            <div className={`hidden lg:flex w-1/2 p-5 items-stretch ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f9fa]'}`}>
                <VisualizationPanel isDark={isDark} />
            </div>
        </section>
    );
};
