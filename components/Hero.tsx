import React from 'react';
import { motion } from 'framer-motion';
import { Play, Check } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { HERO_COPY } from '../constants';
import TreeVisualization from './TreeVisualization';
import { Header } from './Header';

interface HeroProps {
    onWatchDemo: () => void;
    isDark: boolean;
    onOpenAbout: () => void;
    toggleTheme: () => void;
}

const HIGHLIGHTS = [
    'Multi-model conversations',
    'Branch at any point',
    'Your API keys',
];

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
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`inline-block mb-6 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium border ${isDark
                                ? 'border-white/10 text-gray-400 bg-white/5'
                                : 'border-gray-300 text-gray-600 bg-white'
                                }`}
                        >
                            Coming Soon
                        </motion.div>

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

                                <span className="relative z-10">Watch demo</span>

                                {/* Arrow indicator on hover */}
                                <motion.span
                                    className="relative z-10"
                                    initial={{ opacity: 0, x: -5 }}
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

            {/* Right Half - Tree Animation Container */}
            <div className={`hidden lg:flex w-1/2 p-5 items-stretch ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f9fa]'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`relative w-full rounded-2xl overflow-hidden ${isDark
                        ? 'bg-[#070707] border border-white/[0.06]'
                        : 'bg-white border border-gray-200'
                        }`}
                >
                    <TreeVisualization isDark={isDark} />
                </motion.div>
            </div>
        </section>
    );
};
