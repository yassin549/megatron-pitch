'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface HeaderProps {
    onJoinWaitlist: () => void;
}

export default function Header({ onJoinWaitlist }: HeaderProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Glass Container */}
            <div className="mx-auto max-w-3xl mt-3">
                <div className="mx-4 rounded-2xl glass-panel bg-void/30 backdrop-blur-md border border-white/5 flex items-center justify-between px-6 py-2.5 shadow-depth">

                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30 text-primary-glow font-bold text-lg font-space">
                            M
                        </div>
                        <span className="font-space font-bold text-white tracking-wide hidden sm:block">
                            MEGATRON
                        </span>
                    </div>

                    {/* Meta Info (Desktop) */}
                    <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-500">
                        <span>EST. 2026</span>
                        <span>V1.0</span>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={onJoinWaitlist}
                        className="group relative px-5 py-2 overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-[200%] group-hover:animate-shimmer" />
                        <span className="relative text-sm font-semibold text-white group-hover:text-primary-glow transition-colors">
                            Join Waitlist
                        </span>
                    </button>
                </div>
            </div>

            {/* Reading Progress Indicator */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]"
                style={{ scaleX, transformOrigin: "0%" }}
            />
        </header>
    );
}
