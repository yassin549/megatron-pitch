'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAnalysis {
    delta_percent: number;
    confidence: number;
    summary: string;
    reasoning: string;
    sources: string[];
    impact_score: number;
    stage: 'template' | 'deep';
}

const demoAnalyses: AIAnalysis[] = [
    {
        delta_percent: 5.2,
        confidence: 0.88,
        summary: 'Positive institutional signals detected',
        reasoning: 'Carnegie Endowment research indicates returning institutional interest, driven by clarity on key regulatory drivers. The narrative has shifted from uncertainty to cautious optimism. "The GHELT Project" gaining traction suggests sustained recovery in the near term.',
        sources: ['carnegieendowment.org', 'gheltproject.org', 'bloomberg.com'],
        impact_score: 85,
        stage: 'deep',
    },
    {
        delta_percent: -3.1,
        confidence: 0.92,
        summary: 'Bearish pressure mounting from regulatory news',
        reasoning: 'SEC announcement of expanded oversight creates short-term headwinds. Historical patterns suggest 5-7 day cooling period. Sentiment across social platforms shows increased caution.',
        sources: ['sec.gov', 'twitter.com', 'reddit.com/r/cryptocurrency'],
        impact_score: 78,
        stage: 'deep',
    },
    {
        delta_percent: 1.8,
        confidence: 0.65,
        summary: 'Mixed signals, slight bullish tilt',
        reasoning: 'Moderate positive news flow offset by profit-taking behavior. Volume metrics suggest consolidation phase.',
        sources: ['reuters.com', 'coindesk.com'],
        impact_score: 42,
        stage: 'template',
    },
];

