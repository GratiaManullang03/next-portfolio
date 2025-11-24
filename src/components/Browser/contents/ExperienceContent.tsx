'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiUsers } from 'react-icons/fi';
import { workExperiences, organizationalExperiences } from '@/data/experience';
import MagicBento from '@/components/ui/MagicBento';
import TextPressure from '@/components/ui/TextPressure';

export default function ExperienceContent() {
    const [activeTab, setActiveTab] = useState<'work' | 'org'>('work');

    const data =
        activeTab === 'work' ? workExperiences : organizationalExperiences;

    return (
        <div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at center, #1f1f1f 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Header Section */}
            <div className="p-6 border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-20 shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                    {/* TextPressure Title */}
                    <div className="w-full md:w-[300px] h-[60px] relative flex items-center">
                        <TextPressure
                            text="EXPERIENCE"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            minFontSize={36}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                        <button
                            onClick={() => setActiveTab('work')}
                            className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
                                activeTab === 'work'
                                    ? 'bg-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`}>
                            <FiBriefcase /> WORK_HISTORY
                        </button>
                        <button
                            onClick={() => setActiveTab('org')}
                            className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
                                activeTab === 'org'
                                    ? 'bg-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`}>
                            <FiUsers /> ORGANIZATION
                        </button>
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent opacity-50" />
            </div>

            {/* Scrollable Content - Magic Bento */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}>
                        <MagicBento
                            items={data}
                            enableStars={true}
                            enableMagnetism={true}
                            enableTilt={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
