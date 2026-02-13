"use client";

import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Array<{ x: number; y: number; size: number; opacity: number; opacitySpeed: number }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            const count = Math.floor((canvas.width * canvas.height) / 3000); // Density
            const newStars = [];
            for (let i = 0; i < count; i++) {
                newStars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2,
                    opacity: Math.random(),
                    opacitySpeed: (Math.random() - 0.5) * 0.02
                });
            }
            stars = newStars;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Galaxy Gradient base
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(0.5, '#050A1F'); // Deep Blue hint
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Stars
            ctx.fillStyle = '#FFFFFF';
            stars.forEach(star => {
                star.opacity += star.opacitySpeed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.opacitySpeed = -star.opacitySpeed;
                }

                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
