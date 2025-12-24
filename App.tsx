import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import TreeBackground from './components/TreeBackground';
import { AboutSidebar } from './components/AboutSidebar';
import { motion } from 'framer-motion';

import { ModelTicker } from './components/ModelTicker';

import { VideoModal } from './components/VideoModal';

function App() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className={`relative min-h-screen transition-colors duration-700 ease-in-out overflow-x-hidden font-sans ${isDark ? 'bg-[#0a0a0a] text-white selection:bg-blue-500/30' : 'bg-[#fafafa] text-gray-900 selection:bg-blue-500/20'}`}>
            {/* Background is persistent but responsive to theme via props or CSS classes */}
            <TreeBackground isDark={isDark} />

            {/* Overlays */}
            <AboutSidebar isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoId="dQw4w9WgXcQ" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header onOpenAbout={() => setIsAboutOpen(true)} isDark={isDark} toggleTheme={toggleTheme} />

                <main className="flex-grow flex flex-col relative">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex flex-col justify-start pt-[18vh] gap-32 pb-32"
                    >
                        <section className="flex items-center justify-center px-6 relative">
                            <Hero onWatchDemo={() => setIsVideoOpen(true)} isDark={isDark} />
                        </section>

                        <div className="pt-32 w-full">
                            <ModelTicker isDark={isDark} />
                        </div>

                        <Features isDark={isDark} />
                    </motion.div>
                </main>

                <footer className={`py-8 text-center text-[10px] uppercase tracking-widest transition-colors duration-700 ease-in-out ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    © 2025 branched.chat — Define the future of thought.
                </footer>
            </div>
        </div>
    );
}

export default App;
