import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react'; // Using X icon for close button, but for logo we might want custom SVG

export const About: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative z-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl"
            >
                {/* Window Header */}
                <div className="h-10 border-b border-white/10 bg-white/5 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">about_me.txt</div>
                    <div className="w-12" /> {/* Spacer for balance */}
                </div>

                {/* Window Content */}
                <div className="p-8 md:p-12 space-y-8 text-gray-300 font-light leading-relaxed">
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl text-white font-medium">Building the future of thought.</h2>
                        <p>
                            Branched is an experiment in non-linear reasoning. We believe that human thought isn't a single stream of tokens, but a branching tree of possibilities.
                        </p>
                        <p>
                            Current AI interfaces force you into a linear chat. We're breaking that mold by giving you an infinite canvas to explore, diverge, and converge your ideas with multiple AI models simultaneously.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">The Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'].map((tech) => (
                                <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
