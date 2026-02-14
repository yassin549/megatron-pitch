"use client";

import { motion } from 'framer-motion';

export const EyeDiagram = () => {
    return (
        <div className="my-12 p-8 glass-panel rounded-xl bg-gradient-to-br from-void to-void-50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-neural-grid opacity-20" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Source Nodes */}
                <div className="flex flex-col gap-4">
                    {['News API', 'Socials', 'Crypto'].map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-4 py-2 rounded-lg bg-void-100 border border-primary/20 text-sm text-gray-400 font-mono shadow-sm"
                        >
                            {src}
                        </motion.div>
                    ))}
                </div>

                {/* Connection Lines */}
                <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 relative">
                    <motion.div
                        className="absolute top-0 left-0 w-8 h-full bg-primary blur-[2px]"
                        animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* The Eye Central Node */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32 rounded-full border-2 border-primary bg-void flex items-center justify-center shadow-glow"
                >
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
                    <div className="text-4xl">👁️</div>
                    <div className="absolute -bottom-8 text-xs text-primary-glow font-mono whitespace-nowrap">
                        Scanning...
                    </div>
                </motion.div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500 font-mono">
                Fig 1. High-Frequency Data Ingestion
            </div>
        </div>
    );
};

export const BrainDiagram = () => {
    return (
        <div className="my-12 p-8 glass-panel rounded-xl bg-void relative overflow-hidden">
            <div className="flex flex-col items-center gap-6">

                {/* Input */}
                <div className="w-full max-w-md p-4 bg-void-50 rounded border border-white/5 text-xs text-gray-400 font-mono">
                    "Bitcoin ETF approval likely this week..."
                </div>

                {/* Processing Network */}
                <div className="relative w-48 h-48">
                    {/* Central Node */}
                    <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-void-100 border border-cyber-500/30 flex items-center justify-center z-10 shadow-cyber-glow">
                        <span className="text-2xl">🧠</span>
                    </div>

                    {/* Satellites */}
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-8 h-8 rounded-full bg-void border border-primary/40 top-1/2 left-1/2"
                            style={{ marginLeft: -16, marginTop: -16 }}
                            animate={{
                                x: 80 * Math.cos(deg * Math.PI / 180),
                                y: 80 * Math.sin(deg * Math.PI / 180)
                            }}
                        >
                            <motion.div
                                className="w-full h-full rounded-full bg-primary/20"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                            />
                        </motion.div>
                    ))}

                    {/* Connecting Lines (SVG) - simplified */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <circle cx="50%" cy="50%" r="80" stroke="url(#gradient)" strokeWidth="1" fill="none" strokeDasharray="4 4" className="animate-spin-slow" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#22D3EE" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Output Metrics */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                    {[
                        { label: 'Sentiment', val: 'POSITIVE', col: 'text-green-400' },
                        { label: 'Confidence', val: '98.2%', col: 'text-primary-glow' },
                        { label: 'Impact', val: 'HIGH', col: 'text-plasma-400' }
                    ].map((m, i) => (
                        <div key={i} className="p-3 rounded bg-void-50 border border-white/5 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">{m.label}</div>
                            <div className={`text-sm font-bold font-mono ${m.col}`}>{m.val}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 text-center text-xs text-gray-500 font-mono">
                Fig 2. Dual-Stage Neural Analysis
            </div>
        </div>
    );
};


export const MarketDiagram = () => {
    return (
        <div className="my-12 p-8 glass-panel rounded-xl bg-void relative overflow-hidden">
            <div className="flex flex-col items-center gap-8">

                {/* Data-Driven Pricing Flow */}
                <div className="w-full max-w-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Data Signal */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full border border-primary/40 bg-void-100 flex items-center justify-center">
                            <span className="text-2xl">📡</span>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">Real-World Data</span>
                    </motion.div>

                    {/* Arrow */}
                    <motion.div
                        className="flex-1 h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 relative hidden md:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-8 h-full bg-primary blur-[2px]"
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    {/* Pricing Engine */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-20 h-20 rounded-xl border-2 border-primary bg-void flex items-center justify-center shadow-glow relative">
                            <div className="absolute inset-0 rounded-xl border border-primary/50 animate-ping opacity-10" />
                            <span className="text-2xl">⚙️</span>
                        </div>
                        <span className="text-xs text-primary-glow font-mono font-bold">Megatron Engine</span>
                    </motion.div>

                    {/* Arrow */}
                    <motion.div
                        className="flex-1 h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 relative hidden md:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-8 h-full bg-primary blur-[2px]"
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                    </motion.div>

                    {/* Price Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full border border-green-500/40 bg-void-100 flex items-center justify-center">
                            <span className="text-2xl">📈</span>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">Fair Price</span>
                    </motion.div>
                </div>

                {/* Key Principle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-center px-6 py-3 rounded-lg bg-void-50 border border-primary/20"
                >
                    <p className="text-sm text-gray-400 font-mono">
                        <span className="text-primary-glow font-bold">Prices move because reality changes</span>, not because traders push them.
                    </p>
                </motion.div>

            </div>
            <div className="mt-6 text-center text-xs text-gray-500 font-mono">
                Fig 3. Data-Driven Pricing Engine
            </div>
        </div>
    );
};
