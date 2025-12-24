import React, { useState } from 'react';
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
            {/* Logo - Clickable to go home */}
            <Link to="/" className="pointer-events-auto cursor-pointer">
                <img
                    src={isDark ? "/branched%20logo.svg" : "/branched%20logo.svg"}
                    alt="branched.chat"
                    className={`h-20 w-auto transition-all duration-700 ease-in-out ${!isDark ? 'brightness-0 opacity-80' : ''}`}
                />
            </Link>

            {/* Pill Navbar */}
            <nav className={`pointer-events-auto flex items-center p-1.5 rounded-full border backdrop-blur-md transition-all duration-700 ease-in-out ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <button
                    onClick={onOpenAbout}
                    className={`px-5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-700 ease-in-out ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'}`}
                >
                    About
                </button>

                <div className={`w-px h-4 mx-1 transition-colors duration-700 ease-in-out ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-full transition-all duration-700 ease-in-out flex items-center justify-center ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'}`}
                    aria-label="Follow on X"
                >
                    {/* X Logo SVG */}
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </a>

                <div className={`w-px h-4 mx-1 transition-colors duration-700 ease-in-out ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

                <button
                    onClick={toggleTheme}
                    className={`px-3 py-1.5 rounded-full transition-all duration-700 ease-in-out flex items-center justify-center overflow-hidden w-[40px] ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'}`}
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? "dark" : "light"}
                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                        >
                            {isDark ? (
                                <Moon className="w-4 h-4" />
                            ) : (
                                <Sun className="w-4 h-4" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </nav>
        </header>
    );
};
