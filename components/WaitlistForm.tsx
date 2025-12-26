import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowUp } from 'lucide-react';
import { WaitlistStatus } from '../types';
import { HERO_COPY } from '../constants';

interface WaitlistFormProps {
    isDark?: boolean;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ isDark = true }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<WaitlistStatus>(WaitlistStatus.IDLE);
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('');

    useEffect(() => {
        const text = "developer@localhost";
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setPlaceholder(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Check if email already exists in waitlist
    const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
        try {
            // Simulate API call - replace with real API
            await new Promise(resolve => setTimeout(resolve, 800));

            // Simulate: check localStorage for existing emails (for demo purposes)
            const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
            return existingEmails.includes(emailToCheck.toLowerCase());
        } catch (error) {
            console.error('Error checking email:', error);
            return false; // On error, allow submission (fail open)
        }
    };

    // Add email to waitlist
    const addToWaitlist = async (emailToAdd: string): Promise<boolean> => {
        try {
            // Simulate API call - replace with real API
            await new Promise(resolve => setTimeout(resolve, 700));

            // Simulate: store in localStorage (for demo purposes)
            const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
            if (!existingEmails.includes(emailToAdd.toLowerCase())) {
                existingEmails.push(emailToAdd.toLowerCase());
                localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails));
            }
            return true;
        } catch (error) {
            console.error('Error adding email:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            setStatus(WaitlistStatus.ERROR);
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus(WaitlistStatus.LOADING);

        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setStatus(WaitlistStatus.ERROR);
            setMessage("This email is already on the waitlist.");
            return;
        }

        // Add email to waitlist
        const success = await addToWaitlist(email);
        if (success) {
            setStatus(WaitlistStatus.SUCCESS);
            setMessage(HERO_COPY.success);
            setEmail('');
        } else {
            setStatus(WaitlistStatus.ERROR);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />
            <AnimatePresence mode='wait'>
                {status === WaitlistStatus.SUCCESS ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-400 mb-3">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome aboard</span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{message}</span>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="relative group"
                    >
                        <div className={`relative flex items-center h-14 backdrop-blur-sm rounded-2xl border transition-all duration-700 ease-in-out ${isDark ? 'bg-white/5 border-white/10 focus-within:bg-white/10 focus-within:border-white/20' : 'bg-white border-gray-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10'}`}>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status === WaitlistStatus.ERROR) setStatus(WaitlistStatus.IDLE);
                                }}
                                placeholder={placeholder}
                                className={`w-full h-full bg-transparent border-none px-6 placeholder-gray-500 focus:outline-none focus:ring-0 text-base ${isDark ? 'text-white' : 'text-gray-900'} ${status === WaitlistStatus.ERROR ? 'text-red-400' : ''
                                    }`}
                                disabled={status === WaitlistStatus.LOADING}
                                aria-label="Email address"
                                autoComplete="off"
                            />

                            <div className="pr-1.5">
                                <button
                                    type="submit"
                                    disabled={status === WaitlistStatus.LOADING}
                                    className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                                    aria-label="Join Waitlist"
                                >
                                    {status === WaitlistStatus.LOADING ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className={`w-4 h-4 border-2 border-t-transparent rounded-full ${isDark ? 'border-black' : 'border-white'}`}
                                        />
                                    ) : (
                                        <ArrowUp className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {status === WaitlistStatus.ERROR && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-6 -bottom-6 flex items-center text-[11px] text-red-500 font-medium"
                            >
                                <XCircle className="w-3 h-3 mr-1.5" />
                                {message}
                            </motion.div>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>

            {status !== WaitlistStatus.SUCCESS && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                    {/* Status Dot */}
                    <span className="relative flex h-1.5 w-1.5 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </span>

                    {/* Text Group */}
                    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-widest">
                        <span className={`transition-colors ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Beta</span>
                        <span className={`w-px h-3 transition-colors ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                        <span className={`transition-colors ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Limited early access rolling out weekly</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};