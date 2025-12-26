import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { HERO_COPY } from '../constants';
import TreeVisualization from './TreeVisualization';
import ComparisonView from './ComparisonView';
import { Header } from './Header';

interface HeroProps {
    onWatchDemo: () => void;
    isDark: boolean;
    onOpenAbout: () => void;
    toggleTheme: () => void;
}

const HIGHLIGHTS = [
    'Compare models side-by-side',
    'Fork at any node',
    'Bring your own keys',
];

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
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {/* Tree view thumbnail */}
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

                {/* Compare view thumbnail */}
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

export const Hero: React.FC<HeroProps> = ({ onWatchDemo, isDark, onOpenAbout, toggleTheme }) => {
    return (
        <section className="relative min-h-[100vh] w-full flex">
            {/* Left Half - Content */}
            <div className={`w-full lg:w-1/2 flex flex-col py-6 px-6 md:px-10 lg:px-14 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f9fa]'}`}>
                {/* Header */}
                <Header onOpenAbout={onOpenAbout} isDark={isDark} toggleTheme={toggleTheme} />

                {/* Center-aligned Content */}
                <div className="flex-1 flex flex-col items-center justify-center mt-4">
                    <div className="w-full max-w-xl text-center">
                        {/* Badge with animated blob gradient */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative inline-block mb-6 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold text-white overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #fbbf24, #f97316, #ec4899, #fbbf24)',
                                backgroundSize: '400% 400%',
                                animation: 'blob-gradient 8s ease infinite',
                            }}
                        >
                            {/* Grain texture */}
                            <span
                                className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                }}
                            />
                            <span className="relative">Coming Soon</span>
                        </motion.div>

                        <style>{`
                            @keyframes blob-gradient {
                                0%, 100% { background-position: 0% 50%; }
                                25% { background-position: 100% 0%; }
                                50% { background-position: 100% 100%; }
                                75% { background-position: 0% 100%; }
                            }
                        `}</style>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.05] ${isDark ? 'text-white' : 'text-gray-900'}`}
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

                        {/* Watch Demo Button - Aesthetic hover */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-10"
                        >
                            <motion.button
                                onClick={onWatchDemo}
                                whileHover="hover"
                                whileTap="tap"
                                className={`group relative inline-flex items-center gap-3 px-7 py-4 rounded-full border text-sm font-medium overflow-hidden transition-colors duration-300 ${isDark
                                    ? 'border-white/15 text-white bg-white/[0.03]'
                                    : 'border-gray-200 text-gray-900 bg-white'
                                    }`}
                            >
                                {/* Animated gradient background on hover */}
                                <motion.div
                                    className={`absolute inset-0 ${isDark
                                        ? 'bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08]'
                                        : 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100'
                                        }`}
                                    initial={{ x: '-100%', opacity: 0 }}
                                    variants={{
                                        hover: { x: '0%', opacity: 1 },
                                        tap: { opacity: 0.5 }
                                    }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />

                                {/* Play icon with pulse ring on hover */}
                                <motion.span
                                    className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full ${isDark
                                        ? 'bg-white/10'
                                        : 'bg-gray-100'
                                        }`}
                                    variants={{
                                        hover: { scale: 1.08 },
                                        tap: { scale: 0.95 }
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {/* Pulse ring */}
                                    <motion.span
                                        className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-200'}`}
                                        initial={{ scale: 1, opacity: 0 }}
                                        variants={{
                                            hover: {
                                                scale: [1, 1.4, 1.4],
                                                opacity: [0, 0.4, 0],
                                            }
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            repeatDelay: 0.5
                                        }}
                                    />
                                    <Play className="w-4 h-4 fill-current ml-0.5 relative z-10" />
                                </motion.span>

                                {/* Text shifts left on hover */}
                                <motion.span
                                    className="relative z-10"
                                    variants={{
                                        hover: { x: -4 },
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    See the Workflow
                                </motion.span>

                                {/* Arrow indicator on hover */}
                                <motion.span
                                    className="relative z-10"
                                    initial={{ opacity: 0, x: -8 }}
                                    variants={{
                                        hover: { opacity: 1, x: 0 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.span>
                            </motion.button>
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
