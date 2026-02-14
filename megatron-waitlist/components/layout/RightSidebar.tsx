'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Custom Icons
const Icons = {
    TLDR: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
    ),
    Vision: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    Problem: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Solution: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Tech: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    Compare: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
    ),
    Business: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Clock: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Roadmap: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
    ),
    Security: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    Traction: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
};

// Updated IDs to match generated content exactly
const navItems = [
    { id: 'tl-dr', icon: Icons.TLDR, label: 'TL;DR', color: '#A855F7' },
    { id: 'the-vision', icon: Icons.Vision, label: 'Vision', color: '#60A5FA' },
    { id: 'the-problem', icon: Icons.Problem, label: 'Problem', color: '#EF4444' },
    { id: 'the-solution', icon: Icons.Solution, label: 'Solution', color: '#F59E0B' },
    { id: 'core-product-components', icon: Icons.Tech, label: 'Product', color: '#10B981' },
    { id: 'why-this-is-different', icon: Icons.Compare, label: 'Compare', color: '#22D3EE' },
    { id: 'business-model', icon: Icons.Business, label: 'Business', color: '#8B5CF6' },
    { id: 'why-now', icon: Icons.Clock, label: 'Why Now', color: '#EC4899' },
    { id: 'roadmap', icon: Icons.Roadmap, label: 'Roadmap', color: '#F97316' },
    { id: 'security-governance', icon: Icons.Security, label: 'Security', color: '#14B8A6' },
    { id: 'current-state-traction', icon: Icons.Traction, label: 'Traction', color: '#84CC16' },
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
            className="fixed right-6 top-0 bottom-0 z-50 hidden md:flex flex-col justify-center items-center pointer-events-none" // pointer-events-none lets clicks pass through sidebar areas
        >
            <div className="pointer-events-auto glass-panel px-3 py-6 rounded-full bg-void/40 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-4 shadow-2xl transition-height duration-300 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">

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
                <div className="flex flex-col gap-2 items-center">
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
