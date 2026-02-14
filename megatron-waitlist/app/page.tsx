'use client';

import { useState } from 'react';
import SpaceBackground from '@/components/ui/SpaceBackground';
import WhitepaperContent from '@/components/content/WhitepaperContent';
import RightSidebar from '@/components/layout/RightSidebar';
import WaitlistForm from '@/components/hero/WaitlistForm';
import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <main className="relative min-h-screen text-white">
            {/* Deep Space Background */}
            <SpaceBackground />

            {/* Vertical Navigation */}
            <RightSidebar />

            {/* Hero Section with Inline Waitlist */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-32">
                <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 text-center md:text-left"
                    >
                        <div>
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-xs font-mono tracking-wider">
                                V1.0 PUBLIC BETA
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-space leading-tight">
                                megatron
                            </h1>
                        </div>

                        <p className="text-xl text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                            monitor the internet in 1 platform
                        </p>

                        <div className="flex gap-4 justify-center md:justify-start text-sm font-mono text-gray-500">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Operational
                            </span>
                        </div>
                    </motion.div>

                    {/* Waitlist Form - Prominently Displayed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <WaitlistForm />

                        {/* Decorative floating elements behind form */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                >
                    <span className="text-xs font-mono uppercase tracking-widest">Read Whitepaper</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </motion.div>
            </section>

            {/* Content Container */}
            <div className="relative z-10 border-t border-white/5 bg-gradient-to-b from-void/0 to-void/50">

                {/* Whitepaper Content */}
                <WhitepaperContent />

                {/* Footer */}
                <footer className="relative py-24 px-4 border-t border-primary/20 bg-void-50/50 backdrop-blur-sm text-center">
                    <div className="max-w-xl mx-auto space-y-8">
                        <h3 className="text-2xl font-space font-bold text-white">Ready to trade reality?</h3>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                        >
                            Back to Top
                        </button>
                        <p className="text-sm text-gray-500">
                            © 2026 Megatron Inc.
                        </p>
                    </div>
                </footer>

            </div>
        </main>
    );
}
