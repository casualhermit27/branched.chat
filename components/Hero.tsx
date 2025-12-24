import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { HERO_COPY } from '../constants';

interface HeroProps {
    onWatchDemo: () => void;
    isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onWatchDemo, isDark }) => {
    return (
        <div className="relative max-w-3xl mx-auto text-center space-y-12 z-10">
            {/* Ambient Glow - Subtle in both apps but maybe lighter in light mode */}
            <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}`} />

            {/* Hero Typography */}
            <div className="relative space-y-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white via-white/90 to-white/50' : 'from-black via-gray-800 to-gray-500'}`}
                >
                    {HERO_COPY.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide ${isDark ? 'text-gray-400/80' : 'text-gray-600'}`}
                >
                    {HERO_COPY.subtitle}
                </motion.p>

                {/* Watch Demo Button - Minimal with Border Shine */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    className="flex justify-center pt-8"
                >
                    <button
                        onClick={onWatchDemo}
                        aria-label="Watch product demo"
                        className={`group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border transition-all duration-500 overflow-hidden ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white border-black/20 hover:bg-gray-50 hover:border-black/40 shadow-sm'}`}
                    >
                        {/* Shine Effect */}
                        <div className={`absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r z-0 ease-in-out ${isDark ? 'from-transparent via-white/20 to-transparent' : 'from-transparent via-black/5 to-transparent'}`} />

                        <Play className={`w-3 h-3 fill-current transition-colors relative z-10 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'}`} />
                        <span className={`text-xs uppercase tracking-widest font-medium transition-colors relative z-10 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'}`}>Watch the demo</span>
                    </button>
                </motion.div>
            </div>

            {/* Interactive Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="pt-4"
            >
                <WaitlistForm isDark={isDark} />
            </motion.div>
        </div>
    );
};
