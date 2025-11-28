import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowUp } from 'lucide-react';
import { WaitlistStatus } from '../types';
import { HERO_COPY } from '../constants';

export const WaitlistForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<WaitlistStatus>(WaitlistStatus.IDLE);
    const [message, setMessage] = useState('');

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
        <div className="w-full max-w-md mx-auto mt-12">
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
                        className="flex items-center justify-center p-4 text-green-400 bg-green-400/10 rounded-lg border border-green-400/20"
                    >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">{message}</span>
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
                        <div className="relative flex items-center h-14 bg-[#1e1e1e] rounded-lg border border-white/10 focus-within:border-white/30 transition-colors shadow-lg">
                            {/* Command Prompt Symbol */}
                            <div className="pl-4 pr-2 text-gray-500 font-mono select-none">{'>'}</div>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status === WaitlistStatus.ERROR) setStatus(WaitlistStatus.IDLE);
                                }}
                                placeholder="type email..."
                                className={`w-full h-full bg-transparent border-none text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono text-sm ${status === WaitlistStatus.ERROR ? 'text-red-400' : ''
                                    }`}
                                disabled={status === WaitlistStatus.LOADING}
                                aria-label="Email address"
                                autoComplete="off"
                            />

                            {/* Blinking Cursor Indicator (Visible when empty or focused) */}
                            {!email && (
                                <div
                                    className="absolute left-[calc(1rem+1.5ch)] top-1/2 -translate-y-1/2 w-2 h-5 bg-white/50 pointer-events-none"
                                    style={{ animation: 'blink 1s step-end infinite' }}
                                />
                            )}

                            <div className="pr-2">
                                <button
                                    type="submit"
                                    disabled={status === WaitlistStatus.LOADING}
                                    className="flex items-center justify-center w-8 h-8 rounded bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Join Waitlist"
                                >
                                    {status === WaitlistStatus.LOADING ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <ArrowUp className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {status === WaitlistStatus.ERROR && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 -bottom-8 flex items-center text-xs text-red-400 font-mono"
                            >
                                <XCircle className="w-3 h-3 mr-1" />
                                {message}
                            </motion.div>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center text-xs text-gray-500 font-mono uppercase tracking-widest"
            >
                Limited early access rolling out weekly.
            </motion.p>
        </div>
    );
};