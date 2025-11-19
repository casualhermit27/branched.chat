import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { WaitlistStatus } from '../types';
import { Button } from './Button';
import { HERO_COPY } from '../constants';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>(WaitlistStatus.IDLE);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus(WaitlistStatus.ERROR);
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus(WaitlistStatus.LOADING);

    // Simulate API Call
    setTimeout(() => {
      setStatus(WaitlistStatus.SUCCESS);
      setMessage(HERO_COPY.success);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
      <AnimatePresence mode='wait'>
        {status === WaitlistStatus.SUCCESS ? (
          <motion.div
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative group"
          >
            <div className="relative flex items-center h-14">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === WaitlistStatus.ERROR) setStatus(WaitlistStatus.IDLE);
                }}
                placeholder="name@work.com"
                className={`w-full h-full bg-white/[0.07] backdrop-blur-xl border transition-all duration-300 rounded-full pl-6 pr-32 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/10 ${
                  status === WaitlistStatus.ERROR ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                }`}
                disabled={status === WaitlistStatus.LOADING}
              />
              <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center">
                <Button 
                  type="submit" 
                  isLoading={status === WaitlistStatus.LOADING}
                  className="h-full px-6 shadow-lg shadow-black/20" 
                >
                  Join
                </Button>
              </div>
            </div>
            
            {status === WaitlistStatus.ERROR && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-6 -bottom-8 flex items-center text-xs text-red-400"
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
        className="mt-6 text-center text-sm text-gray-600"
      >
        Limited early access spots available for Q2 2026.
      </motion.p>
    </div>
  );
};