import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, LayoutGrid, GitMerge, Key, Keyboard, Brain, LucideIcon } from 'lucide-react';

interface FeaturesProps {
    isDark: boolean;
}

interface Feature {
    icon: LucideIcon;
    title: string;
    description: React.ReactNode;
    image?: string | null;
    note?: string;
}

const FEATURES: Feature[] = [
    {
        icon: Brain,
        title: 'Top-Tier Models',
        description: <>Access <em>GPT-4o</em>, <em>Claude 3.5 Sonnet</em>, <em>Gemini Pro</em> — switch between them <strong>mid-conversation</strong>.</>,
        image: '/features/models.png',
        note: '* Image generation models coming soon',
    },
    {
        icon: GitBranch,
        title: 'Fork & Experiment',
        description: <>Branch <em>any</em> conversation. Explore alternatives without losing your <strong>original thread</strong>.</>,
        image: '/features/branches.png',
    },
    {
        icon: LayoutGrid,
        title: 'Spatial Context',
        description: <>An <em>infinite canvas</em> for your AI sessions. See <strong>everything</strong> at once.</>,
    },
    {
        icon: GitMerge,
        title: 'Consensus Engine',
        description: <>Query <em>multiple models</em> simultaneously. Compare and <strong>merge</strong> their answers.</>,
    },
    {
        icon: Key,
        title: 'BYOK',
        description: <>Bring your own API keys. <strong>Zero markup</strong> on token costs.</>,
    },
    {
        icon: Keyboard,
        title: 'Keyboard First',
        description: <>Command palette, <em>vim-style</em> navigation, <strong>zero-mouse</strong> workflows.</>,
    },
];

export const Features: React.FC<FeaturesProps> = ({ isDark }) => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <div className={`relative w-full py-24 lg:py-40 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 lg:mb-28"
                >
                    <h2 className={`font-display text-4xl lg:text-5xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Features
                    </h2>
                </motion.div>

                {/* Feature Cards */}
                <div className="space-y-8">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        const ref = useRef(null);
                        const isInView = useInView(ref, { once: true, margin: "-50px" });

                        return (
                            <motion.div
                                key={feature.title}
                                ref={ref}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`
                                    relative rounded-3xl overflow-hidden
                                    border ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'}
                                `}
                            >
                                <div className="flex flex-col lg:flex-row items-stretch p-10 lg:p-14 gap-10 lg:gap-16 min-h-[400px]">

                                    {/* Left: Text Content */}
                                    <div className="lg:w-2/5 flex flex-col justify-between">
                                        {/* Top: Icon + Title side by side */}
                                        <div className="flex items-center gap-4">
                                            <Icon
                                                className={`w-7 h-7 flex-shrink-0 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                                                strokeWidth={1.5}
                                            />
                                            <h3 className={`font-display text-2xl lg:text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {feature.title}
                                            </h3>
                                        </div>

                                        {/* Bottom: Description */}
                                        <div className="mt-auto pt-8">
                                            <p className={`text-base lg:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {feature.description}
                                            </p>

                                            {/* Note */}
                                            {feature.note && (
                                                <p className={`mt-3 text-sm font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                                                    {feature.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Image or Placeholder */}
                                    <div className="lg:w-3/5">
                                        <div className={`
                                            relative aspect-[16/10] rounded-2xl overflow-hidden
                                            ${isDark ? 'bg-[#111]' : 'bg-gray-100'}
                                        `}>
                                            {feature.image ? (
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : (
                                                /* Placeholder with icon */
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div
                                                        className="absolute inset-0 opacity-[0.03]"
                                                        style={{
                                                            backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
                                                            backgroundSize: '24px 24px',
                                                        }}
                                                    />
                                                    <Icon
                                                        className={`w-20 h-20 ${isDark ? 'text-white/[0.06]' : 'text-black/[0.06]'}`}
                                                        strokeWidth={1}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};
