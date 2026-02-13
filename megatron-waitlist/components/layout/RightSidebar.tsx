'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { id: 'hero', icon: 'M', label: 'Top' },
    { id: 'the-vision', icon: '👁️', label: 'Vision' },
    { id: 'the-problem', icon: '⚠️', label: 'Problem' },
    { id: 'the-solution', icon: '⚡', label: 'Solution' }, // The Megatron Engine
    { id: 'technical-deep-dive', icon: '🛠️', label: 'Tech' },
    { id: 'results', icon: '📊', label: 'Results' },
    { id: 'the-future', icon: '🔮', label: 'Future' },
];

export default function RightSidebar() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
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
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
            <div className="glass-panel p-2 rounded-full bg-void/30 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-4 relative">

                {/* Logo Top */}
                <div
                    onClick={() => scrollTo('hero')}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center cursor-pointer shadow-glow hover:scale-110 transition-transform z-10"
                >
                    <span className="font-space font-bold text-white text-xs">M</span>
                </div>

                {/* Divider */}
                <div className="w-4 h-[1px] bg-white/10" />

                {/* Navigation Icons */}
                <div className="flex flex-col gap-2 relative">
                    {navItems.slice(1).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 transition-colors hover:bg-white/5"
                        >
                            <span className={`transition-opacity duration-300 ${activeSection === item.id ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'}`}>
                                {item.icon}
                            </span>

                            {/* Label Tooltip */}
                            <span className="absolute right-12 px-2 py-1 rounded bg-black/80 text-xs text-primary-glow opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-primary/20 backdrop-blur">
                                {item.label}
                            </span>

                            {/* Active Pill Background */}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-primary/20 rounded-full border border-primary/50"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
