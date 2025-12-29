import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    onOpenAbout: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout, isDark, toggleTheme }) => {
    return (
        <header className="relative z-30 w-full px-6 py-8 flex justify-between items-center max-w-7xl mx-auto pointer-events-none">
            {/* Logo */}
            <Link to="/" className="pointer-events-auto cursor-pointer">
                <img
                    src="/branched%20logo.svg"
                    alt="branched.chat"
                    className={`h-20 w-auto transition-all duration-500 ${!isDark ? 'brightness-0 opacity-80' : ''}`}
                />
            </Link>

            {/* Bordered Pill Navbar */}
            <nav className={`
                pointer-events-auto flex items-center gap-1 p-1.5 rounded-2xl 
                border transition-all duration-300
                ${isDark
                    ? 'bg-white/[0.02] border-white/[0.1]'
                    : 'bg-black/[0.02] border-black/[0.08]'
                }
            `}>
                {/* About Button */}
                <button
                    onClick={onOpenAbout}
                    className={`
                        group px-5 py-2 rounded-xl text-xs font-medium uppercase tracking-wider 
                        transition-all duration-150
                        ${isDark
                            ? 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                            : 'text-gray-600 hover:text-black hover:bg-black/[0.05]'
                        }
                    `}
                >
                    About
                </button>

                {/* Divider */}
                <div className={`w-px h-5 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`} />

                {/* X/Twitter */}
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        p-2.5 rounded-xl transition-all duration-150
                        ${isDark
                            ? 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                            : 'text-gray-600 hover:text-black hover:bg-black/[0.05]'
                        }
                    `}
                    aria-label="Follow on X"
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>

                {/* Divider */}
                <div className={`w-px h-5 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`} />

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`
                        p-2.5 rounded-xl transition-all duration-150 overflow-hidden
                        ${isDark
                            ? 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                            : 'text-gray-600 hover:text-black hover:bg-black/[0.05]'
                        }
                    `}
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? "dark" : "light"}
                            initial={{ y: -12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 12, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {isDark ? (
                                <Moon className="w-4 h-4" strokeWidth={1.5} />
                            ) : (
                                <Sun className="w-4 h-4" strokeWidth={1.5} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </nav>
        </header>
    );
};
