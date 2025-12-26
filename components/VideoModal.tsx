import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        {/* Modal Container - macOS Tahoe style animation */}
                        <motion.div
                            initial={{
                                scale: 0.5,
                                opacity: 0,
                                y: 40,
                                borderRadius: 40
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                borderRadius: 16
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0,
                                y: 20,
                                transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1] // Custom spring-like easing
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-black overflow-hidden border border-white/10"
                            style={{ borderRadius: 16 }}
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.2 }}
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </motion.button>

                            {/* Video Placeholder */}
                            <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-50" />

                                {/* Grid Pattern Overlay */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.4 }}
                                    className="relative z-10 flex flex-col items-center gap-4"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-medium text-white tracking-tight">Product Demo</h3>
                                        <p className="text-sm text-white/40 mt-1 uppercase tracking-widest">Coming Soon</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
