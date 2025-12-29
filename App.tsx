import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ModelTicker } from './components/ModelTicker';
import { AboutSidebar } from './components/AboutSidebar';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';

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
            {/* Overlays */}
            <AboutSidebar isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} isDark={isDark} />
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoId="dQw4w9WgXcQ" />

            {/* Content */}
            <div className="relative z-10">
                {/* Section 1: Hero with Header inside */}
                <Hero
                    onWatchDemo={() => setIsVideoOpen(true)}
                    isDark={isDark}
                    onOpenAbout={() => setIsAboutOpen(true)}
                    toggleTheme={toggleTheme}
                />

                {/* Section 2: Models Supported Band */}
                <ModelTicker isDark={isDark} />

                {/* Section 3: Features */}
                <Features isDark={isDark} />

                {/* Footer */}
                <Footer isDark={isDark} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `html { scroll-behavior: smooth; }`
            }} />
        </div>
    );
}

export default App;
