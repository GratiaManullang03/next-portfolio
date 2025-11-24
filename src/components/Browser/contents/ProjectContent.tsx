'use client';

import { useState } from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import {
    FiGithub,
    FiExternalLink,
    FiCpu,
    FiArrowLeft,
    FiLayers,
    FiActivity,
    FiCode,
} from 'react-icons/fi';
import { projectsData, Project } from '@/data/projects';
import SpotlightCard from '@/components/ui/SpotlightCard';
import DecryptedText from '@/components/DecryptedText';
import { getTechIcon } from '@/utils/techIcons';
import TextType from '@/components/ui/TextType'; // <--- Import TextType

// --- Variants Animasi ---
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 50, damping: 10 },
    },
};

const detailVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 },
    },
};

export default function ProjectContent() {
    const [filter, setFilter] = useState<'all' | 'featured'>('featured');
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const filteredProjects =
        filter === 'all'
            ? projectsData
            : projectsData.filter((p) => p.featured);

    return (
        <div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative perspective-1000">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage:
                        'radial-gradient(circle at center, black, transparent 80%)',
                }}
            />

            {/* Header & Filter */}
            <div className="p-6 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-lg shadow-black/50">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#a855f7] text-2xl">◈</span>
                        {/* Ganti ShuffleText dengan TextType */}
                        <div className="text-xl font-bold text-white tracking-tight flex items-center">
                            <TextType
                                text="PROJECT_ARCHIVE"
                                typingSpeed={100}
                                loop={false}
                                showCursor={true}
                                cursorCharacter="_"
                                cursorClassName="text-[#a855f7]"
                            />
                        </div>
                        <span className="text-[10px] bg-[#a855f7]/10 text-[#a855f7] px-2 py-0.5 rounded border border-[#a855f7]/20 animate-pulse ml-2">
                            SYS.ONLINE
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                        Loaded {filteredProjects.length} encrypted modules.
                        Ready for inspection.
                    </p>
                </div>

                <div className="flex gap-1 bg-black/60 p-1.5 rounded-lg border border-white/10 shadow-inner">
                    <button
                        onClick={() => setFilter('featured')}
                        className={`px-4 py-1.5 text-[11px] font-bold rounded transition-all duration-300 ${
                            filter === 'featured'
                                ? 'bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }`}>
                        FEATURED
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-[11px] font-bold rounded transition-all duration-300 ${
                            filter === 'all'
                                ? 'bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }`}>
                        ALL_DATA
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
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
                        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedProject(null)}>
                        <motion.div
                            variants={detailVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full max-w-5xl h-[85vh] bg-[#0a0a0c] border border-[#a855f7]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative"
                            onClick={(e) => e.stopPropagation()}>
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors border border-white/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Cinematic Header */}
                            <div className="h-[40%] w-full relative shrink-0 overflow-hidden group">
                                {selectedProject.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={selectedProject.thumbnail}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black">
                                        <FiCpu className="w-24 h-24 text-[#a855f7]/20" />
                                    </div>
                                )}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 text-[10px] font-bold bg-[#a855f7] text-white rounded shadow-lg shadow-purple-500/30">
                                            {selectedProject.type}
                                        </span>
                                        {selectedProject.featured && (
                                            <span className="px-3 py-1 text-[10px] font-bold bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30 backdrop-blur-sm">
                                                ★ FEATURED
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Detail Body */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0c]">
                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-[#a855f7] text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <FiCode /> Mission Brief
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                                {selectedProject.description}
                                            </p>
                                        </div>

                                        {/* Tech Stack Grid */}
                                        <div>
                                            <h3 className="text-[#a855f7] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <FiLayers /> Tech Arsenal
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {selectedProject.technologies.map(
                                                    (tech, i) => {
                                                        const iconPath =
                                                            getTechIcon(tech);
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-3 p-3 bg-[#161618] rounded border border-white/5 hover:border-[#a855f7]/30 transition-colors group/tech">
                                                                {iconPath ? (
                                                                    // eslint-disable-next-line @next/next/no-img-element
                                                                    <img
                                                                        src={
                                                                            iconPath
                                                                        }
                                                                        alt={
                                                                            tech
                                                                        }
                                                                        className="w-6 h-6 object-contain opacity-70 group-hover/tech:opacity-100 transition-opacity"
                                                                    />
                                                                ) : (
                                                                    <FiCpu className="w-6 h-6 text-gray-600" />
                                                                )}
                                                                <span className="text-xs font-medium text-gray-400 group-hover/tech:text-white transition-colors">
                                                                    {tech}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div className="p-5 bg-[#111] rounded-xl border border-white/10 space-y-4">
                                            <h4 className="text-white font-bold text-sm">
                                                Project Access
                                            </h4>

                                            {selectedProject.liveUrl ? (
                                                <a
                                                    href={
                                                        selectedProject.liveUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white rounded-lg hover:opacity-90 transition-all font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5">
                                                    <FiExternalLink className="w-4 h-4" />
                                                    Launch System
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 text-gray-500 rounded-lg font-bold text-sm cursor-not-allowed">
                                                    <FiActivity className="w-4 h-4" />
                                                    Internal / Offline
                                                </button>
                                            )}

                                            {selectedProject.repoUrl ? (
                                                <a
                                                    href={
                                                        selectedProject.repoUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#24292e] text-white rounded-lg hover:bg-[#2f363d] transition-all font-bold text-sm border border-white/10 hover:border-white/30">
                                                    <FiGithub className="w-4 h-4" />
                                                    Access Source
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 text-gray-500 rounded-lg font-bold text-sm cursor-not-allowed">
                                                    <FiGithub className="w-4 h-4" />
                                                    Source Encrypted
                                                </button>
                                            )}
                                        </div>

                                        <div className="text-[10px] text-gray-600 font-mono text-center">
                                            ID:{' '}
                                            {selectedProject.id.toUpperCase()}{' '}
                                            <br />
                                            SECURE_HASH:{' '}
                                            {Math.random()
                                                .toString(36)
                                                .substring(7)
                                                .toUpperCase()}
                                        </div>
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

function ProjectCard({
    project,
    onClick,
}: {
    project: Project;
    onClick: () => void;
}) {
    return (
        <motion.div
            variants={itemVariants}
            onClick={onClick}
            className="group relative h-full w-full cursor-pointer">
            <SpotlightCard
                className="h-full flex flex-col bg-[#0f0f11] border border-white/10 hover:border-[#a855f7]/50 transition-colors duration-500 shadow-2xl relative z-10"
                spotlightColor="rgba(168, 85, 247, 0.15)">
                <div className="h-48 w-full bg-[#1a1a1a] relative overflow-hidden border-b border-white/5 group-hover:h-44 transition-all duration-500">
                    {project.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                            <FiCpu className="w-12 h-12 text-gray-700 group-hover:text-[#a855f7] transition-colors" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/20 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none z-20" />

                    <div className="absolute top-3 right-3 bg-black/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded border border-white/10 text-gray-400 group-hover:text-[#a855f7] group-hover:border-[#a855f7]/50 transition-colors z-30">
                        {project.type}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="mb-auto relative z-10">
                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
                            <DecryptedText
                                text={project.title}
                                speed={80}
                                maxIterations={10}
                                className="group-hover:text-[#a855f7] transition-colors"
                            />
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-400 transition-colors">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-3 relative z-10">
                        {project.technologies.slice(0, 5).map((tech, i) => {
                            const iconPath = getTechIcon(tech);
                            return (
                                <div key={i} className="relative group/icon">
                                    <div className="w-6 h-6 rounded bg-white/5 p-1 border border-white/5 flex items-center justify-center group-hover/icon:border-[#a855f7]/50 group-hover/icon:bg-[#a855f7]/10 transition-all">
                                        {iconPath ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={iconPath}
                                                alt={tech}
                                                className="w-full h-full object-contain opacity-60 group-hover/icon:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <span className="text-[8px] text-gray-500">
                                                {tech.substring(0, 1)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/20 text-[10px] text-white rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {tech}
                                    </div>
                                </div>
                            );
                        })}
                        {project.technologies.length > 5 && (
                            <span className="text-[10px] text-gray-600 font-bold">
                                +{project.technologies.length - 5}
                            </span>
                        )}
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
}
