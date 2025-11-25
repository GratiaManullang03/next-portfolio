"use client";

import { useState, useEffect } from "react";
import {
	FiAward,
	FiCheckCircle,
	FiExternalLink,
	FiFileText,
	FiGrid,
} from "react-icons/fi";
import { achievementsData, Achievement } from "@/data/achievements";

// --- SAFELIST FOR TAILWIND V4 SCANNER ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SAFELIST = [
	"bg-yellow-500",
	"bg-emerald-500",
	"text-yellow-500",
	"text-emerald-500",
	"border-yellow-500",
	"border-emerald-500",
	"shadow-yellow-500",
	"shadow-emerald-500",
	"from-yellow-500",
	"from-emerald-500",
	"bg-yellow-500/10",
	"bg-emerald-500/10",
	"bg-yellow-500/20",
	"bg-emerald-500/20",
	"border-yellow-500/30",
	"border-emerald-500/30",
	"shadow-yellow-500/20",
	"shadow-emerald-500/20",
	"shadow-yellow-500/10",
	"shadow-emerald-500/10",
	"shadow-yellow-500/30",
	"shadow-emerald-500/30",
	"via-white/20",
];

export default function AchievementsContent() {
	const [filter, setFilter] = useState<"all" | "award" | "certification">(
		"all"
	);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [previewItem, setPreviewItem] = useState<Achievement | null>(
		achievementsData[0] || null
	);

	const filteredData =
		filter === "all"
			? achievementsData
			: achievementsData.filter((item) => item.category === filter);

	// Update preview saat hover
	useEffect(() => {
		if (hoveredId) {
			const item = achievementsData.find((i) => i.id === hoveredId);
			if (item) setPreviewItem(item);
		}
	}, [hoveredId]);

	// Reset jika filter berubah dan item preview hilang
	useEffect(() => {
		if (previewItem && !filteredData.find((i) => i.id === previewItem.id)) {
			setPreviewItem(filteredData[0] || null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, filteredData]);

	return (
		<div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
			{/* Background Tints (Gold & Emerald) */}
			<div
				className="absolute inset-0 opacity-[0.06] pointer-events-none"
				style={{
					backgroundImage:
						"radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 20% 80%, #10b981 0%, transparent 50%)",
				}}
			/>
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
			/>

			{/* Header */}
			<div className="h-[56px] px-6 py-2 border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-20 shrink-0 shadow-lg shadow-black/50 flex items-center">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
					<div className="flex items-center gap-4 w-full md:w-auto">
						<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 shadow-[0_0_25px_rgba(251,191,36,0.2)] p-3 relative overflow-hidden">
							<FiAward className="w-8 h-8 relative z-10" />
						</div>
						<div className="flex flex-col">
							{/* Title */}
							<h1 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
								HALL OF FAME
							</h1>
							<span className="text-[11px] text-yellow-500/70 font-mono mt-1 tracking-wider flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
								AUTHORIZED CREDENTIALS VAULT
							</span>
						</div>
					</div>

					{/* Filter Tabs */}
					<div className="flex p-1 bg-black/60 rounded-lg border border-white/10 w-full md:w-auto overflow-x-auto backdrop-blur-sm">
						{[
							{ id: "all", label: "ALL_ENTRIES", icon: FiGrid },
							{ id: "award", label: "AWARDS", icon: FiAward },
							{ id: "certification", label: "CERTIFICATES", icon: FiFileText },
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

			{/* MAIN LAYOUT: Split View */}
			<div className="flex-1 overflow-hidden relative flex flex-col md:flex-row gap-6 p-8">
				{/* LEFT COLUMN: The List */}
				<div className="w-full md:w-5/12 lg:w-4/12 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-3 order-2 md:order-1 h-full">
					<div key={filter} className="flex flex-col gap-3 pb-20">
						{filteredData.map((item) => (
							<AchievementListItem
								key={item.id}
								item={item}
								isActive={previewItem?.id === item.id}
								onHover={setHoveredId}
							/>
						))}
					</div>
					{filteredData.length === 0 && (
						<div className="text-center text-gray-500 py-10 italic">
							No records found in this category.
						</div>
					)}
				</div>

				{/* RIGHT COLUMN: The Holo-Preview */}
				<div className="w-full md:w-7/12 lg:w-8/12 h-[400px] md:h-auto sticky top-0 order-1 md:order-2 relative">
					{previewItem && (
						<AchievementPreview item={previewItem} key={previewItem.id} />
					)}
				</div>
			</div>
		</div>
	);
}

// --- KOMPONEN LIST ITEM (Kiri) ---
function AchievementListItem({
	item,
	isActive,
	onHover,
}: {
	item: Achievement;
	isActive: boolean;
	onHover: (id: string | null) => void;
}) {
	const isAward = item.category === "award";
	const activeColor = isAward ? "yellow-500" : "emerald-500";
	const activeBg = isAward ? "bg-yellow-500" : "bg-emerald-500";
	const activeBorder = isAward ? "border-yellow-500" : "border-emerald-500";

	return (
		<div
			onMouseEnter={() => onHover(item.id)}
			className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
				isActive
					? `${activeBg}/10 ${activeBorder} shadow-[0_0_15px_rgba(255,255,255,0.05)]`
					: "bg-[#0f0f11] border-white/5 hover:border-white/20"
			}`}
		>
			{/* Active Indicator */}
			{isActive && (
				<div className={`absolute left-0 top-0 bottom-0 w-1 ${activeBg}`} />
			)}

			<div className="flex justify-between items-start gap-3 relative z-10">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-1">
						<span
							className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border ${
								isAward
									? "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
									: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
							}`}
						>
							{item.category}
						</span>
						<span className="text-xs text-gray-500">{item.date}</span>
					</div>
					<h3
						className={`text-sm md:text-base font-bold transition-colors ${
							isActive ? "text-white" : "text-gray-300 group-hover:text-white"
						}`}
					>
						{item.title}
					</h3>
					<p className="text-xs text-gray-500 mt-1 truncate">{item.issuer}</p>
				</div>
			</div>
		</div>
	);
}

// --- KOMPONEN PREVIEW (Kanan) ---
function AchievementPreview({ item }: { item: Achievement }) {
	const isAward = item.category === "award";
	const themeColor = isAward ? "yellow-500" : "emerald-500";
	const borderColor = isAward ? "border-yellow-500" : "border-emerald-500";
	const shadowColor = isAward ? "shadow-yellow-500" : "shadow-emerald-500";
	const textColor = isAward ? "text-yellow-500" : "text-emerald-500";
	const bgColor = isAward ? "bg-yellow-500" : "bg-emerald-500";
	const fromColor = isAward ? "from-yellow-500" : "from-emerald-500";

	return (
		<div
			className={`h-full w-full rounded-2xl overflow-hidden relative group border-2 ${borderColor}/30 bg-[#0a0a0c] flex flex-col shadow-2xl ${shadowColor}/10 transition-opacity duration-200`}
		>
			{/* Decorative Overlay */}
			<div
				className={`absolute inset-0 bg-gradient-to-b ${fromColor}/10 via-transparent to-black/80 z-10 pointer-events-none`}
			/>

			{/* Header Image Area */}
			<div className="h-[40%] md:h-[50%] relative overflow-hidden shrink-0">
				{item.thumbnail ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={item.thumbnail}
						alt={item.title}
						className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700"
					/>
				) : (
					<div
						className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black`}
					>
						<FiAward className={`w-20 h-20 ${textColor}/20`} />
					</div>
				)}

				{/* Rank Badge */}
				{item.rank && (
					<div
						className={`absolute top-4 right-4 ${bgColor} text-black text-xs font-black px-3 py-1.5 rounded-md shadow-lg ${shadowColor}/30 z-20 flex items-center gap-2`}
					>
						<FiAward /> {item.rank.toUpperCase()}
					</div>
				)}
			</div>

			{/* Content Area */}
			<div className="flex-1 p-4 md:p-6 lg:p-8 relative z-20 flex flex-col bg-gradient-to-t from-[#0f0f11] to-transparent min-h-0">
				<div className="flex-1 min-h-0 flex flex-col">
					<div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-400">
						<span className={`w-2 h-2 rounded-full ${bgColor}`}></span>
						ISSUED BY: <span className="text-white">{item.issuer}</span>
					</div>
					<h2
						className={`text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 md:mb-4 leading-tight group-hover:${textColor} transition-colors duration-300`}
					>
						{item.title}
					</h2>
					<p className="text-gray-400 leading-relaxed text-xs md:text-sm lg:text-base font-light line-clamp-3 md:line-clamp-none">
						{item.description}
					</p>
				</div>

				{/* Footer Actions */}
				<div className="mt-auto pt-4 md:pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 h-auto md:h-16">
					<div className="text-[10px] md:text-xs font-mono text-gray-500 flex items-center leading-none">
						DATE: <span className="text-white ml-1">{item.date}</span>
					</div>

					{item.credentialUrl ? (
						<a
							href={item.credentialUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={`w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-md transition-all ${bgColor} text-black shadow-lg ${shadowColor}/20 hover:${shadowColor}/40 hover:-translate-y-1`}
						>
							<FiCheckCircle /> VERIFY CREDENTIAL
						</a>
					) : (
						<span className="w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-bold text-gray-500 bg-white/5 rounded-md cursor-not-allowed opacity-70">
							<FiExternalLink /> ENTRY PRIVATE
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
