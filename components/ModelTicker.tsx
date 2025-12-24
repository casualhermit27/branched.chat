import React from 'react';
import { motion } from 'framer-motion';

const MODELS = [
    { name: 'GPT-4o', logo: '/logos/openai.svg' },
    { name: 'Claude 3.5', logo: '/logos/claude-ai-icon.svg' },
    { name: 'Gemini Pro', logo: '/logos/gemini.svg' },
    { name: 'Mistral Large', logo: '/logos/mistral-ai_logo.svg' },
    { name: 'Grok', logo: '/logos/xai_light.svg' },
    { name: 'Llama 3', logo: '/logos/ollama_light.svg' },
];

interface ModelTickerProps {
    isDark?: boolean;
}

export const ModelTicker: React.FC<ModelTickerProps> = ({ isDark = true }) => {
    return (
        <div className={`w-full overflow-hidden py-12 border-y transition-colors duration-700 ease-in-out ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-gray-50/50'}`}>
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className={`text-xs font-medium uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Powering your thoughts with the world's best models</p>
            </div>

            <div className="relative flex overflow-hidden group mask-gradient">
                <div className="flex gap-16 sm:gap-32 items-center whitespace-nowrap animate-marquee px-8 sm:px-16">
                    {[...MODELS, ...MODELS, ...MODELS, ...MODELS].map((model, idx) => (
                        <div key={idx} className={`flex items-center gap-4 transition-all duration-300 ${isDark ? 'opacity-30 grayscale hover:grayscale-0 hover:opacity-100' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                            {/* Invert logo in light mode if it's likely a white-optimized logo */}
                            <img
                                src={model.logo}
                                alt={model.name}
                                className="h-5 w-auto"
                                style={{ filter: !isDark && ['GPT-4o', 'Grok', 'Llama 3', 'Mistral Large'].includes(model.name) ? 'invert(1)' : 'none' }}
                            />
                            <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-800'}`}>{model.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .mask-gradient {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};
