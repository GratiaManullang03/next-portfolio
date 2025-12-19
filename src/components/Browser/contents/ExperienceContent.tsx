"use client";

import { useState, useRef, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	Variants,
	useScroll,
	useTransform,
} from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import {
	FiBriefcase,
	FiUsers,
	FiCalendar,
	FiMapPin,
	FiActivity,
	FiHash,
	FiTerminal,
} from "react-icons/fi";
import {
	workExperiences,
	organizationalExperiences,
	Experience,
} from "@/data/experience";
import CyberCard from "@/components/ui/CyberCard";
import SplitText from "@/components/ui/SplitText";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, x: -30 },
	show: {
		opacity: 1,
		x: 0,
		transition: { type: "spring", stiffness: 40, damping: 15 },
	},
};

const SPLIT_TITLES = [
	"EXPERIENCE_LOGS",
	"CAREER_HISTORY",
	"SYSTEM_ARCHIVES",
	"DATA_TIMELINE",
	"TRACK_RECORD",
];

const EXPERIENCE_SUBTITLES = [
	"ACCESSING_ENCRYPTED_RECORDS...",
	"YES_I_ACTUALLY_DID_THIS",
	"TRUST_ME_BRO",
	"EXPERIENCE_POINTS_+999",
	"LOADING_CAREER_ACHIEVEMENTS...",
];

export default function ExperienceContent() {
	const [activeTab, setActiveTab] = useState<"work" | "org">("work");
	const [titleIndex, setTitleIndex] = useState(0);
	const [subtitleIndex, setSubtitleIndex] = useState(0);

	const scrollRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Initialize Lenis for smooth scrolling
	useLenis(scrollRef, {
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		syncTouch: false,
	});

	const { scrollYProgress } = useScroll({
		container: scrollRef,
		target: contentRef,
		offset: ["start start", "end end"],
	});

	const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTitleIndex((prev) => (prev + 1) % SPLIT_TITLES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setSubtitleIndex((prev) => (prev + 1) % EXPERIENCE_SUBTITLES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const data =
		activeTab === "work" ? workExperiences : organizationalExperiences;

	return (
		<div className="h-full flex flex-col bg-[#030303] text-gray-300 font-mono overflow-hidden relative">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION (Sandwich Layout) --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md sticky top-0 z-20 shadow-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

				<div className="flex-1 w-full md:w-auto">
					<div className="flex items-center gap-2 mb-2">
						<FiTerminal className="text-cyan-500 w-3 h-3" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400/80 uppercase">
							// CAREER_TIMELINE
						</span>
					</div>

					{/* TITLE SECTION WITH CONSISTENT HEIGHT */}
					<div className="h-10 md:h-12 flex items-center overflow-hidden w-full">
						<SplitText
							text={SPLIT_TITLES[titleIndex]}
							className="text-2xl md:text-4xl font-black text-white tracking-widest"
							targetClassName="text-white"
						/>
					</div>

					<p className="text-[10px] text-cyan-400/80 font-mono tracking-[0.3em] uppercase mt-2 animate-pulse truncate">
						{EXPERIENCE_SUBTITLES[subtitleIndex]}
					</p>
				</div>

				<div className="flex p-1 bg-black/40 rounded-lg border border-white/10 w-full md:w-auto">
					<button
						onClick={() => setActiveTab("work")}
						className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-300 ${
							activeTab === "work"
								? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						<FiBriefcase className="w-3 h-3" /> CAREER
					</button>
					<button
						onClick={() => setActiveTab("org")}
						className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-300 ${
							activeTab === "org"
								? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]"
								: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
						}`}
					>
						<FiUsers className="w-3 h-3" /> ORG
					</button>
				</div>
			</div>

			{/* Scrollable Content */}
			<div
				ref={scrollRef}
				className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative scroll-smooth z-10"
			>
				<div
					ref={contentRef}
					className="max-w-4xl mx-auto relative pl-6 md:pl-12 pt-4 pb-20"
				>
					{/* === DYNAMIC TIMELINE LINE === */}
					<div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-[2px] bg-[#333]" />
					<motion.div
						className="absolute left-[15px] md:left-[23px] top-0 w-[2px] bg-gradient-to-b from-cyan-600 via-purple-600 to-cyan-600 origin-top shadow-[0_0_10px_cyan]"
						style={{ height: "100%", scaleY: scaleY }}
					/>

					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							variants={containerVariants}
							initial="hidden"
							animate="show"
							className="space-y-10"
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
			{/* Timeline Node */}
			<div className="absolute -left-[14px] md:-left-[14px] top-8 flex items-center justify-center">
				<div className="w-5 h-5 rounded-full border border-cyan-500/50 bg-[#0a0a0c] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(8,145,178,0.3)] group-hover:scale-125 transition-transform duration-300">
					<div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:bg-purple-500 transition-colors" />
				</div>
				<div className="absolute left-5 w-6 md:w-8 h-[1px] bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors duration-500" />
			</div>

			{/* Card */}
			<CyberCard className="w-full">
				<div className="p-4 md:p-7 relative z-10">
					{/* Header */}
					<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
						<div>
							<h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
								{item.role}
							</h3>
							<div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-400">
								<span className="w-2 h-2 rounded-sm bg-purple-500 rotate-45"></span>
								{item.company}
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							<div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded text-cyan-500 text-[11px] font-bold uppercase tracking-wider">
								<FiCalendar className="w-3 h-3" />
								{item.period}
							</div>
							<div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded text-gray-400 text-[11px]">
								<FiMapPin className="w-3 h-3" />
								{item.location}
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="relative pl-4 border-l-2 border-white/5 group-hover:border-cyan-500/50 transition-colors duration-500">
						<p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
							{item.description}
						</p>
					</div>

					{/* Footer Clean */}
					<div className="mt-6 pt-4 border-t border-dashed border-white/10 flex justify-between items-center">
						<div className="text-[10px] font-mono text-gray-600 flex items-center gap-2 group-hover:text-cyan-500 transition-colors">
							<FiActivity />
							<span>
								HASH: {Math.random().toString(36).substring(7).toUpperCase()}
							</span>
						</div>
						<div className="text-[10px] font-mono text-gray-600 group-hover:text-purple-500 transition-colors">
							[SECURE_LOG]
						</div>
					</div>
				</div>
			</CyberCard>
		</motion.div>
	);
}
