"use client";

import React from 'react';
import { whitepaperContent } from './whitepaperData';
import { motion } from 'framer-motion';
import { EyeDiagram, BrainDiagram, MarketDiagram } from './Diagrams';
import ComparisonTable from './ComparisonTable';

export default function WhitepaperContent() {
    const renderContent = () => {
        const lines = whitepaperContent.split('\n');
        const elements = [];
        let currentKey = 0;
        let sectionNumber = 0;
        let inSection = false;
        let sectionElements: JSX.Element[] = [];

        const flushSection = () => {
            if (sectionElements.length > 0) {
                const sectionContent = [...sectionElements];
                sectionElements = [];
                elements.push(
                    <div
                        key={`section-${currentKey++}`}
                        className="section-container"
                    >
                        <div className="section-content">
                            {sectionContent}
                        </div>
                    </div>
                );
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('[COMPARISON_TABLE]')) {
                sectionElements.push(<ComparisonTable key={currentKey++} />);
            } else if (line.includes('[DIAGRAM: EYE]')) {
                sectionElements.push(<EyeDiagram key={currentKey++} />);
            } else if (line.includes('[DIAGRAM: BRAIN]')) {
                sectionElements.push(<BrainDiagram key={currentKey++} />);
            } else if (line.includes('[DIAGRAM: MARKET]')) {
                sectionElements.push(<MarketDiagram key={currentKey++} />);
            } else if (line.startsWith('# ')) {
                sectionElements.push(
                    <motion.h1
                        key={currentKey++}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 font-space leading-tight"
                    >
                        {line.replace('# ', '')}
                    </motion.h1>
                );
            } else if (line.startsWith('## ')) {
                // Flush previous section
                flushSection();

                const title = line.replace('## ', '');
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                sectionNumber++;

                sectionElements.push(
                    <motion.div
                        key={currentKey++}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <span className="section-number">
                                {String(sectionNumber).padStart(2, '0')}
                            </span>
                            <h2
                                id={id}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-space scroll-mt-24 flex-1"
                            >
                                {title}
                            </h2>
                        </div>
                    </motion.div>
                );
                inSection = true;
            } else if (line.startsWith('### ')) {
                sectionElements.push(
                    <motion.h3
                        key={currentKey++}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-white font-space"
                    >
                        {line.replace('### ', '')}
                    </motion.h3>
                );
            } else if (line.startsWith('#### ')) {
                sectionElements.push(
                    <h4 key={currentKey++} className="text-lg md:text-xl font-medium mt-8 mb-4 text-blue-200 font-space">
                        {line.replace('#### ', '')}
                    </h4>
                );
            } else if (line.trim().startsWith('- ')) {
                sectionElements.push(
                    <motion.li
                        key={currentKey++}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 mb-3 text-base md:text-lg leading-relaxed text-gray-300 list-disc marker:text-primary"
                    >
                        {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}
                    </motion.li>
                );
            } else if (line.match(/^\d+\. /)) {
                sectionElements.push(
                    <motion.li
                        key={currentKey++}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 mb-3 text-base md:text-lg leading-relaxed text-gray-300 list-decimal marker:text-primary marker:font-bold"
                    >
                        {line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}
                    </motion.li>
                );
            } else if (line.includes('---')) {
                // Section separator - flush current section
                flushSection();
            } else if (line.trim() !== '') {
                // Paragraph handling with bold support
                const parts = line.split(/(\*\*.*?\*\*)/g);
                sectionElements.push(
                    <motion.p
                        key={currentKey++}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-6 text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 font-inter max-w-3xl"
                    >
                        {parts.map((part, index) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                            } else if (part.startsWith('*') && part.endsWith('*')) {
                                return <em key={index} className="text-blue-200 not-italic font-medium">{part.slice(1, -1)}</em>;
                            }
                            return part;
                        })}
                    </motion.p>
                );
            }
        }

        // Flush final section
        flushSection();

        return elements;
    };

    return (
        <article className="prose-invert w-full relative z-10 selection:bg-primary/30 selection:text-white">
            {renderContent()}
        </article>
    );
}
