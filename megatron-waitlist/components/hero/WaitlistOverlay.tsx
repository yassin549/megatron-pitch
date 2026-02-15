'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';

interface WaitlistOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistOverlay({ isOpen, onClose }: WaitlistOverlayProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [referralCode, setReferralCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                body: JSON.stringify({ email, name: '' }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setReferralCode(data.referralCode);
            setStatus('success');
        } catch (e) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-2xl px-4"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* Content */}
                    <div className="w-full max-w-2xl text-center space-y-12">

                        {status === 'success' ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="text-6xl animate-bounce">🚀</div>
                                <h2 className="text-4xl md:text-6xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary-glow">
                                    Welcome to V1.0
                                </h2>
                                <p className="text-xl text-gray-400">Position Secured.</p>

                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
                                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Referral Code</p>
                                    <div className="text-3xl font-mono text-primary-glow select-all cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.origin + '?ref=' + referralCode)}>
                                        {referralCode}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="space-y-8"
                            >
                                <h2 className="text-4xl md:text-7xl font-bold font-space text-white">
                                    Join the <span className="text-primary-glow">Truth</span>.
                                </h2>
                                <p className="text-xl md:text-2xl text-gray-400 max-w-lg mx-auto leading-relaxed">
                                    Access the only market that prices reality.
                                    <br />
                                    <span className="text-sm text-gray-600 mt-4 block">Limited spots for Alpha testers.</span>
                                </p>

                                <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
                                    <div className="relative flex rounded-xl bg-white/[0.03] shadow-2xl p-2 border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                                        <input
                                            type="email"
                                            placeholder="enter@email.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500 font-mono"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black font-bold rounded-lg hover:from-gray-100 hover:to-white transition-all disabled:opacity-50 shadow-lg"
                                        >
                                            {status === 'loading' ? 'JOINING...' : 'JOIN'}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="h-px flex-1 bg-white/10" />
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">or</span>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => signIn('google')}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 mt-2"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <span className="font-medium">Continue with Google</span>
                                    </button>

                                    {status === 'error' && (
                                        <p className="mt-4 text-red-400 text-sm">Error joining. Try again.</p>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
