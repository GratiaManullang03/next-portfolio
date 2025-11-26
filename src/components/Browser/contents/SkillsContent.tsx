import dynamic from "next/dynamic";
import { FiCpu } from "react-icons/fi";
import { useState, useEffect } from "react";
import GlitchText from "@/components/ui/GlitchText"; // Import komponen baru

const SkillsGlobe = dynamic(() => import("./SkillsGlobe"), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center w-full h-full text-green-500/50 font-mono text-xs tracking-widest animate-pulse">
			[ LOADING_MODULE... ]
		</div>
	),
});

const SUBTITLES = [
	"ORBITAL_TECH_SYSTEM",
	"WEAPONS_LOADED // READY",
	"STACK_OPTIMIZED",
	"SKILLS_DATABASE",
	"TECH_ARSENAL_ONLINE",
];

const SkillsContent = () => {
	const [subtitleIndex, setSubtitleIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="h-full flex flex-col bg-black text-gray-300 font-mono overflow-hidden relative">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/5 blur-[120px]" />
			</div>

			{/* --- HEADER SECTION --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-black/90 backdrop-blur-md z-20 shadow-2xl relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50" />

				<div className="flex items-center gap-1.5 mb-2">
					<FiCpu className="text-green-500 w-3 h-3" />
					<span className="text-[10px] font-mono tracking-[0.2em] text-green-400/80 uppercase">
						// TECH_ARSENAL
					</span>
				</div>

				{/* TITLE SECTION WITH CONSISTENT HEIGHT */}
				<div className="h-10 md:h-12 flex items-center overflow-hidden">
					<h1 className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase font-mono">
						{/* Menggunakan GlitchText di sini */}
						<GlitchText
							text="TECH STACK"
							speed={0.8}
							className="text-[#22c55e]"
						/>
					</h1>
				</div>

				<p className="text-[10px] text-green-400/80 font-mono tracking-[0.3em] uppercase mt-2 animate-pulse">
					{SUBTITLES[subtitleIndex]}
				</p>
			</div>

			{/* --- MAIN CONTENT (Globe) --- */}
			<div className="flex-1 relative z-10 overflow-hidden flex items-center justify-center">
				<SkillsGlobe />

				{/* Overlay Vignette */}
				<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
			</div>
		</div>
	);
};

export default SkillsContent;
