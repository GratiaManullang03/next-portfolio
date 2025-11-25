"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// --- 1. NEW COMPONENT: CYBER SCRAMBLE TITLE ---
// Efek: Mengacak huruf sebelum menjadi teks asli, lalu berganti kata.
const TITLES = [
	"TROPHY_VAULT",
	"HALL_OF_FAME",
	"CREDENTIALS_LOG",
	"ACHIEVEMENTS_DB",
	"LEGACY_SYSTEM",
];

const CyberScramble = () => {
	const [index, setIndex] = useState(0);
	const [displayText, setDisplayText] = useState(TITLES[0]);
	const [isScrambling, setIsScrambling] = useState(false);

	// Characters for the scramble effect
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

	useEffect(() => {
		let interval: NodeJS.Timeout;

		const startScramble = () => {
			setIsScrambling(true);
			let scrambleIter = 0;
			const targetText = TITLES[index];
			const maxIter = 15; // Berapa lama ngacaknya

			interval = setInterval(() => {
				const scrambled = targetText
					.split("")
					.map((char, i) => {
						if (char === " ") return " ";
						if (scrambleIter > maxIter + i * 2) return char; // Reveal char bertahap
						return chars[Math.floor(Math.random() * chars.length)];
					})
					.join("");

				setDisplayText(scrambled);
				scrambleIter++;

				if (scrambleIter > maxIter + targetText.length * 3) {
					clearInterval(interval);
					setIsScrambling(false);
					// Wait before next word
					setTimeout(() => {
						setIndex((prev) => (prev + 1) % TITLES.length);
					}, 3000);
				}
			}, 50);
		};

		startScramble();

		return () => clearInterval(interval);
	}, [index]);

	return (
		<div className="relative inline-block">
			<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-mono">
				{displayText}
				<span className="animate-pulse text-emerald-500">_</span>
			</h1>
			<p className="text-[10px] text-emerald-500/60 font-mono tracking-[0.3em] uppercase mt-1">
				{isScrambling ? "DECRYPTING_SECURE_DATA..." : "ACCESS_GRANTED"}
			</p>
		</div>
	);
};

// --- MAIN COMPONENT ---
export default function AchievementsContent() {
	const [filter, setFilter] = useState<"all" | "award" | "certification">(
		"all"
	);
	const [selectedId, setSelectedId] = useState<string>(
		achievementsData[0]?.id || ""
	);

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
			<div className="shrink-0 px-6 md:px-10 py-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md shadow-2xl relative">
				{/* Scanline decoration under header */}
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

				<div>
					<div className="flex items-center gap-2 mb-2">
						<FiCpu className="text-emerald-500 animate-spin-slow" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
							SystemV.2.0 // Secured
						</span>
					</div>
					<CyberScramble />
				</div>

				{/* Filter "Knobs" */}
				<div className="flex bg-[#0f0f11] p-1 rounded-full border border-white/10 shadow-inner overflow-x-auto max-w-full">
					{[
						{ key: "all", label: "ALL_DATA" },
						{ key: "award", label: "AWARDS" },
						{ key: "certification", label: "CERTIFICATES" },
					].map((tab) => (
						<button
							key={tab.key}
							onClick={() => setFilter(tab.key as any)}
							className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-wider transition-all duration-500 relative overflow-hidden group ${
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
							<span className="relative z-10 flex items-center gap-2">
								{tab.key === "all" && <FiFilter />}
								{tab.key === "award" && <FiAward />}
								{tab.key === "certification" && <FiFileText />}
								{tab.label}
							</span>
						</button>
					))}
				</div>
			</div>

			{/* --- CONTENT LAYOUT --- */}
			<div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">
				{/* --- LEFT: SCROLLABLE LIST --- */}
				<div className="w-full lg:w-[420px] overflow-y-auto custom-scrollbar border-r border-white/5 bg-[#050505]/50 flex flex-col backdrop-blur-sm z-20">
					<div className="p-4 md:p-6 space-y-2">
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
					<div className="flex-1 overflow-y-auto custom-scrollbar relative z-30 p-10 flex items-start justify-center">
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
			<div className="p-4 flex gap-4 items-center relative z-10">
				{/* Thumbnail (Small) */}
				<div
					className={`relative w-12 h-12 shrink-0 rounded overflow-hidden bg-gray-900 border ${
						isActive ? borderColor : "border-white/10"
					} transition-colors duration-300`}
				>
					{item.thumbnail ? (
						<Image
							src={item.thumbnail}
							alt={item.title}
							fill
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
						<span className="text-[10px] text-gray-500 font-mono tracking-wider">
							{item.date}
						</span>
						{item.rank && (
							<span
								className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-black border ${
									isActive ? borderColor : "border-white/10 text-gray-500"
								} ${isActive ? themeColor : ""}`}
							>
								{item.rank}
							</span>
						)}
					</div>
					<h3
						className={`text-sm font-bold leading-tight transition-colors ${
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
				<div className="p-4 pt-0 mt-2 border-t border-white/5 bg-black/20">
					<p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
						{item.description}
					</p>
					{item.credentialUrl && (
						<a
							href={item.credentialUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-center rounded text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
						>
							<FiExternalLink /> OPEN CREDENTIAL FILE
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
			initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
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
			<div className="space-y-6 max-w-2xl relative z-20">
				<div>
					<motion.h2
						className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight mb-4"
						style={{ textShadow: `0 0 30px ${accentColor}40` }}
					>
						{item.title}
					</motion.h2>

					<div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-mono text-gray-400">
						<span className="flex items-center gap-2">
							<FiTarget className="text-white" /> {item.issuer}
						</span>
						<span>//</span>
						<span>{item.date}</span>
						{item.rank && (
							<>
								<span>//</span>
								<span className="font-bold text-white px-2 py-0.5 bg-white/10 rounded">
									{item.rank}
								</span>
							</>
						)}
					</div>
				</div>

				<div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

				<motion.p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
					{item.description}
				</motion.p>
			</div>

			{/* 4. Actions */}
			<motion.div className="mt-10 flex flex-col items-center gap-4">
				{item.credentialUrl ? (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative px-10 py-4 bg-white text-black font-black tracking-wider uppercase rounded-sm overflow-hidden transition-transform hover:-translate-y-1"
					>
						<span className="relative z-10 flex items-center gap-2">
							<FiCheckCircle className="w-5 h-5" /> View Credential
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
					<div className="px-8 py-3 border border-dashed border-white/20 text-gray-500 font-mono text-xs rounded-full flex items-center gap-2 cursor-not-allowed">
						<FiZap /> DATA_LOCKED / NO_LINK
					</div>
				)}

				<p className="text-[10px] text-gray-600 font-mono mt-4 max-w-md">
					*Authorized personnel only. Redistribution of this certificate data
					without proper clearance is a violation of protocol 734.
				</p>
			</motion.div>
		</motion.div>
	);
}
