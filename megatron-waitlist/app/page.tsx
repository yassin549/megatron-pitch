'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CinematicLoader from '@/components/loading/CinematicLoader';
import WaitlistForm from '@/components/hero/WaitlistForm';
import { motion } from 'framer-motion';

// Lazy load heavy components
const EyeDemo = dynamic(() => import('@/components/demos/EyeDemo'), {
  ssr: false,
  loading: () => <div className="h-96 glass rounded-2xl animate-pulse" />,
});

const BrainDemo = dynamic(() => import('@/components/demos/BrainDemo'), {
  ssr: false,
  loading: () => <div className="h-96 glass rounded-2xl animate-pulse" />,
});

const MarketDemo = dynamic(() => import('@/components/demos/MarketDemo'), {
  ssr: false,
  loading: () => <div className="h-96 glass rounded-2xl animate-pulse" />,
});

export default function HomePage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (!loadingComplete) {
    return <CinematicLoader onComplete={() => setLoadingComplete(true)} />;
  }

  return (
    <main className="relative min-h-screen">
      {/* Neural Grid Background */}
      <div className="fixed inset-0 bg-neural-grid bg-neural-grid opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-600 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-600 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-space mb-6">
              <span className="block gradient-text-animate">
                Trade What Moves
              </span>
              <span className="block text-white">
                the World
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              AI-powered markets for every data trend.{' '}
              <span className="text-cyber-400">From elections to crypto</span>,{' '}
              <span className="text-nebula-400">from climate to culture</span>.
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <WaitlistForm />
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
          >
            {[
              { label: 'Cost Savings', value: '76%', color: 'text-nebula-400' },
              { label: 'Response Time', value: '<2s', color: 'text-cyber-400' },
              { label: 'Markets', value: '100+', color: 'text-plasma-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold font-space ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-space">
              <span className="text-gradient">The Vision</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Information moves markets. But information itself has never been a market—until now.
              We built the infrastructure to <span className="text-white font-semibold">price the priceless</span>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'The Eye',
                subtitle: '24/7 Monitoring',
                description: 'Continuous web scraping with adaptive queries. Real-time data streams from thousands of sources.',
                icon: '👁️',
                color: 'from-nebula-600 to-nebula-800',
              },
              {
                title: 'The Brain',
                subtitle: 'Local AI Analysis',
                description: 'Dual-stage sentiment engine. 100% local inference. Zero external API costs.',
                icon: '🧠',
                color: 'from-cyber-600 to-cyan-800',
              },
              {
                title: 'The Market',
                subtitle: 'Living Prices',
                description: 'AI-nudged bonding curves. Always liquid. Trade anytime, even without counterparties.',
                icon: '📈',
                color: 'from-plasma-600 to-pink-800',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-8 h-full hover:border-nebula-500/30 transition-all duration-500">
                  <div className={`text-5xl mb-4 transition-transform group-hover:scale-110 duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-space mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{item.subtitle}</p>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demos Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* The Eye Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-5xl font-bold font-space mb-4 text-center">
              <span className="text-gradient">The Eye</span> in Action
            </h3>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Watch as our monitoring engine processes real-time data streams
            </p>
            <EyeDemo />
          </motion.div>

          {/* The Brain Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-5xl font-bold font-space mb-4 text-center">
              <span className="text-gradient">The Brain</span> Breakdown
            </h3>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              See how our dual-stage AI analyzes market sentiment
            </p>
            <BrainDemo />
          </motion.div>

          {/* The Market Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-5xl font-bold font-space mb-4 text-center">
              <span className="text-gradient">The Market</span> Playground
            </h3>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Interact with our AI-nudged bonding curve
            </p>
            <MarketDemo />
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent to-void/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12 text-center space-y-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-nebula-500 shadow-glow bg-void p-4">
              <img
                src="/logo.jpeg"
                alt="Megatron Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <blockquote className="text-2xl md:text-3xl font-medium text-gray-300 italic">
              "We built the infrastructure to price the priceless."
            </blockquote>

            <div>
              <p className="text-white font-semibold text-lg">Yassin Khoualdi</p>
              <p className="text-gray-400">Founder, Megatron</p>
            </div>

            <div className="pt-6">
              <a
                href="https://megatron-beta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-nebula-600 to-cyber-600 hover:from-nebula-500 hover:to-cyber-500 text-white rounded-lg font-semibold transition-all shadow-glow hover:shadow-glow-lg text-lg"
              >
                Explore the Beta →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 Megatron. All rights reserved.</p>
          <p className="mt-2">
            <span className="text-nebula-400">NOT FINANCIAL ADVICE</span> • All demos are for illustrative purposes
          </p>
        </div>
      </footer>
    </main>
  );
}
