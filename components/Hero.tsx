import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { HERO_COPY } from '../constants';

interface HeroProps {
    onWatchDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchDemo }) => {
    return (
        <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge + Demo */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex flex-col sm:flex-row items-center gap-3"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 min-h-[38px] rounded-full border border-white/20 text-white/80">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[11px] font-medium text-gray-300 uppercase tracking-widest">Public Beta Soon</span>
                </div>

                <button
                    onClick={onWatchDemo}
                    aria-label="Watch product demo"
                    className="relative overflow-hidden group inline-flex items-center gap-2 px-5 py-2 min-h-[40px] rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                    <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300">
                        <Play className="w-3 h-3 fill-current" />
                    </div>
                    <span className="relative z-10">Watch demo</span>
                </button>
            </motion.div>

            {/* Hero Typography */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-7xl font-light tracking-tighter text-white"
            >
                <span
                    className="block bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent pb-2"
                >
                    {HERO_COPY.title}
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed font-light"
            >
                {HERO_COPY.subtitle}
            </motion.p>

            {/* Interactive Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <WaitlistForm />
            </motion.div>
        </div>
    );
};
