'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyber-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative flex rounded-xl bg-void shadow-2xl p-2 border border-white/10">
                                        <input
                                            type="email"
                                            placeholder="enter@email.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-600 font-mono"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        >
                                            {status === 'loading' ? 'DYING...' : 'JOIN'}
                                        </button>
                                    </div>
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
