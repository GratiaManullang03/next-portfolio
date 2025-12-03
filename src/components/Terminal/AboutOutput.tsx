"use client";

import Image from "next/image";
import { useState } from "react";

const AboutOutput = () => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className="my-6 font-mono text-sm block relative clearfix">
			{/* --- IMAGE SECTION ---
                RESPONSIVITAS:
                - Mobile & Tablet: Gambar di atas (stacked), teks di bawah
                - Desktop (lg+): Side-by-side dengan float-left
            */}
			<div className="flex-shrink-0 group/section lg:float-left lg:mr-8 lg:mb-2 mx-auto lg:mx-0 w-fit mb-6 lg:block relative z-10">
				<div className="relative">
					{/* Corner accents */}
					<div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
					<div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
					<div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
					<div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>

					<div className="relative w-52 h-52 rounded overflow-hidden border border-zinc-800 group/avatar bg-zinc-900 p-2">
						{/* Scanline */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full translate-y-[-100%] group-hover/avatar:translate-y-[100%] transition-transform duration-1000 ease-linear pointer-events-none z-10"></div>

						{/* Photo */}
						<div className="relative w-full h-full">
							<Image
								src="/assets/images/profile.webp"
								alt="Profile"
								fill
								sizes="(max-width: 768px) 128px, 256px"
								className={`object-cover rounded grayscale group-hover/avatar:grayscale-0 transition-all duration-500 ${
									imageLoaded ? "opacity-100" : "opacity-0"
								}`}
								onLoad={() => setImageLoaded(true)}
								priority
							/>
						</div>

						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
					</div>
				</div>

				{/* Status Text - Centered on Mobile/Tablet, Left on Desktop */}
				<div className="mt-2 text-xs flex items-center justify-center lg:justify-start gap-2 text-zinc-500">
					<div className="relative flex items-center">
						<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
						<span className="absolute w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
					</div>
					<span>Available for opportunities</span>
				</div>
			</div>

			{/* --- CONTENT SECTION --- */}

			{/* Clear float untuk mobile & tablet - paksa konten turun ke bawah gambar */}
			<div className="lg:hidden clear-both"></div>

			{/* 1. Header Name
                overflow-hidden: Tetap dipakai agar border tidak menabrak gambar di mode Desktop.
            */}
			<div className="lg:overflow-hidden relative pb-3 mb-4 border-b border-zinc-800 group/header">
				<div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-zinc-500 to-transparent group-hover/header:w-full transition-all duration-500"></div>
				<h2 className="text-lg font-bold text-zinc-200 mb-1 tracking-tight">
					Felix Gratia Mangatur Manullang
				</h2>
				<div className="flex items-center gap-2 text-xs flex-wrap">
					<span className="text-zinc-200">Backend Developer</span>
					<span className="text-zinc-700">•</span>
					<span className="text-zinc-400">GPA 3.94/4.0</span>
				</div>
			</div>

			{/* 2. Info Grid 
                PERBAIKAN: Menghapus 'overflow-hidden' agar text bisa wrapping (mengalir) 
                ke bawah gambar jika list-nya panjang di layar desktop.
            */}
			<div className="mb-5 text-sm">
				<InfoRow label="Location" value="Tangerang, Banten" icon="📍" />
				<InfoRow
					label="Education"
					value="Polytechnic Multimedia Nusantara (2022 - Present)"
					icon="🎓"
				/>

				{/* Break untuk 950-858px: Previous pindah ke baris baru */}
				<div className="hidden min-[768px]:max-[858px]:block clear-both"></div>

				<InfoRow
					label="Current"
					value="Intern at PT Samanasoft Inovasi Persada"
					icon="💼"
				/>

				{/* Break untuk 857-768px: Current juga ikut pindah */}
				<div className="hidden min-[768px]:max-[857px]:block clear-both"></div>

				<InfoRow
					label="Previous"
					value="Intern at Alfagift (PT Global Loyalty Indonesia)"
					icon="🏢"
				/>
			</div>

			{/* 3. Separator Line */}
			<div className="overflow-hidden pt-4 mb-4 border-t border-zinc-800"></div>

			{/* 4. Bio */}
			<div className="mb-6 group/bio block">
				<p className="text-zinc-400 leading-relaxed text-xs text-justify group-hover/bio:text-zinc-300 transition-colors duration-300">
					High-performing Backend Developer with expertise in architecting
					scalable systems using Python (FastAPI), PostgreSQL, and Docker.
					Experience building multi-tenant SaaS platforms, RAG-based AI
					solutions, and secure SSO authentication services.
				</p>
			</div>

			{/* 5. Key Projects */}
			<div className="pt-4 border-t border-zinc-800 mb-6">
				<h3 className="text-xs text-zinc-200 uppercase tracking-wider mb-3">
					Key Projects
				</h3>
				<div className="grid grid-cols-1 gap-2">
					<ProjectItem
						name="ATABOT"
						desc="Universal Business Intelligence AI with RAG-based system"
					/>
					<ProjectItem
						name="ATLAS"
						desc="SSO Authentication & Authorization Service with RBAC"
					/>
					<ProjectItem
						name="AVENTORY"
						desc="End-to-end Inventory Management System"
					/>
				</div>
			</div>

			{/* 6. Tech Stack */}
			<div className="pt-4 border-t border-zinc-800">
				<h3 className="text-xs text-zinc-200 uppercase tracking-wider mb-3">
					Tech Stack
				</h3>
				<div className="flex flex-wrap gap-2">
					<TechBadge>Python</TechBadge>
					<TechBadge>FastAPI</TechBadge>
					<TechBadge>PostgreSQL</TechBadge>
					<TechBadge>Docker</TechBadge>
					<TechBadge>Go</TechBadge>
					<TechBadge>Redis</TechBadge>
					<TechBadge>MongoDB</TechBadge>
				</div>
			</div>

			{/* Clearfix */}
			<div className="clear-both"></div>
		</div>
	);
};

