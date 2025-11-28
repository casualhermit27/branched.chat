import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string; // Optional YouTube Video ID
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }) => { // Default to a placeholder if none provided
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/5 backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Video Placeholder */}
                            <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-50" />

                                {/* Grid Pattern Overlay */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-medium text-white tracking-tight">Product Demo</h3>
                                        <p className="text-sm text-white/40 mt-1 uppercase tracking-widest">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
