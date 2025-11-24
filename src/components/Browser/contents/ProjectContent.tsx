'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCpu } from 'react-icons/fi';
import { projectsData, Project } from '@/data/projects';

// --- Pindahin Varian Animasi ke Luar Komponen (Global di file ini) ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function ProjectContent() {
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

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
            <div className="p-6 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-sm sticky top-0 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${
                            filter === 'all'
                                ? 'bg-white/10 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}>
                        ALL_MODULES
                    </button>
                    <button
                        onClick={() => setFilter('featured')}
                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${
                            filter === 'featured'
                                ? 'bg-[#a855f7]/20 text-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}>
                        FEATURED
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            variants={itemVariants}
            className="group relative bg-[#0f0f11] border border-white/5 rounded-lg overflow-hidden hover:border-[#a855f7]/50 transition-colors duration-300 flex flex-col h-full">
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

                {/* Overlay Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />

                {/* Type Badge */}
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-[10px] px-2 py-1 rounded border border-white/10 text-gray-400">
                    {project.type}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-auto">
                    <h3 className="text-[#e4e4e7] font-bold text-lg mb-2 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded border border-white/5 group-hover:border-[#a855f7]/30 transition-colors">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 text-gray-600">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                    <div className="flex gap-3">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs group/link">
                                <FiGithub className="w-3.5 h-3.5" />
                                <span className="group-hover/link:underline decoration-[#a855f7]">
                                    SOURCE
                                </span>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs group/link">
                                <FiExternalLink className="w-3.5 h-3.5" />
                                <span className="group-hover/link:underline decoration-[#06b6d4]">
                                    DEPLOY
                                </span>
                            </a>
                        )}
                    </div>

                    {!project.liveUrl && !project.repoUrl && (
                        <div className="text-gray-700 text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                            INTERNAL
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
