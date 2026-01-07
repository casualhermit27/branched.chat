import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, LayoutGrid, Sparkles, Key, Brain, MousePointerClick, LucideIcon } from 'lucide-react';

interface FeaturesProps {
    isDark: boolean;
}

interface Feature {
    icon: LucideIcon;
    title: string;
    description: React.ReactNode;
    image?: string | null;
    logos?: string[];
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
        title: 'Compare Side-by-Side',
        description: <>No more copy-pasting between tabs. Visualize differences in <em>tone</em>, <em>logic</em>, and <em>accuracy</em> instantly. The best answer isn't always the first one—it's the <strong>right one</strong>.</>,
        image: '/features/compare.png',
    },
    {
        icon: MousePointerClick,
        title: 'Branch from Text',
        description: <>Select any text and <em>ask questions</em> about it. Branch out from <strong>any point</strong> in the conversation to explore deeper.
        </>,
        image: '/features/text branch.png',
    },
    {
        icon: Sparkles,
        title: 'Synthesize',
        description: <>Reviewing multiple answers is <em>time-consuming</em>. Select your top responses and let a <strong>Judge Model</strong> (e.g. <em>GPT-4o</em>) compile them into one <strong>finalized, ready-to-use output</strong> instantly.</>,
        image: '/features/synth.png',
    },
    {
        icon: Key,
        title: 'BYOK',
        description: <>Bring your own keys for <strong>OpenAI</strong>, <strong>Anthropic</strong>, <strong>Gemini</strong>, <strong>Mistral</strong>, <strong>xAI</strong>, and <strong>Ollama</strong>.
            <br />
            <br />
            <span className="text-sm opacity-50">Keys are stored locally in your browser. We never see them.</span>
        </>,
        logos: [
            '/logos/openai.svg',
            '/logos/claude-ai-icon.svg',
            '/logos/gemini.svg',
            '/logos/mistral-ai_logo.svg',
            '/logos/xai_light.svg',
            '/logos/ollama_light.svg'
        ]
    },
];

export const Features: React.FC<FeaturesProps> = ({ isDark }) => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <div className={`relative w-full py-24 lg:py-40 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10">

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
                <div className="space-y-10 lg:space-y-12">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        const ref = useRef(null);
                        const isInView = useInView(ref, { once: true, margin: "-50px" });

                        // Force dark background for BYOK (logos) or if global theme is dark
                        const isLookDark = isDark || !!feature.logos;

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
                                <div className="flex flex-col lg:flex-row items-stretch p-12 lg:p-16 gap-12 lg:gap-20 min-h-[480px] lg:min-h-[520px]">

                                    {/* Left: Text Content */}
                                    <div className="lg:w-1/3 flex flex-col justify-between">
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
                                    <div className="lg:w-2/3">
                                        <div className={`
                                            relative aspect-[16/8] rounded-2xl overflow-hidden
                                            ${isLookDark ? 'bg-black' : 'bg-white'}
                                        `}>
                                            {feature.image ? (
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : feature.logos ? (
                                                <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
                                                    <div className="grid grid-cols-3 gap-10 lg:gap-14 w-fit place-items-center">
                                                        {feature.logos.map((logo) => (
                                                            <div key={logo} className="relative w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                                                                <img
                                                                    src={logo}
                                                                    alt="Model logo"
                                                                    className={`w-full h-full object-contain opacity-90
                                                                        ${isLookDark && !logo.includes('light') && !logo.includes('gemini') && !logo.includes('claude') && !logo.includes('openai') ? 'invert' : ''}
                                                                        ${!isLookDark && logo.includes('light') ? 'invert' : ''}
                                                                    `}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Placeholder with icon */
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Icon
                                                        className={`w-20 h-20 ${isLookDark ? 'text-white/[0.06]' : 'text-black/[0.06]'}`}
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
        </div >
    );
};