export default function BrainDemo() {
    const [currentAnalysis, setCurrentAnalysis] = useState(0);
    const [showReasoning, setShowReasoning] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analysis = demoAnalyses[currentAnalysis];

    const analyzeNew = () => {
        setIsAnalyzing(true);
        setShowReasoning(false);

        setTimeout(() => {
            setCurrentAnalysis((prev) => (prev + 1) % demoAnalyses.length);
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="relative">
            {/* Demo Label */}
            <div className="absolute -top-10 left-0 text-xs text-gray-500 font-mono uppercase tracking-wider">
                DEMO / SIMULATED AI OUTPUT
            </div>

            <div className="glass rounded-2xl overflow-hidden border-cyber-500/20 shadow-depth">
                <div className="grid md:grid-cols-2 divide-x divide-white/5">
                    {/* Left: Neural Network Visualization */}
                    <div className="bg-void/60 p-6">
                        <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-wider">Neural Pipeline</h4>

                        <div className="space-y-6">
                            {/* Stage 1: DistilBERT */}
                            <motion.div
                                animate={isAnalyzing ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ duration: 0.5, repeat: isAnalyzing ? Infinity : 0 }}
                                className="relative"
                            >
                                <div className={`p-4 rounded-xl border-2 ${isAnalyzing ? 'border-cyber-500 bg-cyber-500/10' : 'border-white/10 bg-void/40'
                                    } transition-all duration-500`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-mono text-cyber-400">STAGE 1</span>
                                        {isAnalyzing && (
                                            <div className="w-2 h-2 bg-cyber-500 rounded-full animate-glow-pulse" />
                                        )}
                                    </div>
                                    <h5 className="font-bold text-white">DistilBERT</h5>
                                    <p className="text-xs text-gray-400 mt-1">Sentiment Filter | 67M params</p>
                                    <div className="mt-3 text-xs font-mono text-gray-500">
                                        ~50-100ms inference
                                    </div>
                                </div>

                                {/* Connection Arrow */}
                                <div className="absolute left-1/2 -bottom-3 w-0.5 h-6 bg-gradient-to-b from-cyber-500 to-nebula-500" />
                            </motion.div>

                            {/* Impact Score Meter */}
                            <div className="p-4 rounded-xl border border-white/10 bg-void/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-gray-400">IMPACT SCORE</span>
                                    <span className="text-sm font-bold text-white">{analysis.impact_score}</span>
                                </div>
                                <div className="h-2 bg-void rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${analysis.impact_score >= 75 ? 'bg-gradient-to-r from-plasma-600 to-plasma-400' :
                                                analysis.impact_score >= 50 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                                                    'bg-gradient-to-r from-gray-600 to-gray-400'
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${analysis.impact_score}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {analysis.impact_score >= 75 ? 'Deep Analysis Triggered' : 'Template Response'}
                                </p>
                            </div>

                            {/* Stage 2: Deep Analysis */}
                            <motion.div
                                animate={isAnalyzing && analysis.impact_score >= 75 ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ duration: 0.5, repeat: isAnalyzing ? Infinity : 0, delay: 0.3 }}
                                className="relative"
                            >
                                <div className={`p-4 rounded-xl border-2 ${isAnalyzing && analysis.impact_score >= 75 ? 'border-nebula-500 bg-nebula-500/10' :
                                        analysis.stage === 'deep' ? 'border-nebula-500/30 bg-nebula-500/5' :
                                            'border-white/10 bg-void/40 opacity-50'
                                    } transition-all duration-500`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-mono text-nebula-400">STAGE 2</span>
                                        {isAnalyzing && analysis.impact_score >= 75 && (
                                            <div className="w-2 h-2 bg-nebula-500 rounded-full animate-glow-pulse" />
                                        )}
                                    </div>
                                    <h5 className="font-bold text-white">Qwen 0.5B</h5>
                                    <p className="text-xs text-gray-400 mt-1">Deep Analysis | 500M params</p>
                                    <div className="mt-3 text-xs font-mono text-gray-500">
                                        ~1.5-2s inference
                                    </div>
                                </div>
                            </motion.div>

                            {/* Analyze Button */}
                            <button
                                onClick={analyzeNew}
                                disabled={isAnalyzing}
                                className="w-full px-4 py-3 bg-gradient-to-r from-cyber-600 to-nebula-600 hover:from-cyber-500 hover:to-nebula-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAnalyzing ? 'Analyzing...' : 'Analyze New Event'}
                            </button>
                        </div>
                    </div>

                    {/* Right: Analysis Output */}
                    <div className="bg-void/40 p-6 font-mono">
                        <h4 className="text-sm text-gray-400 mb-6 uppercase tracking-wider">Analysis Output</h4>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAnalysis}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {/* Confidence */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">confidence</span>
                                        <span className="text-sm font-bold text-emerald-400">
                                            {(analysis.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="relative w-full h-3 bg-void rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${analysis.confidence * 100}%` }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>

                                {/* Delta */}
                                <div className="p-4 bg-void rounded-lg border border-white/10">
                                    <span className="text-xs text-gray-500">delta_percent</span>
                                    <div className={`text-3xl font-bold mt-1 ${analysis.delta_percent > 0 ? 'text-emerald-400' : 'text-plasma-400'
                                        }`}>
                                        {analysis.delta_percent > 0 ? '+' : ''}{analysis.delta_percent}%
                                    </div>
                                </div>

                                {/* Summary */}
                                <div>
                                    <span className="text-xs text-gray-500">summary</span>
                                    <p className="text-sm text-white mt-2 leading-relaxed">
                                        "{analysis.summary}"
                                    </p>
                                </div>

                                {/* Reasoning (Expandable) */}
                                <div>
                                    <button
                                        onClick={() => setShowReasoning(!showReasoning)}
                                        className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                        <span className={`transform transition-transform ${showReasoning ? 'rotate-90' : ''}`}>▶</span>
                                        reasoning
                                    </button>

                                    <AnimatePresence>
                                        {showReasoning && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                                                    {analysis.reasoning}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Sources */}
                                <div>
                                    <span className="text-xs text-gray-500">sources</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {analysis.sources.map((source, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs bg-cyber-500/10 border border-cyber-500/30 rounded text-cyber-400"
                                            >
                                                {source}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
