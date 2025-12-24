import React from 'react';

interface FooterProps {
    isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
    const textColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const headColor = isDark ? 'text-white' : 'text-gray-900';
    const hoverColor = isDark ? 'hover:text-white' : 'hover:text-black';
    const borderColor = isDark ? 'border-white/5' : 'border-black/5';

    const links = {
        product: ['Features', 'Models', 'Integrations', 'Changelog'],
        company: ['About', 'Blog', 'Careers', 'Contact'],
        legal: ['Privacy', 'Terms', 'Security']
    };

    return (
        <footer className={`w-full py-16 px-6 border-t transition-colors duration-500 ${borderColor} ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-10">

                {/* Brand Column */}
                <div className="col-span-2 md:col-span-2 space-y-6">
                    <img
                        src="/branched%20logo.svg"
                        alt="branched.chat"
                        className={`h-8 w-auto ${!isDark ? 'brightness-0 opacity-80' : ''}`}
                    />
                    <p className={`text-sm ${textColor} max-w-xs leading-relaxed`}>
                        The first AI workspace designed for non-linear thought. Stop chatting linearly. Start building knowledge trees.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                        <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                        <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                    </div>
                </div>

                {/* Links Columns */}
                <div>
                    <h4 className={`text-sm font-medium mb-6 ${headColor}`}>Product</h4>
                    <ul className="space-y-4">
                        {links.product.map(link => (
                            <li key={link}>
                                <a href="#" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className={`text-sm font-medium mb-6 ${headColor}`}>Company</h4>
                    <ul className="space-y-4">
                        {links.company.map(link => (
                            <li key={link}>
                                <a href="#" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className={`text-sm font-medium mb-6 ${headColor}`}>Legal</h4>
                    <ul className="space-y-4">
                        {links.legal.map(link => (
                            <li key={link}>
                                <a href="#" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={`max-w-6xl mx-auto mt-16 pt-8 border-t ${borderColor} flex flex-col md:flex-row justify-between items-center gap-4`}>
                <p className={`text-xs ${textColor}`}>© 2025 branched.chat. All rights reserved.</p>
                <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    <span>System Status: Operational</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                </div>
            </div>
        </footer>
    );
};
