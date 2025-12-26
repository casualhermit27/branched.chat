import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`w-full overflow-hidden py-14 border-y transition-colors duration-700 ${isDark
                ? 'border-white/10 bg-[#0a0a0a]'
                : 'border-gray-200 bg-[#fafafa]'
                }`}
        >
            {/* Minimal Label */}
            <div className="text-center mb-12">
                <p className={`text-xs font-medium uppercase tracking-[0.25em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Powered by the best models
                </p>
            </div>

            {/* Minimal Marquee - No pills, just logos and text */}
            <div className="relative overflow-hidden mask-gradient">
                <div className="flex gap-16 sm:gap-20 items-center whitespace-nowrap animate-marquee">
                    {[...MODELS, ...MODELS, ...MODELS, ...MODELS].map((model, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 transition-opacity duration-300 ${isDark
                                ? 'opacity-60 hover:opacity-100'
                                : 'opacity-50 hover:opacity-90'
                                }`}
                        >
                            <img
                                src={model.logo}
                                alt={model.name}
                                className="h-5 w-auto"
                                style={{
                                    filter: !isDark && ['GPT-4o', 'Grok', 'Llama 3', 'Mistral Large'].includes(model.name) ? 'invert(1)' : 'none'
                                }}
                            />
                            <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                {model.name}
                            </span>
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
                    animation: marquee 50s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </motion.div>
    );
};
