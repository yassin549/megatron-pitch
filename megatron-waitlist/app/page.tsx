'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SpaceBackground from '@/components/ui/SpaceBackground';
import WhitepaperContent from '@/components/content/WhitepaperContent';
import WaitlistForm from '@/components/hero/WaitlistForm';
import { motion } from 'framer-motion';

// Remove demos for now, focus on reading experience
// We will integrate small visual widgets later if needed

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Deep Space Background */}
      <SpaceBackground />

      {/* Content Container */}
      <div className="relative z-10">

        {/* Whitepaper Content */}
        <WhitepaperContent />

        {/* Footer / Waitlist CTA */}
        <section className="relative py-24 px-4 border-t border-primary/20 bg-void-50/50 backdrop-blur-sm">
          <div className="max-w-xl mx-auto text-center space-y-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold font-space text-white">
                Join the <span className="text-glow-blue text-primary-glow">Truth Machine</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Be the first to trade on reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <WaitlistForm />
            </motion.div>

            <div className="pt-12 border-t border-white/5 mt-12">
              <p className="text-sm text-gray-500">
                © 2026 Megatron. <span className="text-primary-dark">Financializing Reality.</span>
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
