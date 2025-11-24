"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
	FiBriefcase,
	FiUsers,
	FiCalendar,
	FiMapPin,
	FiActivity,
} from "react-icons/fi";
import {
	workExperiences,
	organizationalExperiences,
	Experience,
} from "@/data/experience";
import SpotlightCard from "@/components/ui/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";
import TextType from "@/components/ui/TextType";

// --- Variants ---
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, x: -20, scale: 0.95 },
	show: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 50, damping: 15 },
	},
};

export default function ExperienceContent() {
	const [activeTab, setActiveTab] = useState<"work" | "org">("work");

	const data =
		activeTab === "work" ? workExperiences : organizationalExperiences;

	return (
		<div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
			{/* Background Grid */}
			<div
				className="absolute inset-0 opacity-[0.05] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
					backgroundSize: "40px 40px",
					maskImage:
						"radial-gradient(circle at center, black, transparent 80%)",
				}}
			/>

			{/* Header & Tabs */}
			<div className="p-6 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-lg shadow-black/50">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="text-[#a855f7] text-2xl">◈</span>
						{/* TITLE YANG MENGETIK SENDIRI */}
						<div className="text-xl font-bold text-white tracking-tight flex items-center h-[30px]">
							<TextType
								text={[
									"EXPERIENCE_LOGS",
									"ACCESSING_ARCHIVES...",
									"DECRYPTING_HISTORY...",
									"LOADING_CAREER_DATA...",
									"EXPERIENCE_LOGS",
								]}
								typingSpeed={80}
								deletingSpeed={40}
								pauseDuration={2000}
								loop={true}
								showCursor={true}
								cursorCharacter="█"
								cursorClassName="text-[#a855f7] animate-pulse ml-1"
							/>
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-1 font-mono pl-8">
						Chronological data archive of professional & organizational history.
					</p>
				</div>

				<div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
					<button
						onClick={() => setActiveTab("work")}
						className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
							activeTab === "work"
								? "bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						<FiBriefcase /> CAREER
					</button>
					<button
						onClick={() => setActiveTab("org")}
						className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
							activeTab === "org"
								? "bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						<FiUsers /> ORGANIZATION
					</button>
				</div>
			</div>

			{/* Main Content - Timeline Layout */}
			<div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
				<div className="max-w-4xl mx-auto relative pl-8 md:pl-10 pt-4">
					{/* Vertical Timeline Line (Neon) */}
					<div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#a855f7] via-[#a855f7]/20 to-transparent md:left-0" />

					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							variants={containerVariants}
							initial="hidden"
							animate="show"
							className="space-y-8 pb-20"
						>
							{data.map((item, index) => (
								<TimelineItem key={item.id} item={item} index={index} />
							))}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
	return (
		<motion.div variants={cardVariants} className="relative pl-6 md:pl-8">
			{/* Timeline Node (Titik Konektor) */}
			<div className="absolute -left-[7px] md:-left-[9px] top-6 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10 group-hover:scale-125 transition-transform flex items-center justify-center">
				<div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse"></div>
			</div>

			{/* Horizontal Connector */}
			<div className="absolute left-[8px] top-[29px] w-6 md:w-8 h-[1px] bg-[#a855f7]/50"></div>

			<SpotlightCard
				className="bg-[#0f0f11] border border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 group relative overflow-hidden"
				spotlightColor="rgba(168, 85, 247, 0.1)"
			>
				{/* Decorative Number Background */}
				<div className="absolute -right-4 -top-4 text-[80px] font-black text-white/[0.03] pointer-events-none select-none leading-none">
					{index + 1 < 10 ? `0${index + 1}` : index + 1}
				</div>

				<div className="p-5 md:p-6 relative z-10">
					{/* Top Meta */}
					<div className="flex flex-wrap justify-between items-start gap-4 mb-4">
						<div className="flex items-center gap-2 px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full text-[#a855f7] text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.1)]">
							<FiCalendar className="w-3 h-3" />
							{item.period}
						</div>

						<div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
							<FiMapPin className="w-3 h-3 text-[#a855f7]" />
							{item.location}
						</div>
					</div>

					{/* Main Content */}
					<div className="mb-4">
						<h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
							<DecryptedText
								text={item.role}
								speed={60}
								maxIterations={10}
								className="group-hover:text-[#a855f7] transition-colors"
							/>
						</h3>
						<div className="text-sm text-gray-400 font-medium flex items-center gap-2 mt-1">
							<span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_5px_#06b6d4]"></span>
							{item.company}
						</div>
					</div>

					{/* Description */}
					<div className="relative pl-4 border-l-2 border-white/10 group-hover:border-[#a855f7]/50 transition-colors py-1">
						<p className="text-sm text-gray-400 leading-relaxed font-light">
							{item.description}
						</p>
					</div>

					{/* Footer */}
					<div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
						<div className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
							<FiActivity className="text-[#a855f7]" />
							LOG_ID: {item.id.toUpperCase()}
						</div>
						<div className="text-[10px] font-mono text-[#a855f7] bg-[#a855f7]/5 px-2 py-0.5 rounded">
							VERIFIED
						</div>
					</div>
				</div>
			</SpotlightCard>
		</motion.div>
	);
}
