import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FeaturesProps {
    isDark: boolean;
}

const SpotlightCard: React.FC<{ children?: React.ReactNode; className?: string; spotlightColor?: string; isDark?: boolean }> = ({
    children,
    className = "",
    spotlightColor = "rgba(255,255,255,0.15)",
    isDark = true
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const baseClasses = isDark
        ? "border-white/5 bg-white/[0.02] hover:border-white/20 hover:shadow-white/5"
        : "border-black/10 bg-white hover:border-black/20 hover:shadow-xl shadow-md";

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-500 group ${baseClasses} ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-20"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
};

export const Features: React.FC<FeaturesProps> = ({ isDark }) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 space-y-24">
            {/* Header */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-blue-400/80' : 'text-blue-600/80'}`}>Everything you need</span>
                <h2 className={`text-4xl md:text-5xl font-extralight tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Built for the <span className={`font-serif italic ${isDark ? 'text-white/40' : 'text-gray-400'}`}>next generation</span> of thought.
                </h2>
            </div>

            {/* Main Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[minmax(280px,auto)]">

                {/* 1. Multi-Model - Large - Blue Shine */}
                <SpotlightCard
                    className="md:col-span-4 min-h-[380px]"
                    spotlightColor={isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}
                    isDark={isDark}
                >
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 brightness-150 contrast-150 mix-blend-overlay"></div>
                </SpotlightCard>

                {/* 2. Branching - Box - Purple Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[380px]"
                    spotlightColor={isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)"}
                    isDark={isDark}
                />

                {/* 3. Canvas - Box - Teal Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px]"
                    spotlightColor={isDark ? "rgba(20, 184, 166, 0.2)" : "rgba(20, 184, 166, 0.1)"}
                    isDark={isDark}
                />

                {/* 4. Comparison - Box - Amber Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px]"
                    spotlightColor={isDark ? "rgba(245, 158, 11, 0.2)" : "rgba(245, 158, 11, 0.1)"}
                    isDark={isDark}
                />

                {/* 5. BYOK - Box - Emerald Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px]"
                    spotlightColor={isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)"}
                    isDark={isDark}
                />

                {/* 6. Feature List / Premium Experience - Wide - Rose Shine */}
                <SpotlightCard
                    className="md:col-span-3 min-h-[280px]"
                    spotlightColor={isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.1)"}
                    isDark={isDark}
                />

                {/* 7. Callout - Wide - Default/White Shine over Dark bg (or Inverse for Light) */}
                <SpotlightCard className={`md:col-span-3 min-h-[280px] ${isDark ? 'bg-black/40 border-white/5' : 'bg-white border-black/10'}`} isDark={isDark}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 gap-4">
                        <h3 className={`text-2xl font-extralight ${isDark ? 'text-white' : 'text-black'}`}>Ready to diverge?</h3>
                        <div className={`w-12 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
                        <p className={`text-xs max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Join the waiting list today.
                        </p>
                    </div>
                </SpotlightCard>

            </div>
        </div>
    );
};
