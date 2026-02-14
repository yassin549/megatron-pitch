"use client";

import { motion } from 'framer-motion';

interface ComparisonData {
    category: string;
    traditional: string;
    prediction: string;
    megatron: string;
}

const comparisonData: ComparisonData[] = [
    {
        category: 'Focus',
        traditional: 'Company & Asset Centric',
        prediction: 'Binary, Event Centric',
        megatron: 'Narrative & Variable Centric'
    },
    {
        category: 'Price Driver',
        traditional: 'Order Flow',
        prediction: 'All-or-nothing Probability',
        megatron: 'Continuous, Data-Driven Prices'
    },
    {
        category: 'Universe',
        traditional: 'Limited',
        prediction: 'Deterministic Outcomes',
        megatron: 'Practically Infinite Market Surface'
    }
];

export default function ComparisonTable() {
    return (
        <div className="my-16 w-full">
            {/* Desktop View - Grid Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-void-50/50 backdrop-blur">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-6 px-8 text-left text-sm font-mono uppercase tracking-wider text-gray-500">
                                Feature
                            </th>
                            <th className="py-6 px-8 text-center text-sm font-mono uppercase tracking-wider text-gray-400">
                                Traditional Markets
                            </th>
                            <th className="py-6 px-8 text-center text-sm font-mono uppercase tracking-wider text-gray-400">
                                Prediction Markets
                            </th>
                            <th className="py-6 px-8 text-center text-sm font-mono uppercase tracking-wider text-primary-glow relative">
                                Megatron
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, i) => (
                            <motion.tr
                                key={row.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="py-6 px-8 font-semibold text-white">
                                    {row.category}
                                </td>
                                <td className="py-6 px-8 text-center text-gray-400">
                                    {row.traditional}
                                </td>
                                <td className="py-6 px-8 text-center text-gray-400">
                                    {row.prediction}
                                </td>
                                <td className="py-6 px-8 text-center text-white font-medium relative">
                                    <div className="relative inline-block">
                                        {row.megatron}
                                        <div className="absolute inset-0 bg-primary/5 rounded-lg -z-10 blur-xl" />
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Stacked Cards */}
            <div className="md:hidden space-y-6">
                {comparisonData.map((row, i) => (
                    <motion.div
                        key={row.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel rounded-xl p-6 border border-white/10"
                    >
                        <h4 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-4">
                            {row.category}
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-gray-500 font-mono">Traditional</span>
                                <span className="text-sm text-gray-400 text-right flex-1 ml-4">
                                    {row.traditional}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-gray-500 font-mono">Prediction</span>
                                <span className="text-sm text-gray-400 text-right flex-1 ml-4">
                                    {row.prediction}
                                </span>
                            </div>
                            <div className="flex justify-between items-start pt-2 border-t border-primary/20">
                                <span className="text-xs text-primary-glow font-mono font-bold">Megatron</span>
                                <span className="text-sm text-white font-medium text-right flex-1 ml-4">
                                    {row.megatron}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Key Insight */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
            >
                <p className="text-lg text-gray-400 italic">
                    Megatron is <span className="text-primary-glow font-semibold not-italic">pricing the present</span> — not gambling on a single future date.
                </p>
            </motion.div>
        </div>
    );
}
