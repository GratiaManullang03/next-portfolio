import React from "react";
import dynamic from "next/dynamic";
import DecryptedText from "@/components/DecryptedText"; // Menggunakan komponen keren yang sudah ada di repo lu

// Import SkillsGlobe secara dynamic agar tidak error window is undefined saat build
const SkillsGlobe = dynamic(() => import("./SkillsGlobe"), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center w-full h-full text-green-500/50 font-mono text-sm">
			INITIALIZING_SYSTEM...
		</div>
	),
});

const SkillsContent = () => {
	return (
		<div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
			{/* 1. Header Section dengan Gradient Background agar text terbaca */}
			<div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
				<div className="w-full bg-gradient-to-b from-black via-black/80 to-transparent pt-8 pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center">
					<h2 className="text-3xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-3 tracking-tighter drop-shadow-sm">
						TECHNICAL PROFICIENCY
					</h2>

					<div className="text-sm md:text-lg text-gray-400 max-w-2xl font-light tracking-wide leading-relaxed">
						<DecryptedText
							text="A visual representation of my technological stack and expertise."
							speed={50}
							maxIterations={20}
							className="reveal-text"
							parentClassName="all-letters"
							encryptedClassName="encrypted-letters"
						/>
					</div>
				</div>
			</div>

			{/* 2. Main Content (Globe) */}
			<div className="relative flex-grow w-full h-full z-10">
				<SkillsGlobe />
			</div>

			{/* 3. Optional: Footer decoration atau instruction */}
			<div className="absolute bottom-4 right-6 z-20 pointer-events-none opacity-50 hidden md:block">
				<span className="text-xs font-mono text-green-500">
					[ DRAG TO ROTATE ]
				</span>
			</div>
		</div>
	);
};

export default SkillsContent;
