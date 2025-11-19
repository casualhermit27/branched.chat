import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Share2, Zap, Play, X } from 'lucide-react';
import TreeBackground from './components/TreeBackground';
import { WaitlistForm } from './components/WaitlistForm';
import { HERO_COPY } from './constants';

const App: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Lock body scroll when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVideoOpen]);

  return (
    <div className="relative min-h-screen bg-black text-primary selection:bg-white/20 selection:text-white overflow-hidden">
      
      {/* Main Content Wrapper - Scales down when video opens */}
      <motion.div 
        className="relative min-h-screen flex flex-col"
        animate={isVideoOpen ? { 
          scale: 0.92, 
          opacity: 0.4, 
          filter: "blur(8px)",
          borderRadius: "24px",
          overflow: "hidden" // Clips corners when scaled
        } : { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          borderRadius: "0px"
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Background Visuals */}
        <TreeBackground />
        
        {/* Navigation / Header */}
        <header className="relative z-10 w-full px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {/* Minimal Logo - Text Only */}
            <span className="text-lg font-semibold tracking-tight text-white">branched.chat</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-secondary font-medium">
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            
            {/* Badge + Demo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 min-h-[38px] rounded-full border border-white/20 text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[11px] font-medium text-gray-300 uppercase tracking-widest">Public Beta Soon</span>
              </div>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center gap-2 px-4 py-1.5 min-h-[38px] rounded-full bg-white text-black text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)]"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black group-hover:bg-black/20 transition-colors">
                  <Play className="w-3 h-3" />
                </div>
                Watch demo
              </button>
            </motion.div>

            {/* Hero Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-light tracking-tighter text-white"
            >
              <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent pb-2">
                {HERO_COPY.title}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed font-light"
            >
              {HERO_COPY.subtitle}
            </motion.p>

            {/* Interactive Form */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
            >
              <WaitlistForm />
            </motion.div>
          </div>

          {/* Features Grid (Bottom, Subtle) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto"
          >
            <div className="space-y-2 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 group cursor-default border border-transparent hover:border-white/[0.02]">
              <div className="flex justify-center mb-3">
                <GitBranch className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-gray-200">Branching Context</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Every idea spawns a new path without losing the origin.</p>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 group cursor-default border border-transparent hover:border-white/[0.02]">
              <div className="flex justify-center mb-3">
                <Zap className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-gray-200">Fluid Exploration</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Switch between alternate realities of a conversation instantly.</p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 group cursor-default border border-transparent hover:border-white/[0.02]">
               <div className="flex justify-center mb-3">
                <Share2 className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-gray-200">Visual Maps</h3>
              <p className="text-xs text-gray-500 leading-relaxed">See your thought process laid out as an interactive map.</p>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 w-full py-6 text-center">
          <p className="text-[10px] text-gray-700 uppercase tracking-widest">
            © 2025 Branched.chat — Define the future of thought.
          </p>
        </footer>
      </motion.div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8 h-screen">
            {/* Click backdrop to close */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsVideoOpen(false)} 
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              className="relative w-full max-w-5xl aspect-video bg-[#050505] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center group"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Placeholder */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
                <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Product Demo Coming Soon</p>
              </div>

              {/* Scanlines/Texture for placeholder aesthetic */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;