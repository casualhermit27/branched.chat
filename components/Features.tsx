import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Share2, Zap } from 'lucide-react';

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
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

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:bg-white/[0.04] ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export const Features: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto"
        >
            <SpotlightCard>
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/10">
                        <GitBranch className="w-6 h-6 text-gray-200" />
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-100 mb-2">Context Inheritance</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Every idea spawns a new path without losing the origin.</p>
            </SpotlightCard>

            <SpotlightCard>
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/10">
                        <Zap className="w-6 h-6 text-gray-200" />
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-100 mb-2">Multi-Model Arena</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Switch between alternate realities of a conversation instantly.</p>
            </SpotlightCard>

            <SpotlightCard>
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/10">
                        <Share2 className="w-6 h-6 text-gray-200" />
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-100 mb-2">Infinite Canvas</h3>
                <p className="text-xs text-gray-500 leading-relaxed">See your thought process laid out as an interactive map.</p>
            </SpotlightCard>
        </motion.div>
    );
};
