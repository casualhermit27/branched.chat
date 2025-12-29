import React from 'react';

interface FooterProps {
    isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
    return (
        <footer className={`w-full transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
            {/* Gradient line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

            <div className="max-w-4xl mx-auto px-6 py-20">
                {/* Centered layout */}
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Logo - bigger */}
                    <img
                        src="/branched%20logo.svg"
                        alt="branched.chat"
                        className={`h-16 w-auto ${!isDark ? 'brightness-0 opacity-70' : 'opacity-60'}`}
                    />

                    {/* Links row */}
                    <div className="flex items-center gap-8">
                        {/* Social */}
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs
                                border transition-all duration-200
                                ${isDark
                                    ? 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                                    : 'border-black/10 text-gray-500 hover:text-black hover:border-black/20'
                                }
                            `}
                        >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Follow updates
                        </a>

                        {/* Changelog - in progress */}
                        <span className={`
                            inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs
                            border cursor-not-allowed
                            ${isDark
                                ? 'border-white/5 text-gray-600'
                                : 'border-black/5 text-gray-400'
                            }
                        `}>
                            Changelog
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${isDark ? 'bg-white/5 text-gray-500' : 'bg-black/5 text-gray-400'}`}>
                                soon
                            </span>
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                        © 2025 branched.chat
                    </p>
                </div>
            </div>
        </footer>
    );
};
