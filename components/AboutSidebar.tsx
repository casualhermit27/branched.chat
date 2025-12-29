import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Twitter, Sparkles, Zap, GitBranch } from 'lucide-react';

interface AboutSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isDark?: boolean;
}

export const AboutSidebar: React.FC<AboutSidebarProps> = ({ isOpen, onClose, isDark = true }) => {
    const features = [
        { icon: GitBranch, label: 'Non-linear conversations' },
        { icon: Sparkles, label: 'Multiple AI models' },
        { icon: Zap, label: 'Instant switching' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className={`fixed inset-0 z-40 backdrop-blur-md ${isDark ? 'bg-black/70' : 'bg-white/70'}`}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0.8 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.8 }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        className={`
                            fixed right-0 top-0 h-full w-full max-w-lg z-50 
                            flex flex-col overflow-hidden
                            ${isDark
                                ? 'bg-[#0c0c0c] border-l border-white/[0.06]'
                                : 'bg-white border-l border-black/[0.06]'
                            }
                        `}
                    >
                        {/* Header */}
                        <div className={`
                            relative flex items-center justify-between px-8 py-6 
                            border-b ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}
                        `}>
                            {/* Gradient accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />

                            <div>
                                <h2 className={`font-display text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    About
                                </h2>
                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                    branched.chat
                                </p>
                            </div>

                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    p-2.5 rounded-xl transition-colors
                                    ${isDark
                                        ? 'text-gray-500 hover:text-white hover:bg-white/[0.06]'
                                        : 'text-gray-400 hover:text-black hover:bg-black/[0.04]'
                                    }
                                `}
                            >
                                <X className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Hero section */}
                            <div className="px-8 py-10">
                                <h3 className={`font-display text-3xl font-semibold tracking-tight leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Building the future of{' '}
                                    <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        thought
                                    </span>
                                </h3>
                                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Branched is an experiment in non-linear reasoning. We believe human thought isn't a single stream—it's a branching tree of possibilities.
                                </p>
                            </div>

                            {/* Feature pills */}
                            <div className={`px-8 py-6 border-y ${isDark ? 'border-white/[0.04] bg-white/[0.02]' : 'border-black/[0.04] bg-black/[0.01]'}`}>
                                <div className="flex flex-wrap gap-3">
                                    {features.map((feature, index) => {
                                        const Icon = feature.icon;
                                        return (
                                            <motion.div
                                                key={feature.label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + index * 0.05 }}
                                                className={`
                                                    flex items-center gap-2 px-4 py-2.5 rounded-full
                                                    border ${isDark
                                                        ? 'border-white/[0.08] bg-white/[0.03]'
                                                        : 'border-black/[0.06] bg-white'
                                                    }
                                                `}
                                            >
                                                <Icon className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {feature.label}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="px-8 py-8">
                                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Current AI interfaces force you into linear chat. We're breaking that mold by giving you an <em className={isDark ? 'text-white' : 'text-gray-900'}>infinite canvas</em> to explore, diverge, and converge ideas with multiple AI models simultaneously.
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="px-8 py-6">
                                <h4 className={`text-[10px] font-semibold uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Built with
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'].map((tech) => (
                                        <span
                                            key={tech}
                                            className={`
                                                px-3 py-1.5 text-xs font-medium rounded-lg
                                                ${isDark
                                                    ? 'bg-white/[0.04] text-gray-400 border border-white/[0.06]'
                                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                }
                                            `}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Connect */}
                            <div className="px-8 py-6 pb-10">
                                <h4 className={`text-[10px] font-semibold uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Connect
                                </h4>
                                <div className="space-y-3">
                                    <motion.a
                                        href="https://x.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={`
                                            flex items-center gap-4 p-4 rounded-2xl transition-colors group
                                            border ${isDark
                                                ? 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center
                                            ${isDark ? 'bg-white/10' : 'bg-gray-200'}
                                        `}>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-5 h-5 ${isDark ? 'fill-white' : 'fill-gray-900'}`}>
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                Follow on X
                                            </div>
                                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                @branched_chat
                                            </div>
                                        </div>
                                        <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className={`
                            px-8 py-4 border-t flex items-center justify-between
                            ${isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-gray-50'}
                        `}>
                            <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                © 2025 branched.chat
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Beta
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
