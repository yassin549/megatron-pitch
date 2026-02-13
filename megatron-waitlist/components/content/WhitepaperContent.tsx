"use client";

import React from 'react';
import { whitepaperContent } from './whitepaperData';
import { motion } from 'framer-motion';
import { EyeDiagram, BrainDiagram, MarketDiagram } from './Diagrams';

export default function WhitepaperContent() {
    const renderContent = () => {
        const lines = whitepaperContent.split('\n');
        const elements = [];
        let currentKey = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('[DIAGRAM: EYE]')) {
                elements.push(<EyeDiagram key={currentKey++} />);
            } else if (line.includes('[DIAGRAM: BRAIN]')) {
                elements.push(<BrainDiagram key={currentKey++} />);
            } else if (line.includes('[DIAGRAM: MARKET]')) {
                elements.push(<MarketDiagram key={currentKey++} />);
            } else if (line.startsWith('# ')) {
                elements.push(
                    <motion.h1
                        key={currentKey++}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-6xl font-bold text-center mb-12 mt-20 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 font-space"
                    >
                        {line.replace('# ', '')}
                    </motion.h1>
                );
            } else if (line.startsWith('## ')) {
                elements.push(
                    <motion.h2
                        key={currentKey++}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-semibold mt-16 mb-6 text-primary-glow border-b border-primary/20 pb-4 font-space"
                    >
                        {line.replace('## ', '')}
                    </motion.h2>
                );
            } else if (line.startsWith('### ')) {
                elements.push(
                    <h3 key={currentKey++} className="text-xl font-medium mt-8 mb-4 text-white font-space">
                        {line.replace('### ', '')}
                    </h3>
                );
            } else if (line.startsWith('#### ')) {
                elements.push(
                    <h4 key={currentKey++} className="text-lg font-medium mt-6 mb-3 text-blue-200 font-space">
                        {line.replace('#### ', '')}
                    </h4>
                );
            } else if (line.trim().startsWith('- ')) {
                elements.push(
                    <li key={currentKey++} className="ml-6 mb-2 text-gray-300 list-disc marker:text-primary">
                        {line.replace('- ', '')}
                    </li>
                );
            } else if (line.match(/^\d+\. /)) {
                elements.push(
                    <li key={currentKey++} className="ml-6 mb-2 text-gray-300 list-decimal marker:text-primary">
                        {line.replace(/^\d+\. /, '')}
                    </li>
                );
            } else if (line.includes('---')) {
                elements.push(<hr key={currentKey++} className="border-primary/20 my-16" />);
            } else if (line.startsWith('$$')) {
                // Basic Math rendering (placeholder for complex math)
                elements.push(
                    <div key={currentKey++} className="my-8 p-6 bg-void-50 border border-primary/30 rounded-lg text-center font-mono text-blue-200 overflow-x-auto shadow-glow-sm">
                        {line.replace(/\$\$/g, '')}
                    </div>
                );
            } else if (line.startsWith('```')) {
                let codeContent = '';
                let j = i + 1;
                while (j < lines.length && !lines[j].startsWith('```')) {
                    codeContent += lines[j] + '\n';
                    j++;
                }
                i = j; // Skip lines
                elements.push(
                    <pre key={currentKey++} className="my-6 p-6 bg-[#0F172A] rounded-lg border border-primary/20 overflow-x-auto text-sm text-blue-100 font-mono shadow-inner">
                        <code>{codeContent}</code>
                    </pre>
                );
            } else if (line.trim() !== '') {
                // Paragraph handling with bold support
                const parts = line.split(/(\*\*.*?\*\*)/g);
                elements.push(
                    <p key={currentKey++} className="mb-6 text-lg leading-relaxed text-gray-300 font-inter">
                        {parts.map((part, index) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={index} className="text-white font-semibold text-primary-glow">{part.slice(2, -2)}</strong>;
                            } else if (part.startsWith('*') && part.endsWith('*')) {
                                return <em key={index} className="text-blue-200 not-italic">{part.slice(1, -1)}</em>;
                            }
                            return part;
                        })}
                    </p>
                );
            }
        }
        return elements;
    };

    return (
        <article className="prose-invert max-w-3xl mx-auto px-6 py-12 md:py-24 relative z-10 selection:bg-primary/30 selection:text-white">
            {renderContent()}
        </article>
    );
}
