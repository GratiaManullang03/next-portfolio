'use client';

import { useState } from 'react';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

export default function CVContent() {
    const [isLoading, setIsLoading] = useState(true);
    const pdfUrl = '/source/CV-Felix-Gratia-Mangatur-Manullang.pdf';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'CV-Felix-Gratia-Mangatur-Manullang.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* PDF Container */}
            <div className="flex-1 relative">
                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-3 border-[#a855f7]/20 border-t-[#a855f7] rounded-full animate-spin" />
                            <span className="font-mono text-gray-400 text-sm">Loading CV...</span>
                        </div>
                    </div>
                )}

                {/* PDF Embed */}
                <object
                    data={pdfUrl}
                    type="application/pdf"
                    className="w-full h-full bg-white"
                    onLoad={() => setIsLoading(false)}
                >
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full border-0 bg-white"
                        onLoad={() => setIsLoading(false)}
                        title="Curriculum Vitae"
                    />
                </object>
            </div>

            {/* Action Bar */}
            <div className="flex-shrink-0 p-3 bg-[#0a0a0a]/80 border-t border-white/10 flex items-center justify-between">
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors font-mono text-xs"
                >
                    <FiExternalLink className="w-4 h-4" />
                    Open in new tab
                </a>

                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-mono text-sm rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                    <FiDownload className="w-4 h-4" />
                    Download CV
                </button>
            </div>
        </div>
    );
}
