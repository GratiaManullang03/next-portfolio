"use client";

import { useState, useEffect } from "react";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";
import SplitText from "@/components/ui/SplitText";

const CV_SUBTITLES = [
	"RESUME_DATA // READ_ONLY_MODE",
	"DEFINITELY_NOT_OUTDATED...",
	"HIRE_ME_MAYBE?",
	"PDF_LOADED_SUCCESSFULLY",
	"SKILLS_++ // EXPERIENCE_++",
];

export default function CVContent() {
	const [isLoading, setIsLoading] = useState(true);
	const [subtitleIndex, setSubtitleIndex] = useState(0);
	const pdfUrl = "/files/CV-Felix-Gratia-Mangatur-Manullang.pdf";

	useEffect(() => {
		const interval = setInterval(() => {
			setSubtitleIndex((prev) => (prev + 1) % CV_SUBTITLES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = "CV-Felix-Gratia-Mangatur-Manullang.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="h-full flex flex-col relative bg-[#030303] text-gray-300 font-mono overflow-hidden">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] left-[20%] w-[60%] h-[30%] rounded-full bg-white/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION (Sandwich Layout) --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md sticky top-0 z-20 shadow-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

				<div className="flex-1">
					<div className="flex items-center gap-2 mb-1">
						<FiFileText className="text-white/80 w-3 h-3" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
							// IDENTITY_FILE
						</span>
					</div>

					<SplitText
						text="CURRICULUM_VITAE"
						className="text-2xl md:text-3xl font-black text-white tracking-widest"
						targetClassName="text-white"
					/>

					<p className="text-[10px] text-white/70 font-mono tracking-[0.3em] uppercase mt-1 animate-pulse">
						{CV_SUBTITLES[subtitleIndex]}
					</p>
				</div>

				<div className="flex gap-2 bg-black/60 p-1.5 rounded-lg border border-white/10 shadow-inner">
					<button
						onClick={handleDownload}
						className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold tracking-wider text-[10px] md:text-xs rounded hover:bg-gray-200 transition-colors"
					>
						<FiDownload /> DOWNLOAD_PDF
					</button>
					<a
						href={pdfUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 hover:text-white font-bold tracking-wider text-[10px] md:text-xs rounded hover:bg-white/10 transition-colors"
					>
						<FiExternalLink /> OPEN_TAB
					</a>
				</div>
			</div>

			{/* PDF Container */}
			<div className="flex-1 relative z-10 p-0 md:p-8 bg-[#050505]">
				<div className="w-full h-full border border-white/10 rounded-none md:rounded-xl overflow-hidden shadow-2xl relative">
					{/* Loading State */}
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
							<div className="flex flex-col items-center gap-4">
								<div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
								<span className="font-mono text-gray-400 text-sm tracking-widest">
									LOADING_DOCUMENT...
								</span>
							</div>
						</div>
					)}

					{/* PDF Embed */}
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
