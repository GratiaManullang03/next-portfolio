'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    FiGithub,
    FiExternalLink,
    FiCpu,
    FiArrowLeft,
    FiLayers,
    FiActivity,
} from 'react-icons/fi';
import { projectsData, Project } from '@/data/projects';
import SpotlightCard from '@/components/ui/SpotlightCard';
import DecryptedText from '@/components/DecryptedText';

// --- Variants Animasi (Ditambahkan tipe : Variants) ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const detailVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 },
    },
};

export default function ProjectContent() {
    // State Featured default
    const [filter, setFilter] = useState<'all' | 'featured'>('featured');
    // State untuk Detail View
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const filteredProjects =
        filter === 'all'
            ? projectsData
            : projectsData.filter((p) => p.featured);

    return (
        <div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
            {/* Decorative Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Header & Filter */}
            <div className="p-6 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-sm sticky top-0 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-[#a855f7]">❯</span>
                        PROJECT_DATABASE
                        <span className="text-xs bg-[#a855f7]/20 text-[#a855f7] px-2 py-0.5 rounded animate-pulse">
                            ONLINE
                        </span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Displaying {filteredProjects.length} modules from secure
                        archive.
                    </p>
                </div>

                <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setFilter('featured')}
                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${
                            filter === 'featured'
                                ? 'bg-[#a855f7]/20 text-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}>
                        FEATURED
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${
                            filter === 'all'
                                ? 'bg-white/10 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}>
                        ALL_MODULES
                    </button>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
                <motion.div
                    key={filter}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {filteredProjects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <SpotlightCard
                                className="h-full flex flex-col cursor-pointer group"
                                onClick={() => setSelectedProject(project)}>
                                {/* Image Area */}
                                <div className="h-40 w-full bg-[#1a1a1a] relative overflow-hidden border-b border-white/5">
                                    {project.thumbnail ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                                            <FiCpu className="w-10 h-10 text-gray-700 group-hover:text-[#a855f7] transition-colors" />
                                        </div>
                                    )}

                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/10 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />

                                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-[10px] px-2 py-1 rounded border border-white/10 text-gray-400 group-hover:text-white transition-colors">
                                        {project.type}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="mb-auto">
                                        <h3 className="text-[#e4e4e7] font-bold text-lg mb-2 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {project.technologies
                                            .slice(0, 3)
                                            .map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded border border-white/5 group-hover:border-[#a855f7]/30 transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-[10px] px-2 py-0.5 text-gray-600">
                                                +
                                                {project.technologies.length -
                                                    3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* DETAIL OVERLAY MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedProject(null)} // Close on backdrop click
                    >
                        <motion.div
                            variants={detailVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full max-w-4xl bg-[#0f0f11] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full"
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                        >
                            {/* Detail Header Image */}
                            <div className="h-48 md:h-64 w-full bg-[#1a1a1a] relative shrink-0">
                                {selectedProject.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={selectedProject.thumbnail}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                                        <FiCpu className="w-20 h-20 text-gray-700" />
                                    </div>
                                )}
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" />

                                {/* Back Button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur text-white rounded-full hover:bg-white/20 transition-colors border border-white/10">
                                    <FiArrowLeft />
                                </button>
                            </div>

                            {/* Detail Content */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 text-[10px] font-bold bg-[#a855f7]/20 text-[#a855f7] rounded border border-[#a855f7]/30">
                                                {selectedProject.type}
                                            </span>
                                            {selectedProject.featured && (
                                                <span className="px-2 py-1 text-[10px] font-bold bg-yellow-500/20 text-yellow-500 rounded border border-yellow-500/30">
                                                    FEATURED
                                                </span>
                                            )}
                                        </div>

                                        {/* Decrypted Title Effect */}
                                        <div className="text-3xl font-bold text-white mb-4">
                                            <DecryptedText
                                                text={selectedProject.title}
                                                animateOn="view"
                                                speed={50}
                                                maxIterations={10}
                                                className="text-white"
                                                parentClassName="block"
                                            />
                                        </div>

                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack Details */}
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <FiLayers /> Technology Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map(
                                                (tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs rounded-md border border-white/10 hover:border-[#a855f7]/50 hover:text-white transition-colors cursor-default">
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Links / Actions */}
                                    <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                                        {selectedProject.repoUrl ? (
                                            <a
                                                href={selectedProject.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-[#24292e] text-white rounded-lg hover:bg-[#2f363d] transition-all text-sm font-medium shadow-lg shadow-black/50 hover:shadow-xl hover:-translate-y-0.5">
                                                <FiGithub className="w-4 h-4" />
                                                View Source Code
                                            </a>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                                <FiGithub className="w-4 h-4" />
                                                Source Private
                                            </button>
                                        )}

                                        {selectedProject.liveUrl ? (
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5">
                                                <FiExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-gray-500 rounded-lg text-sm font-medium cursor-default">
                                                <FiActivity className="w-4 h-4" />
                                                Internal Project
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
