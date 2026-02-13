'use client';

import { useState } from 'react';
import SpaceBackground from '@/components/ui/SpaceBackground';
import WhitepaperContent from '@/components/content/WhitepaperContent';
import Header from '@/components/layout/Header';
import WaitlistOverlay from '@/components/hero/WaitlistOverlay';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* Deep Space Background */}
      <SpaceBackground />

      {/* Header with Waitlist Trigger */}
      <Header onJoinWaitlist={() => setIsWaitlistOpen(true)} />

      {/* Full Screen Waitlist Overlay */}
      <WaitlistOverlay isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Content Container */}
      <div className="relative z-10">

        {/* Whitepaper Content */}
        <WhitepaperContent />

        {/* Footer / Final CTA */}
        <section className="relative py-32 px-4 border-t border-primary/20 bg-void-50/50 backdrop-blur-sm">
          <div className="max-w-xl mx-auto text-center space-y-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-space text-white">
                The Future is <span className="text-glow-blue text-primary-glow">Liquid Information</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Join the network that prices reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-cyber-600 hover:from-primary-glow hover:to-cyber-500 text-white rounded-full font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all scale-100 hover:scale-105"
              >
                Get Early Access →
              </button>
            </motion.div>

            <div className="pt-12 border-t border-white/5 mt-12">
              <p className="text-sm text-gray-500">
                © 2026 Megatron Inc. <span className="text-primary-dark">San Francisco, CA.</span>
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
