import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
    return (
        <header className="relative z-30 w-full px-4 sm:px-6 py-4 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 max-w-7xl mx-auto pointer-events-none">
            {/* Logo */}
            <Link to="/" className="pointer-events-auto cursor-pointer">
                <img
                    src="/branched%20logo.svg"
                    alt="branched.chat"
                    className={`h-12 sm:h-20 w-auto transition-all duration-500 ${!isDark ? 'brightness-0 opacity-80' : ''}`}
                />
            </Link>

            {/* Bordered Pill Navbar */}
            <nav className={`
                pointer-events-auto flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl 
                border transition-all duration-300
                ${isDark
                    ? 'bg-white/[0.02] border-white/[0.1]'
                    : 'bg-black/[0.02] border-black/[0.08]'
                }
            `}>


                {/* X/Twitter */}
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-150
                        ${isDark
                            ? 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
                            : 'text-gray-600 hover:text-black hover:bg-black/[0.05]'
                        }
                    `}
                    aria-label="Follow on X"
                >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>

                {/* Divider */}
                <div className={`w-px h-4 sm:h-5 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`} />

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`
                        p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-150 overflow-hidden
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
                                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                            ) : (
                                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </nav>
        </header>
    );
};
