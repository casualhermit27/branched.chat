import React from 'react';
import { motion } from 'framer-motion';

interface ComparisonViewProps {
    isDark?: boolean;
}

const CodeBlock: React.FC<{ code: string; lang: string; isDark: boolean }> = ({ code, lang, isDark }) => (
    <div className={`rounded-xl overflow-hidden my-3 ${isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-gray-900 border border-gray-800'}`}>
        <div className={`flex items-center justify-between px-4 py-2 ${isDark ? 'bg-white/5' : 'bg-gray-800'}`}>
            <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{lang}</span>
        </div>
        <pre className="p-4 text-xs sm:text-sm text-gray-300 overflow-x-auto leading-relaxed font-mono">
            <code>{code}</code>
        </pre>
    </div>
);

const TableBlock: React.FC<{ headers: string[]; rows: string[][]; isDark: boolean }> = ({ headers, rows, isDark }) => (
    <div className={`rounded-xl overflow-hidden my-3 border ${isDark ? 'border-white/10 bg-[#1a1a1a]' : 'border-gray-200 bg-white'}`}>
        <table className="w-full text-left text-xs sm:text-sm">
            <thead>
                <tr className={isDark ? 'bg-white/5 border-b border-white/10' : 'bg-gray-50 border-b border-gray-200'}>
                    {headers.map((h, i) => (
                        <th key={i} className={`px-4 py-3 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                {rows.map((row, i) => (
                    <tr key={i} className={isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}>
                        {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} ${j === 0 ? 'font-medium' : ''}`}>
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
            transition={{ duration: 0.6, delay }}
            className={`flex-1 flex flex-col rounded-2xl overflow-hidden ${isDark
                ? 'bg-[#111] border border-white/[0.08]'
                : 'bg-white border border-gray-200 shadow-sm'
                }`}
        >
            {/* Header */}
            <div className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
                <img
                    src={logo}
                    alt={model}
                    className={`w-5 h-5 ${invertLogo && !isDark ? 'invert' : ''}`}
                />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {model}
                </span>
                <span
                    className="ml-auto text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    Thinking...
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6">
                {children}
            </div>
        </motion.div>
    );
};

const UserMsg: React.FC<{ text: string; isDark: boolean; delay: number }> = ({ text, isDark, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className="flex justify-end"
    >
        <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isDark ? 'bg-white/10 text-white' : 'bg-blue-600 text-white'
            }`}>
            {text}
        </div>
    </motion.div>
);

const AIMsg: React.FC<{ children: React.ReactNode; isDark: boolean; delay: number }> = ({ children, isDark, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
    >
        {children}
    </motion.div>
);

const ComparisonView: React.FC<ComparisonViewProps> = ({ isDark = true }) => {
    return (
        <div className="relative w-full h-full flex flex-col pt-20 px-4 pb-4">
            {/* Two panels */}
            <div className="flex-1 flex gap-4 min-h-0">
                {/* GPT-4o Panel */}
                <ChatPanel model="GPT-4o" logo="/logos/openai.svg" invertLogo isDark={isDark} delay={0.1} color="#3B82F6">
                    <UserMsg text="Quick comparison: Next.js App Router vs Pages Router for data fetching?" isDark={isDark} delay={0.2} />

                    <AIMsg isDark={isDark} delay={0.35}>
                        <p className="mb-4">The App Router represents a paradigm shift using <strong>React Server Components (RSC)</strong>. Unlike the Pages router which required specific data-fetching functions like <code className="bg-black/20 px-1 rounded">getServerSideProps</code>, the App Router allows you to fetch data directly inside your async components.</p>

                        <TableBlock
                            isDark={isDark}
                            headers={['Feature', 'Pages Router', 'App Router']}
                            rows={[
                                ['Component Type', 'Client (mostly)', 'Server (default)'],
                                ['Data Fetching', 'getServerSideProps', 'async/await'],
                                ['Caching', 'Manual setup', 'Automatic (Fetch API)'],
                                ['Streaming', 'limited support', 'Built-in (Suspense)'],
                            ]}
                        />

                        <p className="mt-4 mb-2">Here is how you fetch data in a Server Component:</p>
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
                <ChatPanel model="Claude 3.5" logo="/logos/claude-ai-icon.svg" isDark={isDark} delay={0.15} color="#F97316">
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

                        <p className="mt-4 mb-2">This simplifies database queries significantly:</p>
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
