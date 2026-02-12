import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: {
                    DEFAULT: '#0A0A0F',
                    50: '#1A1A2E',
                    100: '#16162D',
                },
                nebula: {
                    DEFAULT: '#6B21E0',
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    200: '#DDD6FE',
                    300: '#C4B5FD',
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                    700: '#6D28D9',
                    800: '#5B21B6',
                    900: '#4C1D95',
                },
                cyber: {
                    DEFAULT: '#06B6D4',
                    50: '#ECFEFF',
                    100: '#CFFAFE',
                    200: '#A5F3FC',
                    300: '#67E8F9',
                    400: '#22D3EE',
                    500: '#06B6D4',
                    600: '#0891B2',
                    700: '#0E7490',
                    800: '#155E75',
                    900: '#164E63',
                },
                plasma: {
                    DEFAULT: '#F43F5E',
                    50: '#FFF1F2',
                    100: '#FFE4E6',
                    200: '#FECDD3',
                    300: '#FDA4AF',
                    400: '#FB7185',
                    500: '#F43F5E',
                    600: '#E11D48',
                    700: '#BE123C',
                    800: '#9F1239',
                    900: '#881337',
                },
                ghost: 'rgba(255,255,255,0.03)',
                'ghost-strong': 'rgba(255,255,255,0.08)',
            },
            fontFamily: {
                space: ['var(--font-space)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'morph': 'morph 8s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'neural-pulse': 'neuralPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'liquid-shift': 'liquidShift 10s ease infinite',
                'glitch': 'glitch 1s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'scan': 'scan 8s linear infinite',
                'progress': 'progress 3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
            },
            keyframes: {
                morph: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                    '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
                },
                neuralPulse: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                },
                liquidShift: {
                    '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                    '50%': { transform: 'scale(1.1) rotate(180deg)' },
                },
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                progress: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'neural-grid': 'linear-gradient(rgba(107,33,224,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,33,224,0.1) 1px, transparent 1px)',
                'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            },
            backgroundSize: {
                'neural-grid': '50px 50px',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(107,33,224,0.5)',
                'glow': '0 0 20px rgba(107,33,224,0.6)',
                'glow-lg': '0 0 40px rgba(107,33,224,0.7)',
                'cyber-glow': '0 0 20px rgba(6,182,212,0.6)',
                'plasma-glow': '0 0 20px rgba(244,63,94,0.6)',
                'depth': '0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)',
            },
            dropShadow: {
                'glow': '0 0 10px rgba(107,33,224,0.8)',
                'cyber': '0 0 10px rgba(6,182,212,0.8)',
            },
        },
    },
    plugins: [],
} satisfies Config;
