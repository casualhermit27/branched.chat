import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
    return (
        <header className="relative z-30 w-full px-6 py-8 flex justify-between items-center max-w-7xl mx-auto pointer-events-none">
            {/* Logo - Clickable to go home */}
            <Link to="/" className="pointer-events-auto cursor-pointer">
                <img src="/branched%20logo.svg" alt="branched.chat" className="h-20 w-auto" />
            </Link>

            {/* Pill Navbar */}
            <nav className="pointer-events-auto flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <button
                    onClick={onOpenAbout}
                    className="px-5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5"
                >
                    About
                </button>

                <div className="w-px h-4 bg-white/10 mx-1" />

                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
                    aria-label="Follow on X"
                >
                    {/* X Logo SVG */}
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </a>
            </nav>
        </header>
    );
};
