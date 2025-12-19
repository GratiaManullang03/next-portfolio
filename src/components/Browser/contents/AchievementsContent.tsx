"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import {
	FiAward,
	FiCheckCircle,
	FiExternalLink,
	FiFileText,
	FiFilter,
	FiTarget,
	FiZap,
	FiCpu,
} from "react-icons/fi";
import { achievementsData, Achievement } from "@/data/achievements";
import Image from "next/image";
import ShuffleText from "@/components/ui/ShuffleText";

const TITLES = [
	"TROPHY_VAULT",
	"HALL_OF_FAME",
	"CREDENTIALS_LOG",
	"ACHIEVEMENTS_DB",
	"LEGACY_SYSTEM",
];

const SUBTITLES = [
	"VALIDATING_CREDENTIALS...",
	"AWARDS_UNLOCKED // CERTIFIED",
	"PROOF_OF_ACHIEVEMENT",
	"AUTHORIZED_EXCELLENCE",
	"LEGACY_ESTABLISHED",
];

// --- MAIN COMPONENT ---
export default function AchievementsContent() {
	const [filter, setFilter] = useState<"all" | "award" | "certification">(
		"all"
	);
	const [selectedId, setSelectedId] = useState<string>(
		achievementsData[0]?.id || ""
	);

	const leftScrollRef = useRef<HTMLDivElement>(null);
	const rightScrollRef = useRef<HTMLDivElement>(null);

	// Initialize Lenis for left sidebar scroll
	useLenis(leftScrollRef, {
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		syncTouch: false,
	});

	// Initialize Lenis for right content scroll
	useLenis(rightScrollRef, {
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		syncTouch: false,
	});

	// Filter Logic
	const filteredData =
		filter === "all"
			? achievementsData
			: achievementsData.filter((item) => item.category === filter);

	// Mendapatkan item yang sedang aktif
	const activeItem =
		achievementsData.find((item) => item.id === selectedId) ||
		achievementsData[0];

	// Auto-select item pertama jika filter berubah
	useEffect(() => {
		const exists = filteredData.find((item) => item.id === selectedId);
		if (!exists && filteredData.length > 0) {
			setSelectedId(filteredData[0].id);
		}
	}, [filter, filteredData, selectedId]);

	return (
		<div className="h-full w-full bg-[#030303] text-gray-200 font-sans overflow-hidden flex flex-col relative">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

			{/* Background Gradients (Fixed position) */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/5 blur-[120px]" />
				<div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-900/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md shadow-2xl relative">
				{/* Scanline decoration under header */}
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

				<div className="flex-1 w-full md:w-auto">
					<div className="flex items-center gap-2 mb-2">
						<FiCpu className="text-emerald-500 animate-spin-slow w-3 h-3" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400/80 uppercase">
							SystemV.2.0 // Secured
						</span>
					</div>

					{/* TITLE SECTION WITH CONSISTENT HEIGHT */}
					<div className="h-10 md:h-12 flex items-center overflow-hidden w-full">
						<ShuffleText
							texts={TITLES}
							className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase font-mono"
							interval={2500}
							duration={0.65}
							shuffleTimes={6}
							scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"
							stagger={0.04}
							subtitles={SUBTITLES}
							subtitleClassName="text-[10px] text-emerald-400/80 font-mono tracking-[0.3em] uppercase mt-2 animate-pulse"
						/>
					</div>
				</div>

				{/* Filter "Knobs" */}
				<div className="flex bg-[#0f0f11] p-1 rounded-full border border-white/10 shadow-inner overflow-x-auto max-w-full w-full md:w-auto">
					{[
						{ key: "all", label: "ALL_DATA" },
						{ key: "award", label: "AWARDS" },
						{ key: "certification", label: "CERTIFICATES" },
					].map((tab) => (
						<button
							key={tab.key}
							onClick={() => setFilter(tab.key as any)}
							className={`flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2 rounded-full text-[10px] md:text-xs font-bold tracking-wider transition-all duration-500 relative overflow-hidden group ${
								filter === tab.key
									? "text-black"
									: "text-gray-500 hover:text-white"
							}`}
						>
							{filter === tab.key && (
								<motion.div
									layoutId="activeFilter"
									className="absolute inset-0 bg-white"
									transition={{ type: "spring", stiffness: 300, damping: 30 }}
								/>
							)}
							<span className="relative z-10 flex items-center justify-center gap-2">
								{tab.key === "all" && <FiFilter className="w-3 h-3" />}
								{tab.key === "award" && <FiAward className="w-3 h-3" />}
								{tab.key === "certification" && (
									<FiFileText className="w-3 h-3" />
								)}
								{tab.label}
							</span>
						</button>
					))}
				</div>
			</div>

			{/* --- CONTENT LAYOUT --- */}
			<div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">
				{/* --- LEFT: SCROLLABLE LIST --- */}
				<div
					ref={leftScrollRef}
					className="w-full lg:w-[420px] overflow-y-auto custom-scrollbar border-b lg:border-r lg:border-b-0 border-white/5 bg-[#050505]/50 flex flex-col backdrop-blur-sm z-20"
				>
					<div className="p-3 md:p-6 space-y-2">
						<AnimatePresence mode="popLayout">
							{filteredData.map((item, index) => (
								<motion.div
									key={item.id}
									layout
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ delay: index * 0.05 }}
								>
									<VaultCard
										item={item}
										isActive={selectedId === item.id}
										onClick={() => setSelectedId(item.id)}
									/>
								</motion.div>
							))}
						</AnimatePresence>

						{filteredData.length === 0 && (
							<div className="py-20 text-center opacity-50 font-mono text-xs text-red-500">
								[ERROR: NO DATA FOUND IN THIS SECTOR]
							</div>
						)}
					</div>
				</div>

				{/* --- RIGHT: THE SCROLLABLE HOLO STAGE (Desktop) --- */}
				<div className="hidden lg:flex flex-1 relative bg-[#020202] flex-col overflow-hidden">
					{/* Fixed Background Elements (Supaya saat discroll background tidak ikut gerak) */}
					<div className="absolute inset-0 pointer-events-none">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-black opacity-40" />
						<div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] opacity-20" />
					</div>

					{/* Scrollable Content Container */}
					<div
						ref={rightScrollRef}
						className="flex-1 overflow-y-auto custom-scrollbar relative z-30 p-6 md:p-10 flex items-start justify-center"
					>
						<div className="w-full max-w-4xl min-h-full flex flex-col items-center justify-center py-10">
							<AnimatePresence mode="wait">
								{activeItem && (
									<StageProjection key={activeItem.id} item={activeItem} />
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* --- MOBILE: BOTTOM SHEET STYLE (Handled by VaultCard expansion) --- */}
			</div>
		</div>
	);
}

