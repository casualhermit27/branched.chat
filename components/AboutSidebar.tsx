import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AboutSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutSidebar: React.FC<AboutSidebarProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-2">about_me.txt</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="space-y-6">
                                <h2 className="text-2xl text-white font-light tracking-tight">
                                    Building the future of <span className="text-blue-400">thought</span>.
                                </h2>
                                <div className="space-y-4 text-sm leading-relaxed text-gray-400 font-light">
                                    <p>
                                        Branched is an experiment in non-linear reasoning. We believe that human thought isn't a single stream of tokens, but a branching tree of possibilities.
                                    </p>
                                    <p>
                                        Current AI interfaces force you into a linear chat. We're breaking that mold by giving you an infinite canvas to explore, diverge, and converge your ideas with multiple AI models simultaneously.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/5">
                                <h3 className="text-[10px] font-medium text-white/60 uppercase tracking-widest">The Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-gray-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-[10px] font-medium text-white/60 uppercase tracking-widest">Connect</h3>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-white">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-white">Follow on X</div>
                                        <div className="text-[10px] text-gray-500">@branched_chat</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
