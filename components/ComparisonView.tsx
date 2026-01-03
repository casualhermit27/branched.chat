import React from 'react';
import { motion } from 'framer-motion';

interface ComparisonViewProps {
    isDark?: boolean;
}

const CodeBlock: React.FC<{ code: string; lang: string; isDark: boolean }> = ({ code, lang, isDark }) => (
    <div className={`rounded-xl overflow-hidden my-4 group ${isDark ? 'bg-black/30 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
        <div className={`flex items-center justify-between px-4 py-2.5 ${isDark ? 'bg-white/5 border-b border-white/5' : 'bg-white border-b border-gray-100'}`}>
            <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm" />
            </div>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{lang}</span>
        </div>
        <div className="relative">
            <pre className={`p-4 text-xs sm:text-sm overflow-x-auto leading-relaxed font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <code>{code}</code>
            </pre>
            {/* Subtle gradient overlay for scroll indication */}
            <div className={`absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l ${isDark ? 'from-black/10' : 'from-white/0'} to-transparent`} />
        </div>
    </div>
);

const TableBlock: React.FC<{ headers: string[]; rows: string[][]; isDark: boolean }> = ({ headers, rows, isDark }) => (
    <div className={`rounded-xl overflow-hidden my-4 border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-sm`}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
                <tr className={isDark ? 'bg-white/5' : 'bg-gray-50/80'}>
                    {headers.map((h, i) => (
                        <th key={i} className={`px-4 py-3 font-medium uppercase tracking-wider text-[10px] ${isDark ? 'text-gray-400 border-b border-white/10' : 'text-gray-500 border-b border-gray-200'}`}>
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                {rows.map((row, i) => (
                    <tr key={i} className={`transition-colors duration-150 ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                        {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 ${isDark ? 'text-gray-300' : 'text-gray-600'} ${j === 0 ? 'font-medium' : ''}`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ChatPanel: React.FC<{
    model: string;
    logo: string;
    invertLogo?: boolean;
    isDark: boolean;
    delay: number;
    color: string;
    children: React.ReactNode;
}> = ({ model, logo, invertLogo, isDark, delay, color, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-1 min-h-[400px] md:min-h-0 flex flex-col rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ${isDark
                ? 'bg-[#111]/80 border border-white/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                : 'bg-white/80 border border-gray-200/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)]'
                }`}
        >
            {/* Header */}
            <div className={`flex items-center gap-3 px-5 py-4 border-b backdrop-blur-md sticky top-0 z-10 ${isDark ? 'bg-[#111]/90 border-white/[0.06]' : 'bg-white/90 border-gray-100'}`}>
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <img
                        src={logo}
                        alt={model}
                        className={`w-5 h-5 ${invertLogo && !isDark ? 'invert' : ''}`}
                    />
                </div>
                <div>
                    <h3 className={`text-sm font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model}
                    </h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                        <span className={`text-[10px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`flex-1 p-5 overflow-y-auto space-y-6 ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
                {children}
            </div>

            <style jsx global>{`
                .scrollbar-dark::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-dark::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-dark::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .scrollbar-dark::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                .scrollbar-light::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-light::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-light::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </motion.div>
    );
};

const UserMsg: React.FC<{ text: string; isDark: boolean; delay: number }> = ({ text, isDark, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        className="flex justify-end"
    >
        <div style={{ borderRadius: '20px 20px 4px 20px' }} className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${isDark
            ? 'bg-white text-black font-medium'
            : 'bg-black text-white font-medium'
            }`}>
            {text}
        </div>
    </motion.div>
);

const AIMsg: React.FC<{ children: React.ReactNode; isDark: boolean; delay: number }> = ({ children, isDark, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
    >
        {children}
    </motion.div>
);

const ComparisonView: React.FC<ComparisonViewProps> = ({ isDark = true }) => {
    return (
        <div className="relative w-full h-full flex flex-col pt-20 sm:pt-24 px-4 sm:px-6 pb-6 lg:pb-8">
            {/* Header Label (Optional, good for context if this view is standalone) */}
            {/* <div className="mb-6 opacity-0 animate-fade-in-up">...</div> */}

            {/* Two panels - stack vertically on small screens, side-by-side on larger */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                {/* GPT-4o Panel */}
                <ChatPanel model="GPT-4o" logo="/logos/openai.svg" invertLogo isDark={isDark} delay={0.1} color="#10a37f">
                    <UserMsg text="Quick comparison: Next.js App Router vs Pages Router for data fetching?" isDark={isDark} delay={0.2} />

                    <AIMsg isDark={isDark} delay={0.35}>
                        <p className="mb-4">The App Router represents a paradigm shift using <strong>React Server Components (RSC)</strong>. Unlike the Pages router which required specific data-fetching functions like <code className={`px-1.5 py-0.5 rounded text-xs ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>getServerSideProps</code>, the App Router allows you to fetch data directly inside your async components.</p>

                        <TableBlock
                            isDark={isDark}
                            headers={['Feature', 'Pages Router', 'App Router']}
                            rows={[
                                ['Component Type', 'Client (mostly)', 'Server (default)'],
                                ['Data Fetching', 'getServerSideProps', 'async/await'],
                                ['Caching', 'Manual setup', 'Automatic (Fetch API)'],
                                ['Streaming', 'Limited support', 'Built-in (Suspense)'],
                            ]}
                        />

                        <p className="mt-5 mb-3 text-xs font-medium uppercase tracking-wider opacity-60">Server Component Example</p>
                        <CodeBlock
                            isDark={isDark}
                            lang="tsx"
                            code={`// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // ISR built-in
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <main>{data.title}</main>
}`}
                        />
                    </AIMsg>
                </ChatPanel>

                {/* Claude Panel */}
                <ChatPanel model="Claude 3.5" logo="/logos/claude-ai-icon.svg" isDark={isDark} delay={0.15} color="#D97757">
                    <UserMsg text="Quick comparison: Next.js App Router vs Pages Router for data fetching?" isDark={isDark} delay={0.2} />

                    <AIMsg isDark={isDark} delay={0.35}>
                        <p className="mb-4">The transition moves logic from route handlers to the component tree itself. This eliminates the "waterfall" problem often seen in nested layouts by allowing parallel data fetching at the layout level.</p>

                        <TableBlock
                            isDark={isDark}
                            headers={['Aspect', 'Old (Pages)', 'New (App)']}
                            rows={[
                                ['Mental Model', 'Route-based', 'Component-based'],
                                ['Backend Logic', 'API Routes required', 'Direct DB access ok'],
                                ['Bundle Size', 'Larger (hydration)', 'Smaller (JS optional)'],
                                ['Layouts', '_app.js nesting', 'Nested layouts.js'],
                            ]}
                        />

                        <p className="mt-5 mb-3 text-xs font-medium uppercase tracking-wider opacity-60">Direct Database Access</p>
                        <CodeBlock
                            isDark={isDark}
                            lang="tsx"
                            code={`// app/users/page.tsx
import { db } from '@/lib/db'

// This runs ONLY on the server
export default async function UserList() {
  // Direct DB call - no API route needed
  const users = await db.user.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`}
                        />
                    </AIMsg>
                </ChatPanel>
            </div>
        </div>
    );
};

export default ComparisonView;
