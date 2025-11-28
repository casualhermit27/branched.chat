import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import TreeBackground from './components/TreeBackground';
import { AboutSidebar } from './components/AboutSidebar';
import { motion } from 'framer-motion';

import { VideoModal } from './components/VideoModal';

function App() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
            {/* Background is persistent */}
            <TreeBackground />

            {/* Overlays */}
            <AboutSidebar isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoId="dQw4w9WgXcQ" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header onOpenAbout={() => setIsAboutOpen(true)} />

                <main className="flex-grow flex flex-col relative">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex flex-col justify-center gap-16 pb-20"
                    >
                        <section className="flex items-center justify-center px-6 relative">
                            <Hero onWatchDemo={() => setIsVideoOpen(true)} />
                        </section>
                        <Features />
                    </motion.div>
                </main>

                <footer className="py-8 text-center text-white/20 text-[10px] uppercase tracking-widest">
                    © 2025 branched.chat — Define the future of thought.
                </footer>
            </div>
        </div>
    );
}

export default App;
