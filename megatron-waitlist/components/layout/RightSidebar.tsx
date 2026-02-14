'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Custom Icons
const Icons = {
    Problem: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    Solution: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Why: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Join: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    ),
};

// Updated IDs to match generated content exactly - 5 major sections
const navItems = [
    { id: 'the-problem-vision', icon: Icons.Problem, label: 'Problem & Vision', color: '#EF4444' },
    { id: 'the-solution', icon: Icons.Solution, label: 'The Solution', color: '#F59E0B' },
    { id: 'why-megatron', icon: Icons.Why, label: 'Why Megatron', color: '#10B981' },
    { id: 'claim-your-edge', icon: Icons.Join, label: 'Claim Your Edge', color: '#8B5CF6' },
];

function DockItem({
    item,
    isActive,
    onClick
}: {
    item: any;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.4 }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer z-20 outline-none"
        >
            {/* Tooltip */}
            <motion.span
                className="absolute right-16 px-3 py-1 bg-black/80 backdrop-blur border border-white/10 rounded-lg text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 origin-right"
            >
                {item.label}
            </motion.span>

            {/* Icon */}
            <span
                className="relative z-10 transition-colors duration-200"
                style={{
                    color: isActive ? '#FFFFFF' : item.color,
                }}
            >
                <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                {/* Simple Dot Indicator (macOS style) */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            layoutId="activeDot"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        />
                    )}
                </AnimatePresence>
            </span>
        </motion.button>
    );
}

export default function RightSidebar() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const viewportCenter = window.scrollY + (window.innerHeight / 2);

            // Special case for Hero (top of page)
            if (viewportCenter < window.innerHeight) {
                if (activeSection !== 'hero') setActiveSection('hero');
                return;
            }

            // Find section closest to center of viewport
            let closestSection = activeSection;
            let minDistance = Infinity;

            navItems.forEach(item => {
                const element = document.getElementById(item.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementCenter = window.scrollY + rect.top + (rect.height / 2);
                    const distance = Math.abs(viewportCenter - elementCenter);

                    // Check if we are within the section's bounds
                    const top = element.offsetTop;
                    const bottom = top + element.offsetHeight;

                    // Priority: Is viewport center inside the element?
                    if (viewportCenter >= top && viewportCenter <= bottom) {
                        closestSection = item.id;
                        minDistance = 0; // Perfect match
                    } else if (distance < minDistance && minDistance !== 0) {
                        // Fallback: Closest center
                        minDistance = distance;
                        closestSection = item.id;
                    }
                }
            });

            if (closestSection !== activeSection) {
                setActiveSection(closestSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollTo = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for better positioning
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav
            className="fixed right-6 top-0 bottom-0 z-50 hidden md:flex flex-col justify-center items-center pointer-events-none"
        >
            <div className="pointer-events-auto glass-panel px-3 py-6 rounded-full bg-void/40 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-6 shadow-2xl transition-all duration-300">

                {/* Official Logo (Hero Link) */}
                <motion.div
                    onClick={() => scrollTo('hero')}
                    className="relative w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer shadow-glow z-10 shrink-0"
                    style={{ borderColor: activeSection === 'hero' ? '#3B82F6' : 'transparent' }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="/logo.jpeg"
                        alt="Megatron"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-white/10 shrink-0" />

                {/* Vertical Mac Dock */}
                <div className="flex flex-col gap-4 items-center">
                    {navItems.map((item) => (
                        <DockItem
                            key={item.id}
                            item={item}
                            isActive={activeSection === item.id}
                            onClick={() => scrollTo(item.id)}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
}
