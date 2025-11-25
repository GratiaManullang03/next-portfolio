"use client";

import { useState, useRef, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	Variants,
	useScroll,
	useTransform,
} from "framer-motion";
import {
	FiBriefcase,
	FiUsers,
	FiCalendar,
	FiMapPin,
	FiActivity,
	FiHash,
} from "react-icons/fi";
import {
	workExperiences,
	organizationalExperiences,
	Experience,
} from "@/data/experience";
import CyberCard from "@/components/ui/CyberCard";
import SplitText from "@/components/ui/SplitText";

// --- Variants ---
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
	show: {
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: { type: "spring", stiffness: 40, damping: 15 },
	},
};

// --- Data Judul Shuffle ---
const SPLIT_TITLES = [
	"EXPERIENCE_LOGS",
	"CAREER_HISTORY",
	"SYSTEM_ARCHIVES",
	"DATA_TIMELINE",
	"TRACK_RECORD",
];

export default function ExperienceContent() {
	const [activeTab, setActiveTab] = useState<"work" | "org">("work");
	const [titleIndex, setTitleIndex] = useState(0);

	const scrollRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

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

	const data =
		activeTab === "work" ? workExperiences : organizationalExperiences;

	return (
		<div className="h-full flex flex-col bg-[#050505] text-gray-300 font-mono overflow-hidden relative">
			{/* Background */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage:
						"radial-gradient(circle at top left, #a855f7 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>

			{/* Header & Tabs */}
			<div className="h-[56px] px-6 py-2 border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-20 shrink-0 shadow-lg shadow-black/50 flex items-center">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
					<div className="flex items-center gap-3 w-full md:w-auto">
						<div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
							<FiHash className="w-5 h-5" />
						</div>
						<div className="flex flex-col">
							<div className="h-[24px] overflow-hidden">
								<SplitText
									text={SPLIT_TITLES[titleIndex]}
									className="text-xl font-bold text-white tracking-widest"
									targetClassName="text-white"
								/>
							</div>
							<span className="text-[10px] text-gray-500 font-mono mt-1">
								// ACCESSING ENCRYPTED RECORDS...
							</span>
						</div>
					</div>

					<div className="flex p-1 bg-black/40 rounded-lg border border-white/10 w-full md:w-auto">
						<button
							onClick={() => setActiveTab("work")}
							className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
								activeTab === "work"
									? "bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
									: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
							}`}
						>
							<FiBriefcase /> CAREER
						</button>
						<button
							onClick={() => setActiveTab("org")}
							className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
								activeTab === "org"
									? "bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
									: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
							}`}
						>
							<FiUsers /> ORG
						</button>
					</div>
				</div>
			</div>

			{/* Scrollable Content */}
			<div
				ref={scrollRef}
				className="flex-1 overflow-y-auto p-8 custom-scrollbar relative scroll-smooth"
			>
				<div
					ref={contentRef}
					className="max-w-4xl mx-auto relative pl-8 md:pl-12 pt-4 pb-20"
				>
					{/* === DYNAMIC TIMELINE LINE === */}
					<div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] bg-[#333]" />
					<motion.div
						className="absolute left-[19px] md:left-[23px] top-0 w-[2px] bg-gradient-to-b from-[#a855f7] via-[#06b6d4] to-[#a855f7] origin-top shadow-[0_0_10px_#a855f7]"
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
		<motion.div variants={cardVariants} className="relative pl-8">
			{/* Timeline Node */}
			<div className="absolute -left-[18px] md:-left-[14px] top-8 flex items-center justify-center">
				<div className="w-5 h-5 rounded-full border border-[#a855f7]/50 bg-[#0a0a0c] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-125 transition-transform duration-300">
					<div className="w-2 h-2 rounded-full bg-[#a855f7] group-hover:bg-[#06b6d4] transition-colors" />
				</div>
				<div className="absolute left-5 w-8 h-[1px] bg-[#a855f7]/30 group-hover:bg-[#a855f7] transition-colors duration-500" />
			</div>

			{/* Card */}
			<CyberCard className="w-full">
				<div className="p-6 md:p-7 relative z-10">
					{/* Header */}
					<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
						<div>
							<h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
								{item.role}
							</h3>
							<div className="flex items-center gap-2 text-sm font-medium text-gray-400">
								<span className="w-2 h-2 rounded-sm bg-[#06b6d4] rotate-45"></span>
								{item.company}
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							<div className="flex items-center gap-2 px-3 py-1.5 bg-[#a855f7]/5 border border-[#a855f7]/20 rounded text-[#a855f7] text-[11px] font-bold uppercase tracking-wider">
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
					<div className="relative pl-4 border-l-2 border-white/5 group-hover:border-[#06b6d4]/50 transition-colors duration-500">
						<p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
							{item.description}
						</p>
					</div>

					{/* Footer Clean */}
					<div className="mt-6 pt-4 border-t border-dashed border-white/10 flex justify-between items-center">
						<div className="text-[10px] font-mono text-gray-600 flex items-center gap-2 group-hover:text-[#a855f7] transition-colors">
							<FiActivity />
							<span>
								HASH: {Math.random().toString(36).substring(7).toUpperCase()}
							</span>
						</div>
						<div className="text-[10px] font-mono text-gray-600 group-hover:text-[#06b6d4] transition-colors">
							[SECURE_LOG]
						</div>
					</div>
				</div>
			</CyberCard>
		</motion.div>
	);
}
