'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

// Custom Icons
const Icons = {
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
    Results: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    Future: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    ),
};

const navItems = [
    { id: 'the-vision', icon: Icons.Vision, label: 'Vision', color: '#60A5FA' }, // Light Blue
    { id: 'the-problem', icon: Icons.Problem, label: 'Problem', color: '#EF4444' }, // Red
    { id: 'the-solution', icon: Icons.Solution, label: 'Solution', color: '#F59E0B' }, // Amber
    { id: 'technical-deep-dive', icon: Icons.Tech, label: 'Tech', color: '#10B981' }, // Emerald
    { id: 'results', icon: Icons.Results, label: 'Results', color: '#8B5CF6' }, // Violet
    { id: 'the-future', icon: Icons.Future, label: 'Future', color: '#EC4899' }, // Pink
];

function DockItem({
    mouseY,
    item,
    isActive,
    onClick
}: {
    mouseY: MotionValue;
    item: any;
    isActive: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
        return val - bounds.y - bounds.height / 2;
    });

    const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.6, 1]);
    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            style={{ scale }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer z-20 outline-none"
        >
            {/* Tooltip */}
            <motion.span
                className="absolute right-14 px-3 py-1 bg-black/80 backdrop-blur border border-white/10 rounded-lg text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
            >
                {item.label}
            </motion.span>

            {/* Active Pill (Background) - Dynamic Color */}
            {isActive && (
                <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                </motion.div>
            )}

            {/* Icon */}
            <span
                className="relative z-10 transition-colors duration-200"
                style={{
                    color: isActive ? '#FFFFFF' : item.color,
                }}
            >
                <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
            </span>
        </motion.button>
    );
}

export default function RightSidebar() {
    const [activeSection, setActiveSection] = useState('hero');
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleScroll = () => {
            // Check Hero (exact, since it's top)
            if (window.scrollY < window.innerHeight / 2) {
                if (activeSection !== 'hero') setActiveSection('hero');
                return;
            }

            // Check other sections
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollTo = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            onMouseMove={(e) => mouseY.set(e.clientY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-center"
        >
            <div className="glass-panel px-3 py-4 rounded-full bg-void/30 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-4 shadow-2xl">

                {/* Official Logo (Hero Link) */}
                <motion.div
                    onClick={() => scrollTo('hero')}
                    className="relative w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer shadow-glow z-10"
                    style={{ borderColor: activeSection === 'hero' ? '#3B82F6' : 'transparent' }}
                    whileHover={{ scale: 1.1 }}
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
                <div className="w-8 h-[1px] bg-white/10" />

                {/* Vertical Mac Dock */}
                <div className="flex flex-col gap-2 items-center">
                    {navItems.map((item) => (
                        <DockItem
                            key={item.id}
                            mouseY={mouseY}
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
