
import { Node } from './types';

export const TREE_NODES: Node[] = [
    // Root Input (Centered, high up)
    { id: 'root', x: 50, y: 14, label: 'Input', type: 'input', active: true, delay: 0, icons: ['/logos/claude-ai-icon.svg', '/logos/openai.svg', '/logos/gemini.svg'] },

    // --- LEVEL 1 (Blue) ---
    // Left Branch starts the deep dive - Shifted inwards (20 -> 25)
    { id: 'L1-Left', x: 25, y: 32, parentId: 'root', label: 'Claude 3.5 Sonnet', type: 'ai', active: true, delay: 0.5, color: '#60a5fa', icons: ['/logos/claude-ai-icon.svg'] },
    // Right Branch (Sky Blue) - Shifted inwards (80 -> 75)
    { id: 'L1-Right', x: 75, y: 32, parentId: 'root', label: 'GPT-4o', type: 'ai', active: true, delay: 0.5, color: '#38bdf8', icons: ['/logos/openai.svg'] },

    // --- LEVEL 2 LEFT (Pink) ---
    // "Diverge" - The main active path continues down - Shifted inwards (15 -> 20)
    { id: 'L2-Left-Main', x: 20, y: 55, parentId: 'L1-Left', label: 'Diverge', type: 'ai', active: true, delay: 1.0, color: '#f472b6', icons: ['/logos/gemini.svg'] },

    // --- LEVEL 2 RIGHT (Sky Blue - Extended) ---
    // Shifted inwards (70 -> 65)
    { id: 'L2-Right-1', x: 65, y: 55, parentId: 'L1-Right', label: 'Structure', type: 'ai', active: true, delay: 1.1, color: '#38bdf8', icons: ['/logos/mistral-ai_logo.svg'] },
    // Shifted inwards (90 -> 85)
    { id: 'L2-Right-2', x: 85, y: 55, parentId: 'L1-Right', label: 'Analyze', type: 'ai', active: true, delay: 1.3, color: '#38bdf8', icons: ['/logos/ollama_light.svg'] },

    // --- LEVEL 3 LEFT (Violet) ---
    // "3 more under it" - Shifted inwards (5,15,25 -> 10,20,30)
    { id: 'L3-Left-1', x: 10, y: 78, parentId: 'L2-Left-Main', label: 'Refine', type: 'ai', active: true, delay: 1.5, color: '#a78bfa', icons: ['/logos/openai.svg'] },
    { id: 'L3-Left-2', x: 20, y: 78, parentId: 'L2-Left-Main', label: 'Expand', type: 'ai', active: true, delay: 1.7, color: '#a78bfa', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L3-Left-3', x: 30, y: 78, parentId: 'L2-Left-Main', label: 'Iterate', type: 'ai', active: true, delay: 1.9, color: '#a78bfa', icons: ['/logos/xai_light.svg'] },
];

export const HERO_COPY = {
    title: "Think in Parallel.",
    subtitle: "The first AI workspace for non-linear reasoning. Stop chatting. Start building trees.",
    cta: "Request Access",
    success: "You're on the list. Expect an invite soon.",
};