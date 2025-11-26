"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiCpu, FiGrid, FiLayers } from "react-icons/fi";
import SkillsGlobe from "@/components/Skills/SkillsGlobe";
import TextPressure from "@/components/ui/TextPressure";
import RotatingText from "@/components/ui/RotatingText";
import { Skill } from "@/data/skills";

export default function SkillsPage() {
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

	return (
		<div className="fixed inset-0 bg-[#0a0a0a] flex flex-col overflow-hidden">
			{/* Background Glow Effects */}
			<div className="fixed inset-0 pointer-events-none -z-10">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[128px]" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px]" />
			</div>

			{/* Header */}
			<motion.header
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="relative z-40 flex-shrink-0 border-b border-[#1e1e1e] bg-[#0a0a0a]/80 backdrop-blur-md"
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
					>
						<FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
						<span className="font-mono text-sm">cd ~</span>
					</Link>
					{/* Subtitle dengan Rotating Text */}
					<div className="hidden md:flex items-center gap-2 font-mono text-xs text-gray-500">
						<span>Loading modules:</span>
						<div className="bg-[#1e1e1e] px-2 py-1 rounded text-[#a855f7]">
							<RotatingText
								texts={[
									"PROGRAMMING",
									"FRAMEWORKS",
									"DATABASES",
									"DEVOPS",
									"TOOLS",
								]}
								staggerFrom="last"
								rotationInterval={2000}
								className="font-bold"
							/>
						</div>
					</div>
					<div className="w-20" /> {/* Spacer untuk centering */}
				</div>
			</motion.header>

			{/* Main Content */}
			<main className="flex-1 relative flex flex-col">
				{/* Judul Besar menggunakan TextPressure */}
				<div className="relative z-30 pt-4 md:pt-8 w-full max-w-4xl mx-auto px-4 pointer-events-none">
					<div className="h-24 md:h-32 w-full flex items-center justify-center">
						<TextPressure
							text="MY ARSENAL"
							flex={true}
							alpha={false}
							stroke={false}
							width={true}
							weight={true}
							italic={true}
							textColor="#ffffff"
							strokeColor="#a855f7"
							minFontSize={36}
						/>
					</div>
					<p className="text-center text-gray-400 font-mono text-xs md:text-sm mt-2 max-w-md mx-auto">
						Interactive 3D visualization of my technical proficiency. Drag to
						rotate, click nodes for details.
					</p>
				</div>

				{/* 3D Globe Area */}
				<div className="absolute inset-0 z-10 top-[100px] md:top-[120px]">
					<SkillsGlobe onSkillSelect={setSelectedSkill} />
				</div>

				{/* Skill Detail Modal / Overlay (Muncul saat diklik) */}
				<AnimatePresence>
					{selectedSkill && (
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							className="absolute bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
						>
							<div className="bg-[#111111]/90 backdrop-blur-xl border border-[#333] p-6 rounded-2xl shadow-2xl shadow-purple-900/20 max-w-sm w-full pointer-events-auto flex items-center gap-5">
								<div className="w-16 h-16 bg-[#1a1a1a] rounded-xl p-3 border border-white/5 flex-shrink-0">
									<img
										src={selectedSkill.icon}
										alt={selectedSkill.name}
										className="w-full h-full object-contain"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="text-xl font-bold text-white mb-1 truncate">
										{selectedSkill.name}
									</h3>
									<div className="flex items-center gap-2 text-xs font-mono text-gray-400">
										<span
											className={`w-2 h-2 rounded-full ${
												selectedSkill.category === "Programming"
													? "bg-blue-500"
													: selectedSkill.category === "Web"
													? "bg-green-500"
													: selectedSkill.category === "Backend"
													? "bg-purple-500"
													: "bg-yellow-500"
											}`}
										/>
										{selectedSkill.category}
									</div>
									<button
										onClick={() => setSelectedSkill(null)}
										className="mt-3 text-xs text-[#a855f7] hover:text-[#c084fc] transition-colors"
									>
										[Close Details]
									</button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			{/* Footer Stats / Legend */}
			<footer className="relative z-40 bg-[#0a0a0a]/80 backdrop-blur border-t border-[#1e1e1e] py-3 hidden md:block">
				<div className="max-w-7xl mx-auto px-4 flex justify-between text-xs font-mono text-gray-500">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<FiCpu className="text-blue-500" />
							<span>Languages</span>
						</div>
						<div className="flex items-center gap-2">
							<FiGrid className="text-green-500" />
							<span>Web</span>
						</div>
						<div className="flex items-center gap-2">
							<FiLayers className="text-purple-500" />
							<span>Backend</span>
						</div>
					</div>
					<div>Rendered with Three.js & R3F</div>
				</div>
			</footer>
		</div>
	);
}
