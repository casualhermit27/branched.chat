import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, LayoutGrid, GitMerge, Key, Keyboard } from 'lucide-react';

interface FeaturesProps {
    isDark: boolean;
}

const FEATURES = [
    {
        icon: GitBranch,
        title: 'Branching',
        description: 'Diverge your conversation at any point to explore different directions. Create parallel threads and compare outcomes side by side.',
        video: null,
        pastel: { bg: '#E9D5FF', icon: '#7C3AED' }, // Solid purple pastel
    },
    {
        icon: LayoutGrid,
        title: 'Infinite Canvas',
        description: 'Navigate your conversations spatially on an infinite canvas. Pan, zoom, and organize your thought process visually.',
        video: null,
        pastel: { bg: '#BBF7D0', icon: '#16A34A' }, // Solid green pastel
    },
    {
        icon: GitMerge,
        title: 'Synthesize',
        description: 'Merge insights from multiple branches into unified summaries. Let AI help you find the best ideas across conversations.',
        video: null,
        pastel: { bg: '#A5F3FC', icon: '#0891B2' }, // Solid cyan pastel
    },
    {
        icon: Key,
        title: 'Your API Keys',
        description: 'Use your own API keys and connect directly to providers. Full control over your usage, costs, and data.',
        video: null,
        pastel: { bg: '#FECACA', icon: '#DC2626' }, // Solid red/coral pastel
    },
    {
        icon: Keyboard,
        title: 'Keyboard-First',
        description: 'Navigate, branch, switch models, and manage conversations entirely from your keyboard. Built for power users.',
        video: null,
        pastel: { bg: '#FDE68A', icon: '#CA8A04' }, // Solid yellow pastel
    },
];

const FeatureRow: React.FC<{
    feature: typeof FEATURES[0];
    isDark: boolean;
    index: number;
    reversed: boolean;
}> = ({ feature, isDark, index, reversed }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = feature.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 rounded-2xl overflow-hidden`}
        >
            {/* Content side */}
            <div className={`w-full lg:w-1/2 p-10 lg:p-14 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] ${isDark ? 'bg-[#111]' : 'bg-[#eaeaea]'}`}>
                {/* Top: Icon + Title */}
                <div className="flex items-center gap-4">
                    <Icon className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} strokeWidth={1.5} />
                    <h3 className={`text-2xl lg:text-3xl font-medium tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {feature.title}
                    </h3>
                </div>

                {/* Bottom: Description */}
                <p className={`text-base lg:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                </p>
            </div>

            {/* Video side */}
            <div className={`relative w-full lg:w-1/2 min-h-[280px] lg:min-h-[400px] ${isDark ? 'bg-[#0c0c0c]' : 'bg-[#1a1a1a]'}`}>
                {feature.video ? (
                    <video
                        src={feature.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <>
                        {/* Grid pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="w-16 h-16 text-white/[0.06]" strokeWidth={0.5} />
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export const Features: React.FC<FeaturesProps> = ({ isDark }) => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <div className={`relative w-full py-20 lg:py-28 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
            {/* Header */}
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="text-center px-6 mb-14 lg:mb-20"
            >
                <h2 className={`text-4xl lg:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Features
                </h2>
            </motion.div>

            {/* Feature rows - alternating */}
            <div className="max-w-6xl mx-auto px-6 space-y-5">
                {FEATURES.map((feature, index) => (
                    <FeatureRow
                        key={feature.title}
                        feature={feature}
                        isDark={isDark}
                        index={index}
                        reversed={index % 2 === 1}
                    />
                ))}
            </div>
        </div>
    );
};
