'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animations } from '@/lib/animations';

interface WaitlistFormProps {
    onSuccess?: (referralCode: string) => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState(''); // Honeypot
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Honeypot check
        if (website) {
            return; // Silent fail for bots
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setReferralCode(data.referralCode);
            setIsSuccess(true);
            onSuccess?.(data.referralCode);

        } catch (err: any) {
            setError(err.message || 'Failed to join waitlist. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyReferralLink = () => {
        const url = `${window.location.origin}?ref=${referralCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isSuccess) {
        return (
            <motion.div
                {...animations.scaleIn}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ghost to-ghost-strong backdrop-blur-2xl border border-white/10 p-8 shadow-depth"
            >
                {/* Success Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-br from-nebula-400 to-cyber-400 rounded-full"
                            initial={{
                                x: '50%',
                                y: '50%',
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                                scale: [0, 1, 0],
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.05,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center space-y-6">
                    {/* Checkmark */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-nebula-500 to-cyber-500 flex items-center justify-center shadow-glow"
                    >
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </svg>
                    </motion.div>

                    <div>
                        <h3 className="text-2xl font-bold text-white font-space mb-2">
                            You're In! 🚀
                        </h3>
                        <p className="text-gray-400">
                            Welcome to Megatron
                        </p>
                    </div>

                    {/* Referral Code */}
                    <div className="bg-void/50 rounded-xl p-4 border border-nebula-500/20">
                        <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 text-nebula-400 font-mono text-lg font-bold">
                                {referralCode}
                            </code>
                            <button
                                onClick={copyReferralLink}
                                className="px-4 py-2 bg-nebula-600 hover:bg-nebula-500 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                {copied ? '✓ Copied!' : 'Copy Link'}
                            </button>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <a
                            href="https://megatron-beta.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-nebula-600 to-cyber-600 hover:from-nebula-500 hover:to-cyber-500 text-white rounded-lg font-semibold transition-all shadow-glow hover:shadow-glow-lg text-center"
                        >
                            View Beta →
                        </a>
                        <button
                            onClick={() => {
                                setIsSuccess(false);
                                setEmail('');
                                setName('');
                                setReferralCode('');
                            }}
                            className="px-6 py-3 bg-ghost-strong hover:bg-white/10 text-gray-300 rounded-lg font-medium transition-colors"
                        >
                            Invite More
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 italic">
                        See you inside. - Yassin
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            {...animations.fadeInUp}
            className="relative group"
        >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ghost to-ghost-strong backdrop-blur-2xl border border-white/10 hover:border-nebula-500/30 transition-all duration-500 p-8 shadow-depth">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-nebula-500 via-cyber-500 to-nebula-500 blur-xl opacity-20 animate-glow-pulse" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white font-space mb-2">
                            Join the Waitlist
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Be first to trade the future
                        </p>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-void/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-nebula-500 focus:ring-2 focus:ring-nebula-500/20 transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-void/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-500 focus:ring-2 focus:ring-cyber-500/20 transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Honeypot - hidden from users */}
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-3 bg-plasma-500/10 border border-plasma-500/30 rounded-lg text-plasma-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="group/btn w-full relative overflow-hidden px-6 py-4 bg-gradient-to-r from-nebula-600 to-cyber-600 hover:from-nebula-500 hover:to-cyber-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10"
                            animate={{ x: [-1000, 1000] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="relative z-10">
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Joining...
                                </span>
                            ) : (
                                'Secure My Spot →'
                            )}
                        </span>
                    </button>

                    <p className="text-xs text-center text-gray-500">
                        No spam. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </motion.form>
    );
}
