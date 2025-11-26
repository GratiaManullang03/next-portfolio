"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import {
	FiGithub,
	FiExternalLink,
	FiCpu,
	FiLayers,
	FiActivity,
	FiCode,
} from "react-icons/fi";
import { projectsData, Project } from "@/data/projects";
import SpotlightCard from "@/components/ui/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";
import { getTechIcon } from "@/utils/techIcons";
import TextType from "@/components/ui/TextType";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.9 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 50, damping: 10 },
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

const PROJECT_SUBTITLES = [
	"LOADED {count} ENCRYPTED MODULES...",
	"BUGS_FIXED // FEATURES_SHIPPED",
	"PROUDLY_BUILT_WITH_COFFEE",
	"DEPLOYING_TO_PRODUCTION...",
	"CTRL_Z_IS_MY_BEST_FRIEND",
];

export default function ProjectContent() {
	const [filter, setFilter] = useState<"all" | "featured">("featured");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [subtitleIndex, setSubtitleIndex] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const modalScrollRef = useRef<HTMLDivElement>(null);

	// Initialize Lenis for main grid scroll
	useLenis(scrollContainerRef, {
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		syncTouch: false,
	});

	// Initialize Lenis for modal scroll
	useLenis(modalScrollRef, {
		duration: 1.0,
		smoothWheel: true,
		syncTouch: false,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setSubtitleIndex((prev) => (prev + 1) % PROJECT_SUBTITLES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const filteredProjects =
		filter === "all" ? projectsData : projectsData.filter((p) => p.featured);

	return (
		<div className="h-full flex flex-col bg-[#030303] text-gray-300 font-mono overflow-hidden relative perspective-1000">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION (Sandwich Layout) --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md sticky top-0 z-20 shadow-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

				<div className="flex-1 w-full md:w-auto">
					<div className="flex items-center gap-2 mb-2">
						<FiCpu className="text-purple-500 w-3 h-3" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-purple-400/80 uppercase">
							// PROJECT_ARCHIVE
						</span>
					</div>

					{/* TITLE SECTION WITH CONSISTENT HEIGHT */}
					<div className="h-10 md:h-12 flex items-center overflow-hidden w-full">
						<div className="text-2xl md:text-4xl font-black text-white tracking-widest flex items-center">
							<TextType
								text={[
									"PROJECT_ARCHIVE",
									"CREATIVE_LABS",
									"BUILDING_IDEAS",
									"DEPLOYING_NOW...",
								]}
								typingSpeed={80}
								deletingSpeed={40}
								pauseDuration={2000}
								loop={true}
								showCursor={true}
								cursorCharacter="█"
								cursorClassName="text-purple-500 animate-pulse ml-2"
							/>
						</div>
					</div>

					<p className="text-[10px] text-purple-400/80 font-mono tracking-[0.3em] uppercase mt-2 animate-pulse truncate">
						{PROJECT_SUBTITLES[subtitleIndex].replace(
							"{count}",
							filteredProjects.length.toString()
						)}
					</p>
				</div>

				<div className="flex gap-1 bg-black/60 p-1.5 rounded-lg border border-white/10 shadow-inner w-full md:w-auto">
					<button
						onClick={() => setFilter("featured")}
						className={`flex-1 md:flex-none px-4 py-3 md:py-2 text-[10px] md:text-xs font-bold tracking-wider rounded transition-all duration-300 ${
							filter === "featured"
								? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						FEATURED
					</button>
					<button
						onClick={() => setFilter("all")}
						className={`flex-1 md:flex-none px-4 py-3 md:py-2 text-[10px] md:text-xs font-bold tracking-wider rounded transition-all duration-300 ${
							filter === "all"
								? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						ALL_DATA
					</button>
				</div>
			</div>

			{/* Main Grid Content */}
			<div
				ref={scrollContainerRef}
				className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10"
			>
				<motion.div
					key={filter}
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-20"
				>
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
						onClick={() => setSelectedProject(null)}
					>
						<motion.div
							variants={detailVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="w-full max-w-5xl h-[85vh] bg-[#0a0a0c] border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors border border-white/10"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</button>

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
										<FiCpu className="w-24 h-24 text-purple-500/20" />
									</div>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />

								<div className="absolute bottom-6 left-6 right-6">
									<div className="flex items-center gap-3 mb-3">
										<span className="px-3 py-1 text-[10px] font-bold bg-purple-600 text-white rounded shadow-lg shadow-purple-500/30">
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

							<div
								ref={modalScrollRef}
								className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0c]"
							>
								<div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
									<div className="md:col-span-2 space-y-6">
										<div>
											<h3 className="text-purple-500 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
												<FiCode /> Mission Brief
											</h3>
											<p className="text-gray-300 leading-relaxed text-lg font-light">
												{selectedProject.description}
											</p>
										</div>

										<div>
											<h3 className="text-purple-500 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
												<FiLayers /> Tech Arsenal
											</h3>
											<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
												{selectedProject.technologies.map((tech, i) => {
													const iconPath = getTechIcon(tech);
													return (
														<div
															key={i}
															className="flex items-center gap-3 p-3 bg-[#161618] rounded border border-white/5 hover:border-purple-500/30 transition-colors group/tech"
														>
															{iconPath ? (
																// eslint-disable-next-line @next/next/no-img-element
																<img
																	src={iconPath}
																	alt={tech}
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
												})}
											</div>
										</div>
									</div>

									<div className="space-y-6">
										<div className="p-5 bg-[#111] rounded-xl border border-white/10 space-y-4">
											<h4 className="text-white font-bold text-sm">
												Project Access
											</h4>

											{selectedProject.liveUrl ? (
												<a
													href={selectedProject.liveUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-all font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5"
												>
													<FiExternalLink className="w-4 h-4" />
													Launch System
												</a>
											) : (
												<button
													disabled
													className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 text-gray-500 rounded-lg font-bold text-sm cursor-not-allowed"
												>
													<FiActivity className="w-4 h-4" />
													Internal / Offline
												</button>
											)}

											{selectedProject.repoUrl ? (
												<a
													href={selectedProject.repoUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#24292e] text-white rounded-lg hover:bg-[#2f363d] transition-all font-bold text-sm border border-white/10 hover:border-white/30"
												>
													<FiGithub className="w-4 h-4" />
													Access Source
												</a>
											) : (
												<button
													disabled
													className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 text-gray-500 rounded-lg font-bold text-sm cursor-not-allowed"
												>
													<FiGithub className="w-4 h-4" />
													Source Encrypted
												</button>
											)}
										</div>

										<div className="text-[10px] text-gray-600 font-mono text-center">
											ID: {selectedProject.id.toUpperCase()} <br />
											SECURE_HASH:{" "}
											{Math.random().toString(36).substring(7).toUpperCase()}
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
			className="group relative h-full w-full cursor-pointer"
		>
			<SpotlightCard
				className="h-full flex flex-col bg-[#0f0f11] border border-white/10 hover:border-purple-500/50 transition-colors duration-500 shadow-2xl relative z-10"
				spotlightColor="rgba(168, 85, 247, 0.15)"
			>
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
							<FiCpu className="w-12 h-12 text-gray-700 group-hover:text-purple-500 transition-colors" />
						</div>
					)}
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none z-20" />
					<div className="absolute top-3 right-3 bg-black/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded border border-white/10 text-gray-400 group-hover:text-purple-500 group-hover:border-purple-500/50 transition-colors z-30">
						{project.type}
					</div>
				</div>

				<div className="p-5 flex flex-col flex-grow relative">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

					<div className="mb-auto relative z-10">
						<h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-500 transition-colors flex items-center gap-2">
							<DecryptedText
								text={project.title}
								speed={80}
								maxIterations={10}
								className="group-hover:text-purple-500 transition-colors"
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
									<div className="w-6 h-6 rounded bg-white/5 p-1 border border-white/5 flex items-center justify-center group-hover/icon:border-purple-500/50 group-hover/icon:bg-purple-500/10 transition-all">
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
