'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    color: string;
    speed: number;
}

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState<'logo' | 'slogan' | 'neural' | 'complete'>('logo');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [skipped, setSkipped] = useState(false);

    // Generate particles for logo formation
    const particles = useMemo(() => {
        const particleCount = 3000;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            // Random starting position
            const x = Math.random() * 800;
            const y = Math.random() * 600;

            // Target forms "M" shape (simplified)
            const segmentIndex = i % 5;
            let targetX = 400;
            let targetY = 300;

            if (segmentIndex === 0) { // Left vertical
                targetX = 300 + (i % 20) * 2;
                targetY = 200 + (i % 100);
            } else if (segmentIndex === 1) { // Left diagonal
                targetX = 300 + (i % 50);
                targetY = 200 + (i % 50);
            } else if (segmentIndex === 2) { // Peak
                targetX = 350 + (i % 20);
                targetY = 200 + (i % 30);
            } else if (segmentIndex === 3) { // Right diagonal
                targetX = 400 + (i % 50);
                targetY = 200 + (i % 50);
            } else { // Right vertical
                targetX = 450 + (i % 20) * 2;
                targetY = 200 + (i % 100);
            }

            particles.push({
                x,
                y,
                targetX,
                targetY,
                color: `hsl(${270 + Math.random() * 30}, 80%, ${50 + Math.random() * 30}%)`,
                speed: 0.02 + Math.random() * 0.03,
            });
        }

        return particles;
    }, []);

    // Particle animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 600;

        let animationId: number;

        const animate = () => {
            ctx.fillStyle = '#0A0A0F';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                // Move towards target
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;

                particle.x += dx * particle.speed * (progress / 100);
                particle.y += dy * particle.speed * (progress / 100);

                // Draw particle
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = 0.6 + (progress / 100) * 0.4;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [particles, progress]);

    // Progress simulation
    useEffect(() => {
        if (skipped) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1;

                // Update stages
                if (next >= 30 && stage === 'logo') setStage('slogan');
                if (next >= 60 && stage === 'slogan') setStage('neural');
                if (next >= 90 && stage === 'neural') setStage('complete');

                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                }

                return Math.min(next, 100);
            });
        }, 30); // ~3 seconds total

        return () => clearInterval(interval);
    }, [onComplete, stage, skipped]);

    // Skip handler
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Escape') {
                setSkipped(true);
                onComplete();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onComplete]);

    if (skipped) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-void flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ imageRendering: 'crisp-edges' }}
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo Container */}
                <div className="w-32 h-32 relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-nebula-500 to-cyber-500 blur-2xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white font-space">
                        M
                    </div>
                </div>

                {/* Slogan with Glitch Effect */}
                <AnimatePresence>
                    {stage !== 'logo' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nebula-400 via-cyber-400 to-plasma-400 font-space">
                                Financialize Reality
                            </h2>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="w-64 md:w-96 mt-8">
                    <div className="h-1 bg-ghost-strong rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-nebula-500 via-cyber-500 to-nebula-500 shadow-lg shadow-nebula-500/50"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                        <span>{progress}%</span>
                        <span className="font-mono">{stage}</span>
                    </div>
                </div>

                {/* Skip Button */}
                <motion.button
                    onClick={() => {
                        setSkipped(true);
                        onComplete();
                    }}
                    className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Press <kbd className="px-2 py-1 bg-ghost-strong rounded text-gray-300">SPACE</kbd> to skip
                </motion.button>
            </div>

            {/* Neural Grid Background */}
            <motion.div
                className="absolute inset-0 bg-neural-grid bg-neutral-grid opacity-20"
                animate={{
                    backgroundPosition: ['0px 0px', '50px 50px'],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </motion.div>
    );
}
