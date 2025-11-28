import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/20 rounded-full group";

  const variants = {
    // Updated primary to have a subtle vertical gradient for volume
    primary: "bg-gradient-to-b from-white to-gray-300 text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-transparent hover:to-white hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Gradient Shine Effect */}
      {variant === 'primary' && !isLoading && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-0" />
      )}

      <span className="relative z-10 flex items-center">
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!isLoading && children}
        {!isLoading && variant === 'primary' && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />}
      </span>
    </button>
  );
};