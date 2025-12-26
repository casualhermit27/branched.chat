
import { Node } from './types';

// Level colors for connectors
// L1: Blue
// L2: Purple  
// L3: Cyan

export const TREE_NODES: Node[] = [
    // Root Input - 2 AI logos (Claude + GPT)
    { id: 'root', x: 50, y: 12, label: 'Input', type: 'input', active: true, delay: 0, icons: ['/logos/claude-ai-icon.svg', '/logos/openai.svg'] },

    // --- LEVEL 1 - Two branches (BLUE) - same delay ---
    { id: 'L1-Left', x: 24, y: 32, parentId: 'root', label: 'Claude 3.5', type: 'ai', active: true, delay: 0.4, color: '#3b82f6', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L1-Right', x: 76, y: 32, parentId: 'root', label: 'GPT-4o', type: 'ai', active: true, delay: 0.4, color: '#3b82f6', icons: ['/logos/openai.svg'] },

    // --- LEVEL 2 LEFT - Only 1 branch (PURPLE) ---
    { id: 'L2-Left-1', x: 18, y: 54, parentId: 'L1-Left', label: 'Explore', type: 'ai', active: true, delay: 0.9, color: '#a855f7', icons: ['/logos/gemini.svg'] },

    // --- LEVEL 2 RIGHT - 3 branches (PURPLE) - same delay for siblings ---
    { id: 'L2-Right-1', x: 65, y: 54, parentId: 'L1-Right', label: 'Structure', type: 'ai', active: true, delay: 0.9, color: '#a855f7', icons: ['/logos/mistral-ai_logo.svg'] },
    { id: 'L2-Right-2', x: 78, y: 54, parentId: 'L1-Right', label: 'Analyze', type: 'ai', active: true, delay: 0.9, color: '#a855f7', icons: ['/logos/ollama_light.svg'] },
    { id: 'L2-Right-3', x: 91, y: 54, parentId: 'L1-Right', label: 'Compare', type: 'ai', active: true, delay: 0.9, color: '#a855f7', icons: ['/logos/xai_light.svg'] },

    // --- LEVEL 3 LEFT - 3 branches (CYAN) - same delay for siblings ---
    { id: 'L3-Left-1', x: 6, y: 76, parentId: 'L2-Left-1', label: 'Refine', type: 'ai', active: true, delay: 1.4, color: '#22d3ee', icons: ['/logos/openai.svg'] },
    { id: 'L3-Left-2', x: 18, y: 76, parentId: 'L2-Left-1', label: 'Expand', type: 'ai', active: true, delay: 1.4, color: '#22d3ee', icons: ['/logos/claude-ai-icon.svg'] },
    { id: 'L3-Left-3', x: 30, y: 76, parentId: 'L2-Left-1', label: 'Iterate', type: 'ai', active: true, delay: 1.4, color: '#22d3ee', icons: ['/logos/gemini.svg'] },

    // --- LEVEL 3 RIGHT - 2 branches (CYAN) - same delay for siblings ---
    { id: 'L3-Right-1', x: 72, y: 76, parentId: 'L2-Right-2', label: 'Validate', type: 'ai', active: true, delay: 1.4, color: '#22d3ee', icons: ['/logos/gemini.svg'] },
    { id: 'L3-Right-2', x: 88, y: 76, parentId: 'L2-Right-3', label: 'Merge', type: 'ai', active: true, delay: 1.4, color: '#22d3ee', icons: ['/logos/claude-ai-icon.svg'] },
];

export const HERO_COPY = {
    title: "Think in Parallel.",
    subtitle: "The first AI workspace for non-linear reasoning. Stop chatting. Start building trees.",
    cta: "Request Access",
    success: "You're on the list. Expect an invite soon.",
};