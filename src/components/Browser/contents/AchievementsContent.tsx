"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
	FiAward,
	FiCheckCircle,
	FiExternalLink,
	FiFileText,
	FiGrid,
} from "react-icons/fi";
import { achievementsData, Achievement } from "@/data/achievements"; // Import yang sudah dibersihkan
import SpotlightCard from "@/components/ui/SpotlightCard";
import TextType from "@/components/ui/TextType";
import DecryptedText from "@/components/DecryptedText";

// --- Variants ---
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
	hidden: { opacity: 0, scale: 0.8, y: 20 },
	show: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: "spring", stiffness: 60, damping: 12 },
	},
};

export default function AchievementsContent() {
	const [filter, setFilter] = useState<"all" | "award" | "certification">(
		"all"
	);

	const filteredData =
		filter === "all"
			? achievementsData
			: achievementsData.filter((item) => item.category === filter);

	return (
		<div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
			{/* Gold/Yellow Background Tint */}
			<div
				className="absolute inset-0 opacity-[0.04] pointer-events-none"
				style={{
					backgroundImage:
						"radial-gradient(circle at top right, #fbbf24 0%, transparent 40%), radial-gradient(circle at bottom left, #10b981 0%, transparent 40%)",
				}}
			/>
			<div
				className="absolute inset-0 opacity-[0.05] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Header */}
			<div className="p-6 border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-20 shrink-0 shadow-lg shadow-black/50">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-3 w-full md:w-auto">
						<div className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
							<FiAward className="w-6 h-6" />
						</div>
						<div className="flex flex-col">
							<div className="text-xl font-bold text-white tracking-tight flex items-center">
								<TextType
									text="HALL_OF_FAME"
									typingSpeed={100}
									loop={false}
									showCursor={false}
									className="text-yellow-500"
								/>
							</div>
							<span className="text-[10px] text-gray-500 font-mono mt-1">
								// VERIFIED CREDENTIALS & AWARDS
							</span>
						</div>
					</div>

					{/* Filter Tabs */}
					<div className="flex p-1 bg-black/40 rounded-lg border border-white/10 w-full md:w-auto overflow-x-auto">
						{[
							{ id: "all", label: "ALL_ITEMS", icon: FiGrid },
							{ id: "award", label: "AWARDS", icon: FiAward },
							{ id: "certification", label: "CERTS", icon: FiFileText },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setFilter(tab.id as any)}
								className={`flex items-center gap-2 px-4 py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${
									filter === tab.id
										? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]"
										: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
								}`}
							>
								<tab.icon /> {tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Grid Content */}
			<div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
				<motion.div
					key={filter}
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
				>
					{filteredData.map((item) => (
						<AchievementCard key={item.id} item={item} />
					))}
				</motion.div>
			</div>
		</div>
	);
}

function AchievementCard({ item }: { item: Achievement }) {
	return (
		<motion.div variants={itemVariants} className="h-full">
			<SpotlightCard
				className="h-full flex flex-col bg-[#0f0f11] border border-white/10 hover:border-yellow-500/50 transition-all duration-500 group relative overflow-hidden"
				spotlightColor="rgba(251, 191, 36, 0.15)" // Golden Spotlight
			>
				{/* --- HOLOGRAPHIC SHEEN EFFECT --- */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:animate-sheen z-20" />

				{/* Image / Thumbnail */}
				<div className="h-40 w-full bg-[#161618] relative overflow-hidden border-b border-white/5">
					{item.thumbnail ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={item.thumbnail}
							alt={item.title}
							className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<FiAward className="w-12 h-12 text-gray-700 group-hover:text-yellow-500 transition-colors" />
						</div>
					)}

					{/* Rank Badge (If Exists) */}
					{item.rank && (
						<div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded shadow-lg shadow-yellow-500/20 z-10">
							{item.rank}
						</div>
					)}

					{/* Category Tag */}
					<div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur border border-white/10 rounded text-[9px] text-gray-400 uppercase tracking-wider">
						{item.category}
					</div>
				</div>

				{/* Content */}
				<div className="p-5 flex flex-col flex-grow relative z-10">
					<div className="mb-4">
						<h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-yellow-500 transition-colors">
							<DecryptedText
								text={item.title}
								speed={50}
								maxIterations={5}
								className="group-hover:text-yellow-500 transition-colors"
							/>
						</h3>
						<div className="text-xs text-gray-400 flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
							{item.issuer}
						</div>
					</div>

					<p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 group-hover:text-gray-400 transition-colors">
						{item.description}
					</p>

					<div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
						<div className="text-[10px] font-mono text-gray-600">
							{item.date}
						</div>

						{item.credentialUrl ? (
							<a
								href={item.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 hover:text-emerald-400 transition-colors bg-emerald-500/10 px-2 py-1 rounded hover:bg-emerald-500/20"
							>
								<FiCheckCircle /> VERIFY
							</a>
						) : (
							<span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-not-allowed">
								<FiExternalLink /> PRIVATE
							</span>
						)}
					</div>
				</div>
			</SpotlightCard>
		</motion.div>
	);
}