// --- SUB-COMPONENT: VAULT CARD (The List Item) ---
function VaultCard({
	item,
	isActive,
	onClick,
}: {
	item: Achievement;
	isActive: boolean;
	onClick: () => void;
}) {
	const isAward = item.category === "award";
	const themeColor = isAward ? "text-yellow-500" : "text-emerald-500";
	const borderColor = isAward
		? "border-yellow-500/50"
		: "border-emerald-500/50";
	const activeBg = isAward ? "bg-yellow-500/5" : "bg-emerald-500/5";

	return (
		<div
			onClick={onClick}
			className={`relative group cursor-pointer transition-all duration-300 rounded-lg border-l-2 ${
				isActive
					? `${borderColor} ${activeBg} bg-opacity-100`
					: "border-transparent hover:border-white/20 hover:bg-white/[0.03]"
			} overflow-hidden`}
		>
			<div className="p-3 md:p-4 flex gap-3 md:gap-4 items-center relative z-10">
				{/* Thumbnail (Small) */}
				<div
					className={`relative w-10 h-10 md:w-12 md:h-12 shrink-0 rounded overflow-hidden bg-gray-900 border ${
						isActive ? borderColor : "border-white/10"
					} transition-colors duration-300`}
				>
					{item.thumbnail ? (
						<Image
							src={item.thumbnail}
							alt={item.title}
							fill
							sizes="48px"
							className={`object-cover transition-all duration-500 ${
								isActive
									? "grayscale-0 opacity-100"
									: "grayscale opacity-60 group-hover:opacity-100"
							}`}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray-700">
							<FiAward />
						</div>
					)}
				</div>

				{/* Text Info */}
				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-center mb-1">
						<span className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-wider">
							{item.date}
						</span>
						{item.rank && (
							<span
								className={`text-[8px] md:text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-black border ${
									isActive ? borderColor : "border-white/10 text-gray-500"
								} ${isActive ? themeColor : ""}`}
							>
								{item.rank}
							</span>
						)}
					</div>
					<h3
						className={`text-xs md:text-sm font-bold leading-tight transition-colors ${
							isActive
								? "text-white"
								: "text-gray-400 group-hover:text-gray-200"
						}`}
					>
						{item.title}
					</h3>
				</div>
			</div>

			{/* ANIMATED UNDERLINE (Left to Right wipe) */}
			{isActive && (
				<motion.div
					layoutId="activeGlow"
					className={`absolute bottom-0 left-0 right-0 h-[1px] ${
						isAward
							? "bg-gradient-to-r from-yellow-500 to-transparent"
							: "bg-gradient-to-r from-emerald-500 to-transparent"
					}`}
					initial={{ scaleX: 0, opacity: 0, originX: 0 }} // Start from left
					animate={{ scaleX: 1, opacity: 1, originX: 0 }} // Wipe to right
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				/>
			)}

			{/* --- MOBILE EXPANDABLE CONTENT --- */}
			<div
				className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
					isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="p-3 md:p-4 pt-0 mt-2 border-t border-white/5 bg-black/20">
					<p className="text-[11px] md:text-xs text-gray-400 leading-relaxed font-light mb-4">
						{item.description}
					</p>
					{item.credentialUrl && (
						<a
							href={item.credentialUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full py-2.5 md:py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-center rounded text-[10px] md:text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
						>
							<FiExternalLink className="w-3 h-3" /> OPEN CREDENTIAL FILE
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

// --- SUB-COMPONENT: STAGE PROJECTION (The Right Side) ---
function StageProjection({ item }: { item: Achievement }) {
	const isAward = item.category === "award";
	const accentColor = isAward ? "#eab308" : "#10b981"; // yellow-500 : emerald-500

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="w-full flex flex-col items-center text-center"
		>
			{/* 1. Header Metadata */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="flex flex-col items-center gap-2 mb-8"
			>
				<div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur text-[10px] font-mono tracking-widest uppercase text-gray-400 flex items-center gap-2">
					<span
						className="w-1.5 h-1.5 rounded-full animate-pulse"
						style={{ background: accentColor }}
					/>
					SECURE_ID: {item.id.toUpperCase()}
				</div>
			</motion.div>

			{/* 2. The Holographic Image Container */}
			<div className="relative group perspective-1000 mb-10 w-full max-w-2xl">
				{/* Ambient Glow Behind */}
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 blur-[80px] transition-colors duration-1000"
					style={{ backgroundColor: accentColor }}
				/>

				<motion.div
					className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0c] z-10"
					whileHover={{ scale: 1.01 }}
					transition={{ type: "spring", stiffness: 100 }}
				>
					{item.thumbnail ? (
						<Image
							src={item.thumbnail}
							alt={item.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
							className="object-cover"
							priority
						/>
					) : (
						<div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
							<FiAward className="w-20 h-20 text-gray-800" />
						</div>
					)}

					{/* Cinematic Overlay Gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

					{/* Corner Accents */}
					<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
					<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
					<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
					<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
				</motion.div>
			</div>

			{/* 3. Typography Details */}
			<div className="space-y-6 max-w-2xl relative z-20 px-4 md:px-0">
				<div>
					<motion.h2
						className="text-2xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight mb-4"
						style={{ textShadow: `0 0 30px ${accentColor}40` }}
					>
						{item.title}
					</motion.h2>

					<div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-sm font-mono text-gray-400">
						<span className="flex items-center gap-2">
							<FiTarget className="text-white w-3 h-3" /> {item.issuer}
						</span>
						<span>//</span>
						<span>{item.date}</span>
						{item.rank && (
							<>
								<span>//</span>
								<span className="font-bold text-white px-2 py-0.5 bg-white/10 rounded text-[10px] md:text-xs">
									{item.rank}
								</span>
							</>
						)}
					</div>
				</div>

				<div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

				<motion.p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed">
					{item.description}
				</motion.p>
			</div>

			{/* 4. Actions */}
			<motion.div className="mt-6 md:mt-10 flex flex-col items-center gap-4 px-4 md:px-0">
				{item.credentialUrl ? (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative px-6 md:px-10 py-3 md:py-4 bg-white text-black font-black tracking-wider uppercase rounded-sm overflow-hidden transition-transform hover:-translate-y-1 text-xs md:text-base"
					>
						<span className="relative z-10 flex items-center gap-2">
							<FiCheckCircle className="w-4 h-4 md:w-5 md:h-5" /> View
							Credential
						</span>
						{/* Hover Fill Effect */}
						<div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
							style={{ backgroundColor: accentColor }}
						/>
						{/* Shine Effect */}
						<div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 transition-all duration-700 group-hover:left-[100%]" />
					</a>
				) : (
					<div className="px-6 md:px-8 py-2.5 md:py-3 border border-dashed border-white/20 text-gray-500 font-mono text-[10px] md:text-xs rounded-full flex items-center gap-2 cursor-not-allowed">
						<FiZap className="w-3 h-3" /> DATA_LOCKED / NO_LINK
					</div>
				)}

				<p className="text-[9px] md:text-[10px] text-gray-600 font-mono mt-4 max-w-md text-center">
					*Authorized personnel only. Redistribution of this certificate data
					without proper clearance is a violation of protocol 734.
				</p>
			</motion.div>
		</motion.div>
	);
}
