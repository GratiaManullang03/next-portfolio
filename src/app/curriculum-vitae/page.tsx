'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiDownload, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

export default function CurriculumVitae() {
    const [isLoading, setIsLoading] = useState(true);
    const pdfUrl = '/files/CV-Felix-Gratia-Mangatur-Manullang.pdf';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'CV-Felix-Gratia-Mangatur-Manullang.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col overflow-hidden">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e1e1e] z-40"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm">cd ~</span>
                    </Link>
                    <h1 className="font-mono text-lg text-white">
                        <span className="text-[#a855f7]">~/</span>curriculum-vitae
                    </h1>
                    <div className="w-20" />
                </div>
            </motion.header>

            {/* PDF Viewer Container */}
            <main className="flex-1 overflow-hidden p-4 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto h-full"
                >
                    {/* PDF Frame */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl">
                        {/* Loading State */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-[#a855f7]/20 border-t-[#a855f7] rounded-full animate-spin" />
                                    <span className="font-mono text-gray-400 text-sm">Loading CV...</span>
                                </div>
                            </div>
                        )}

                        {/* PDF Embed with object fallback */}
                        <object
                            data={pdfUrl}
                            type="application/pdf"
                            className="w-full h-full"
                            onLoad={() => setIsLoading(false)}
                        >
                            {/* Fallback for browsers that don't support object */}
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full border-0"
                                onLoad={() => setIsLoading(false)}
                                title="Curriculum Vitae"
                            />
                        </object>

                        {/* Fallback link if PDF doesn't load */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/90 border border-[#333] rounded-lg text-gray-400 hover:text-white hover:border-[#a855f7] transition-colors font-mono text-xs"
                            >
                                <FiExternalLink className="w-4 h-4" />
                                Open PDF in new tab
                            </a>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Floating Download Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-mono font-medium rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow cursor-pointer"
            >
                <FiDownload className="w-5 h-5" />
                <span>Download CV</span>
            </motion.button>

            {/* Background Glow Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
            </div>
        </div>
    );
}
