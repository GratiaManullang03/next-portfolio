"use client";

import { useState, useEffect } from "react";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const CV_SUBTITLES = [
	"RESUME_DATA // READ_ONLY_MODE",
	"DEFINITELY_NOT_OUTDATED...",
	"HIRE_ME_MAYBE?",
	"PDF_LOADED_SUCCESSFULLY",
	"SKILLS_++ // EXPERIENCE_++",
];

// Konfigurasi Teks
const TITLES = [
	{ left: "WRITING", right: "CODE", rightColor: "text-purple-400" },
	{ left: "WRITING", right: "BUGS", rightColor: "text-red-500" },
	{ left: "FIXING", right: "BUGS", rightColor: "text-red-500" },
	{ left: "FIXING", right: "CODE", rightColor: "text-purple-400" },
];

// Komponen Helper: Menganimasikan kata per huruf
// CATATAN: 'layout' prop DIHAPUS dari sini agar tidak konflik dengan wrapper
const RotatingWord = ({ text, color }: { text: string; color: string }) => {
	const characters = text.split("");
	return (
		<motion.div
			className={`flex relative items-center ${color} whitespace-pre`}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<motion.div
				className="flex"
				variants={{
					animate: { transition: { staggerChildren: 0.05 } },
					exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
				}}
			>
				{characters.map((char, i) => (
					<motion.span
						key={i}
						variants={{
							initial: {
								y: "100%",
								opacity: 0,
								rotateX: -90,
								filter: "blur(4px)",
							},
							animate: { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" },
							exit: {
								y: "-100%",
								opacity: 0,
								rotateX: 90,
								filter: "blur(4px)",
							},
						}}
						transition={{ type: "spring", damping: 12, stiffness: 200 }}
						className="inline-block origin-bottom"
					>
						{char}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
};

export default function CVContent() {
	const [isLoading, setIsLoading] = useState(true);
	const [subtitleIndex, setSubtitleIndex] = useState(0);
	const [titleIndex, setTitleIndex] = useState(0);
	const pdfUrl = "/files/CV-Felix-Gratia-Mangatur-Manullang.pdf";

	useEffect(() => {
		const subInterval = setInterval(() => {
			setSubtitleIndex((prev) => (prev + 1) % CV_SUBTITLES.length);
		}, 3000);

		const mainInterval = setInterval(() => {
			setTitleIndex((prev) => (prev + 1) % TITLES.length);
		}, 4000);

		return () => {
			clearInterval(subInterval);
			clearInterval(mainInterval);
		};
	}, []);

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = "CV-Felix-Gratia-Mangatur-Manullang.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const currentTitle = TITLES[titleIndex];

	return (
		<div className="h-full flex flex-col relative bg-[#030303] text-gray-300 font-mono overflow-hidden">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] left-[20%] w-[60%] h-[30%] rounded-full bg-white/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md sticky top-0 z-20 shadow-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

				<div className="flex-1 w-full md:w-auto">
					<div className="flex items-center gap-2 mb-2">
						<FiFileText className="text-purple-400 w-3 h-3" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-purple-400/70 uppercase">
							// IDENTITY_FILE
						</span>
					</div>

					{/* TITLE SECTION */}
					<div className="h-10 md:h-12 flex items-center overflow-hidden w-full">
						<LayoutGroup>
							<div className="flex flex-row items-baseline gap-x-3 text-2xl md:text-4xl font-black tracking-widest">
								{/* WRAPPER KIRI */}
								<motion.div
									layout
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
									className="relative inline-block"
								>
									<AnimatePresence mode="wait" initial={false}>
										<RotatingWord
											key={currentTitle.left}
											text={currentTitle.left}
											color="text-white"
										/>
									</AnimatePresence>
								</motion.div>

								{/* WRAPPER KANAN */}
								<motion.div
									layout
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
									className="relative inline-block"
								>
									<AnimatePresence mode="wait" initial={false}>
										<RotatingWord
											key={currentTitle.right}
											text={currentTitle.right}
											color={currentTitle.rightColor}
										/>
									</AnimatePresence>
								</motion.div>
							</div>
						</LayoutGroup>
					</div>

					<p className="text-[10px] text-white/50 font-mono tracking-[0.3em] uppercase mt-2 animate-pulse truncate">
						{CV_SUBTITLES[subtitleIndex]}
					</p>
				</div>

				{/* Tombol Download */}
				<div className="flex gap-2 w-full md:w-auto">
					<button
						onClick={handleDownload}
						className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-white text-black font-bold tracking-wider text-[10px] md:text-xs rounded hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
					>
						<FiDownload /> PDF
					</button>
					<a
						href={pdfUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-white/5 text-gray-300 hover:text-white font-bold tracking-wider text-[10px] md:text-xs rounded hover:bg-white/10 transition-colors border border-white/10"
					>
						<FiExternalLink /> TAB
					</a>
				</div>
			</div>

			{/* PDF Container */}
			<div className="flex-1 relative z-10 p-0 md:p-8 bg-[#050505]">
				<div className="w-full h-full border-t md:border border-white/10 rounded-none md:rounded-xl overflow-hidden shadow-2xl relative">
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
							<div className="flex flex-col items-center gap-4">
								<div className="w-10 h-10 border-3 border-white/20 border-t-purple-500 rounded-full animate-spin" />
								<span className="font-mono text-gray-400 text-sm tracking-widest">
									LOADING...
								</span>
							</div>
						</div>
					)}
					<object
						data={pdfUrl}
						type="application/pdf"
						className="w-full h-full bg-[#1a1a1a]"
						onLoad={() => setIsLoading(false)}
					>
						<iframe
							src={pdfUrl}
							className="w-full h-full border-0 bg-[#1a1a1a]"
							onLoad={() => setIsLoading(false)}
							title="Curriculum Vitae"
						/>
					</object>
				</div>
			</div>
		</div>
	);
}
