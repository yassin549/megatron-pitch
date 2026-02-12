'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TradePoint {
    supply: number;
    price: number;
    type: 'buy' | 'sell';
    id: number;
}

export default function MarketDemo() {
    const [slope, setSlope] = useState(0.5);
    const [basePrice, setBasePrice] = useState(10);
    const [currentSupply, setCurrentSupply] = useState(20);
    const [trades, setTrades] = useState<TradePoint[]>([]);
    const [nextId, setNextId] = useState(0);

    const calculatePrice = (supply: number) => {
        return slope * supply + basePrice;
    };

    const currentPrice = calculatePrice(currentSupply);

    const handleBuy = () => {
        const newSupply = currentSupply + 5;
        const newPrice = calculatePrice(newSupply);

        setTrades(prev => [...prev, {
            supply: newSupply,
            price: newPrice,
            type: 'buy',
            id: nextId
        }]);
        setNextId(nextId + 1);
        setCurrentSupply(newSupply);
    };

    const handleSell = () => {
        if (currentSupply <= 5) return;

        const newSupply = Math.max(0, currentSupply - 5);
        const newPrice = calculatePrice(newSupply);

        setTrades(prev => [...prev, {
            supply: newSupply,
            price: newPrice,
            type: 'sell',
            id: nextId
        }]);
        setNextId(nextId + 1);
        setCurrentSupply(newSupply);
    };

    const handleAINudge = () => {
        const nudgeAmount = (Math.random() - 0.5) * 20; // -10% to +10%
        const newBasePrice = Math.max(5, basePrice + nudgeAmount);
        setBasePrice(newBasePrice);
    };

    // Generate curve points
    const curvePoints = [];
    for (let s = 0; s <= 50; s += 1) {
        curvePoints.push({ supply: s, price: calculatePrice(s) });
    }

    const maxPrice = calculatePrice(50);
    const priceRange = maxPrice;

    return (
        <div className="relative">
            {/* Demo Label */}
            <div className="absolute -top-10 left-0 text-xs text-gray-500 font-mono uppercase tracking-wider flex items-center gap-2">
                <span>DEMO / INTERACTIVE SIMULATION</span>
                <span className="px-2 py-0.5 bg-plasma-500/20 text-plasma-400 rounded text-xs font-bold border border-plasma-500/30">
                    NOT FINANCIAL ADVICE
                </span>
            </div>

            <div className="glass rounded-2xl overflow-hidden border-plasma-500/20 shadow-depth">
                <div className="grid md:grid-cols-2 divide-x divide-white/5">
                    {/* Left: Chart */}
                    <div className="bg-void/60 p-8">
                        <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-wider">Bonding Curve</h4>

                        {/* SVG Chart */}
                        <div className="aspect-square bg-void/40 rounded-xl border border-white/10 p-4">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                {/* Grid */}
                                {[...Array(5)].map((_, i) => (
                                    <g key={i}>
                                        <line
                                            x1="0"
                                            y1={80 + i * 64}
                                            x2="400"
                                            y2={80 + i * 64}
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="1"
                                        />
                                        <line
                                            x1={80 + i * 64}
                                            y1="0"
                                            x2={80 + i * 64}
                                            y2="400"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="1"
                                        />
                                    </g>
                                ))}

                                {/* Curve */}
                                <motion.path
                                    d={`M ${curvePoints.map((p, i) =>
                                        `${50 + (p.supply / 50) * 320} ${350 - (p.price / priceRange) * 280}`
                                    ).join(' L ')}`}
                                    fill="none"
                                    stroke="url(#curve-gradient)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />

                                {/* Gradient Definition */}
                                <defs>
                                    <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6B21E0" />
                                        <stop offset="50%" stopColor="#06B6D4" />
                                        <stop offset="100%" stopColor="#F43F5E" />
                                    </linearGradient>
                                </defs>

                                {/* Trade History Dots */}
                                {trades.slice(-10).map((trade, i) => (
                                    <motion.circle
                                        key={trade.id}
                                        cx={50 + (trade.supply / 50) * 320}
                                        cy={350 - (trade.price / priceRange) * 280}
                                        r="5"
                                        fill={trade.type === 'buy' ? '#10B981' : '#F43F5E'}
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 1, opacity: 0.3 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                ))}

                                {/* Current Position */}
                                <motion.circle
                                    cx={50 + (currentSupply / 50) * 320}
                                    cy={350 - (currentPrice / priceRange) * 280}
                                    r="8"
                                    fill="#06B6D4"
                                    className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Axes Labels */}
                                <text x="200" y="390" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontFamily="monospace">
                                    Supply →
                                </text>
                                <text x="20" y="200" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontFamily="monospace" transform="rotate(-90, 20, 200)">
                                    Price →
                                </text>
                            </svg>
                        </div>

                        {/* Formula */}
                        <div className="mt-4 p-4 bg-void/40 rounded-lg border border-white/10">
                            <p className="text-xs text-gray-400 mb-2">Formula:</p>
                            <p className="font-mono text-sm text-nebula-400">
                                P(S) = <span className="text-cyber-400">{slope.toFixed(2)}</span> × S + <span className="text-plasma-400">{basePrice.toFixed(2)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Controls */}
                    <div className="bg-void/40 p-8">
                        <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-wider">Trading Panel</h4>

                        {/* Current Price Display */}
                        <div className="mb-8 p-6 bg-void rounded-xl border-2 border-cyber-500/30">
                            <p className="text-xs text-gray-400 mb-2">Current Price</p>
                            <motion.div
                                key={currentPrice}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nebula-400 to-cyber-400"
                            >
                                ${currentPrice.toFixed(2)}
                            </motion.div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Supply:</span>
                                    <span className="text-white font-mono ml-2">{currentSupply}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Base:</span>
                                    <span className="text-white font-mono ml-2">${basePrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Trade Buttons */}
                        <div className="space-y-4 mb-8">
                            <button
                                onClick={handleBuy}
                                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-lg font-semibold transition-all shadow-glow hover:shadow-glow-lg"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">📈</span>
                                    <span>Buy (+5 Supply)</span>
                                </div>
                            </button>

                            <button
                                onClick={handleSell}
                                disabled={currentSupply <= 5}
                                className="w-full px-6 py-4 bg-gradient-to-r from-plasma-600 to-plasma-500 hover:from-plasma-500 hover:to-plasma-400 text-white rounded-lg font-semibold transition-all shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">📉</span>
                                    <span>Sell (-5 Supply)</span>
                                </div>
                            </button>
                        </div>

                        {/* AI Nudge */}
                        <div className="p-4 bg-nebula-500/10 border border-nebula-500/30 rounded-xl">
                            <p className="text-sm text-nebula-400 mb-3 font-semibold">AI Market Influence</p>
                            <p className="text-xs text-gray-300 mb-4">
                                Simulate breaking news impacting base price
                            </p>
                            <button
                                onClick={handleAINudge}
                                className="w-full px-4 py-3 bg-nebula-600 hover:bg-nebula-500 text-white rounded-lg font-semibold transition-colors"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl">🧠</span>
                                    <span>AI Nudge</span>
                                </div>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 p-4 bg-void/50 rounded-lg border border-white/10">
                            <p className="text-xs text-gray-400 mb-2">Your Position</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Trades:</span>
                                    <span className="text-white font-mono ml-2">{trades.length}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Liquidity:</span>
                                    <span className="text-emerald-400 font-mono ml-2">Always</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
