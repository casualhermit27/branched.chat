import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    GitBranch, Zap, LayoutGrid,
    GitMerge, Key, MousePointer2,
    Cpu, Layers, Keyboard, FileText
} from 'lucide-react';

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

    // Extract RGB from RGBA to create a stronger border color
    const rgbParts = spotlightColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    const borderColor = rgbParts ? `rgba(${rgbParts[1]}, ${rgbParts[2]}, ${rgbParts[3]}, 0.6)` : spotlightColor;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ease-in-out group ${baseClasses} ${className}`}
        >
            {/* Border Reflection */}
            <div
                className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(250px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 80%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

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
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const subTextColor = isDark ? 'text-gray-400' : 'text-gray-600';

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
                    className="md:col-span-4 min-h-[380px] p-8 flex flex-col justify-between"
                    spotlightColor={isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}
                    isDark={isDark}
                >
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 brightness-150 contrast-150 mix-blend-overlay"></div>
                    <div className="relative z-10 space-y-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                            <Cpu className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-light ${textColor}`}>Orchestrate Intelligence</h3>
                            <p className={`mt-2 ${subTextColor} max-w-sm`}>
                                Seamlessly combine GPT-4, Claude 3.5, and Gemini in a single unified workflow. Switch models per message.
                            </p>
                        </div>
                    </div>
                </SpotlightCard>

                {/* 2. Branching - Box - Purple Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[380px] p-8 flex flex-col justify-between"
                    spotlightColor={isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)"}
                    isDark={isDark}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                        <GitBranch className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-xl font-light ${textColor}`}>Non-Linear Chat</h3>
                        <p className={`mt-2 ${subTextColor} text-sm`}>
                            Never lose context. Diverge at any point to explore new ideas without cluttering the main thread.
                        </p>
                    </div>
                </SpotlightCard>

                {/* 3. Canvas - Box - Teal Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px] p-8 flex flex-col justify-between"
                    spotlightColor={isDark ? "rgba(20, 184, 166, 0.2)" : "rgba(20, 184, 166, 0.1)"}
                    isDark={isDark}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-teal-500/10' : 'bg-teal-50'}`}>
                        <LayoutGrid className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-lg font-medium ${textColor}`}>Infinite Canvas</h3>
                        <p className={`mt-2 ${subTextColor} text-sm leading-relaxed`}>
                            Spatial memory for your ideas. Pan, zoom, and organize your thoughts visually.
                        </p>
                    </div>
                </SpotlightCard>

                {/* 4. Synthesize (Merged) - Box - Carbon/Orange Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px] p-8 flex flex-col justify-between"
                    spotlightColor={isDark ? "rgba(249, 115, 22, 0.2)" : "rgba(249, 115, 22, 0.1)"}
                    isDark={isDark}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                        <GitMerge className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-lg font-medium ${textColor}`}>Synthesize</h3>
                        <p className={`mt-2 ${subTextColor} text-sm leading-relaxed`}>
                            Converge your thoughts. Merge multiple branches into a single comprehensive summary.
                        </p>
                    </div>
                </SpotlightCard>

                {/* 5. BYOK - Box - Emerald Shine */}
                <SpotlightCard
                    className="md:col-span-2 min-h-[280px] p-8 flex flex-col justify-between"
                    spotlightColor={isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)"}
                    isDark={isDark}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                        <Key className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-lg font-medium ${textColor}`}>Privacy First</h3>
                        <p className={`mt-2 ${subTextColor} text-sm leading-relaxed`}>
                            Bring Your Own Key. Your data flows directly to the providers.
                        </p>
                    </div>
                </SpotlightCard>

                {/* 6. Feature List - Wide - Rose Shine */}
                <SpotlightCard
                    className="md:col-span-3 min-h-[280px] p-8"
                    spotlightColor={isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.1)"}
                    isDark={isDark}
                >
                    <div className="flex flex-col h-full justify-between">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-rose-500/10' : 'bg-rose-50'}`}>
                            <Zap className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                        </div>
                        <div className="space-y-4">
                            <h3 className={`text-xl font-light ${textColor}`}>Power User Tools</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`flex items-center gap-2 text-sm ${subTextColor}`}>
                                    <Keyboard className="w-4 h-4 opacity-50" />
                                    <span>Keyboard Centric</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${subTextColor}`}>
                                    <Layers className="w-4 h-4 opacity-50" />
                                    <span>Local History</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${subTextColor}`}>
                                    <FileText className="w-4 h-4 opacity-50" />
                                    <span>Markdown Export</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${subTextColor}`}>
                                    <MousePointer2 className="w-4 h-4 opacity-50" />
                                    <span>Context Selection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

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
