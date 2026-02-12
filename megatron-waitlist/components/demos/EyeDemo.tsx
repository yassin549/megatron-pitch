'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Headline {
    id: number;
    text: string;
    source: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    relevance: number;
    timestamp: string;
}

const demoHeadlines: Omit<Headline, 'id' | 'timestamp'>[] = [
    { text: 'Bitcoin institutional adoption surges as major banks announce custody services', source: 'Bloomberg', sentiment: 'positive', relevance: 95 },
    { text: 'SEC announces new regulatory framework for crypto assets', source: 'Reuters', sentiment: 'neutral', relevance: 88 },
    { text: 'Fed signals dovish stance on interest rates, markets rally', source: 'WSJ', sentiment: 'positive', relevance: 92 },
    { text: 'Climate data shows accelerating temperature anomalies', source: 'Nature', sentiment: 'negative', relevance: 78 },
    { text: 'Election polls shift dramatically in swing states', source: 'AP News', sentiment: 'neutral', relevance: 85 },
    { text: 'Tech giants face antitrust probe expansion', source: 'FT', sentiment: 'negative', relevance: 82 },
    { text: 'Breakthrough in AI research promises efficiency gains', source: 'ArXiv', sentiment: 'positive', relevance: 90 },
    { text: 'Social media sentiment turns bearish on major indices', source: 'Twitter Analytics', sentiment: 'negative', relevance: 76 },
];

export default function EyeDemo() {
    const [headlines, setHeadlines] = useState<Headline[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedHeadline, setSelectedHeadline] = useState<Headline | null>(null);
    const nextIdRef = useRef(0);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const randomHeadline = demoHeadlines[Math.floor(Math.random() * demoHeadlines.length)];
            const newHeadline: Headline = {
                ...randomHeadline,
                id: nextIdRef.current++,
                timestamp: new Date().toLocaleTimeString(),
            };

            setHeadlines(prev => [newHeadline, ...prev].slice(0, 12));
        }, 2000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const getSentimentColor = (sentiment: Headline['sentiment']) => {
        switch (sentiment) {
            case 'positive':
                return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
            case 'negative':
                return 'text-plasma-400 border-plasma-500/30 bg-plasma-500/5';
            default:
                return 'text-gray-400 border-gray-500/30 bg-gray-500/5';
        }
    };

    const getRelevanceColor = (relevance: number) => {
        if (relevance >= 90) return 'text-nebula-400';
        if (relevance >= 80) return 'text-cyber-400';
        return 'text-gray-400';
    };

    return (
        <div className="relative">
            {/* Demo Label */}
            <div className="absolute -top-10 left-0 text-xs text-gray-500 font-mono uppercase tracking-wider">
                DEMO / LIVE SIMULATION
            </div>

            <div className="glass rounded-2xl overflow-hidden border-nebula-500/20 shadow-depth">
                {/* Terminal Header */}
                <div className="bg-void/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-plasma-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="ml-3 text-sm font-mono text-gray-400">megatron://data-stream</span>
                    </div>

                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="px-3 py-1.5 text-xs font-mono bg-nebula-600 hover:bg-nebula-500 text-white rounded transition-colors"
                    >
                        {isPaused ? 'RESUME' : 'PAUSE'}
                    </button>
                </div>

                {/* Data Stream */}
                <div className="relative bg-void/40 p-6 h-96 overflow-hidden">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-1 bg-cyan-500/20 blur-sm animate-scan" />
                    </div>

                    {/* Headlines */}
                    <div className="space-y-2 h-full overflow-auto scrollbar-thin">
                        <AnimatePresence initial={false} mode="popLayout">
                            {headlines.map((headline) => (
                                <motion.div
                                    key={headline.id}
                                    initial={{ opacity: 0, x: -20, height: 0 }}
                                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setSelectedHeadline(headline)}
                                    className={`border rounded-lg p-4 cursor-pointer hover:border-nebula-500/50 transition-all ${getSentimentColor(headline.sentiment)}`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-gray-500">
                                                    {headline.timestamp}
                                                </span>
                                                <span className="px-2 py-0.5 text-xs font-mono bg-void/50 rounded border border-white/10">
                                                    {headline.source}
                                                </span>
                                                <span className={`text-xs font-mono ${getRelevanceColor(headline.relevance)}`}>
                                                    {headline.relevance}% relevant
                                                </span>
                                            </div>
                                            <p className="text-sm text-white font-medium leading-relaxed">
                                                {headline.text}
                                            </p>
                                        </div>

                                        <div className={`w-3 h-3 rounded-full ${headline.sentiment === 'positive' ? 'bg-emerald-500' :
                                                headline.sentiment === 'negative' ? 'bg-plasma-500' :
                                                    'bg-gray-500'
                                            } animate-glow-pulse`} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {headlines.length === 0 && (
                            <div className="h-full flex items-center justify-center text-gray-500 font-mono text-sm">
                                Waiting for data stream...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Selected Headline Modal */}
            <AnimatePresence>
                {selectedHeadline && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedHeadline(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass rounded-2xl p-8 max-w-2xl w-full"
                        >
                            <h4 className="text-2xl font-bold text-white mb-4 font-space">Headline Analysis</h4>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm text-gray-400">Source:</span>
                                    <p className="text-white font-semibold">{selectedHeadline.source}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-400">Content:</span>
                                    <p className="text-white text-lg leading-relaxed">{selectedHeadline.text}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div>
                                        <span className="text-sm text-gray-400">Sentiment</span>
                                        <p className={`text-lg font-bold capitalize ${selectedHeadline.sentiment === 'positive' ? 'text-emerald-400' :
                                                selectedHeadline.sentiment === 'negative' ? 'text-plasma-400' :
                                                    'text-gray-400'
                                            }`}>
                                            {selectedHeadline.sentiment}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-400">Relevance</span>
                                        <p className="text-lg font-bold text-nebula-400">{selectedHeadline.relevance}%</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-400">Timestamp</span>
                                        <p className="text-lg font-mono text-cyber-400">{selectedHeadline.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedHeadline(null)}
                                className="mt-6 w-full px-4 py-2 bg-nebula-600 hover:bg-nebula-500 text-white rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