// --- HELPER COMPONENTS ---

const InfoRow = ({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon?: string;
}) => (
	<div className="mb-2 text-xs group/row flex items-start">
		<span className="text-zinc-600 min-w-[100px] flex-shrink-0 flex items-center gap-2 group-hover/row:text-zinc-400 transition-colors duration-300">
			{icon && <span className="text-[10px] opacity-60">{icon}</span>}
			{label}
		</span>
		<div className="text-zinc-400 group-hover/row:text-zinc-300 transition-colors duration-300 break-words">
			{value}
		</div>
	</div>
);

const ProjectItem = ({ name, desc }: { name: string; desc: string }) => (
	<div className="text-xs group/project cursor-default p-2 -m-2 rounded hover:bg-zinc-900/30 transition-all duration-300">
		<div className="flex items-start gap-2">
			<span className="text-zinc-500 opacity-50 group-hover/project:opacity-100 transition-opacity duration-300">
				▸
			</span>
			<div>
				<span className="text-zinc-300 font-medium group-hover/project:text-zinc-200 transition-colors duration-300">
					{name}
				</span>
				<span className="text-zinc-700 mx-2">—</span>
				<span className="text-zinc-500 group-hover/project:text-zinc-300 transition-colors duration-300">
					{desc}
				</span>
			</div>
		</div>
	</div>
);

const TechBadge = ({ children }: { children: React.ReactNode }) => (
	<span className="relative px-2.5 py-1 text-xs bg-zinc-900 border border-zinc-800 text-zinc-500 rounded hover:border-zinc-700 hover:text-zinc-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(113,113,122,0.1)] cursor-default group/badge">
		<span className="relative z-10">{children}</span>
		<span className="absolute inset-0 bg-zinc-800/0 group-hover/badge:bg-zinc-800/30 rounded transition-colors duration-300"></span>
	</span>
);

export default AboutOutput;
