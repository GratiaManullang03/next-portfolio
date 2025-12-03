"use client";

import Image from "next/image";
import { useState } from "react";

const AboutOutput = () => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className="my-6 font-mono text-sm">
			<div className="flex gap-8 items-start">
				{/* Left Column: Profile Photo */}
				<div className="flex-shrink-0 group/section">
					<div className="relative">
						{/* Subtle corner accents */}
						<div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-zinc-700 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"></div>

						<div className="relative w-52 h-52 rounded overflow-hidden border border-zinc-800 group/avatar bg-zinc-900 p-2">
							{/* Scanline effect on hover */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full translate-y-[-100%] group-hover/avatar:translate-y-[100%] transition-transform duration-1000 ease-linear pointer-events-none z-10"></div>

							{/* Photo - centered with equal margins */}
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

							{/* Subtle overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
						</div>
					</div>

					{/* Available text below photo */}
					<div className="mt-2 text-xs flex items-center gap-2 text-zinc-500">
						<div className="relative flex items-center">
							<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
							<span className="absolute w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
						</div>
						<span>Available for opportunities</span>
					</div>
				</div>

				{/* Right Column: Info - Only Header */}
				<div className="flex-1">
					{/* Header */}
					<div className="relative border-b border-zinc-800 pb-3 group/header">
						<div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-zinc-500 to-transparent group-hover/header:w-full transition-all duration-500"></div>
						<h2 className="text-lg font-bold text-zinc-200 mb-1 tracking-tight">
							Felix Gratia Mangatur Manullang
						</h2>
						<div className="flex items-center gap-2 text-xs">
							<span className="text-zinc-200">Backend Developer</span>
							<span className="text-zinc-700">•</span>
							<span className="text-zinc-400">GPA 3.94/4.0</span>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section: 2 Columns aligned with photo */}
			<div className="flex gap-8 mt-5">
				{/* Left Column: Aligned with photo (same width) */}
				<div className="w-32 flex-shrink-0">
					{/* Empty space to align with photo */}
				</div>

				{/* Right Column: Full content */}
				<div className="flex-1 space-y-5">
					{/* Info Grid */}
					<div className="space-y-2.5">
						<InfoRow label="Location" value="Tangerang, Banten" icon="📍" />
						<InfoRow
							label="Education"
							value="Polytechnic Multimedia Nusantara (2022 - Present)"
							icon="🎓"
						/>
						<InfoRow
							label="Current"
							value="Intern at PT Samanasoft Inovasi Persada"
							icon="💼"
						/>
						<InfoRow
							label="Previous"
							value="Intern at Alfagift (PT Global Loyalty Indonesia)"
							icon="🏢"
						/>
					</div>

					{/* Bio */}
					<div className="pt-4 border-t border-zinc-800 group/bio">
						<p className="text-zinc-400 leading-relaxed text-xs group-hover/bio:text-zinc-300 transition-colors duration-300">
							High-performing Backend Developer with expertise in architecting
							scalable systems using Python (FastAPI), PostgreSQL, and Docker.
							Experience building multi-tenant SaaS platforms, RAG-based AI
							solutions, and secure SSO authentication services.
						</p>
					</div>

					{/* Key Projects */}
					<div className="pt-4 border-t border-zinc-800">
						<h3 className="text-xs text-zinc-200 uppercase tracking-wider mb-3">
							Key Projects
						</h3>
						<div className="space-y-2.5">
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

					{/* Tech Stack */}
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
				</div>
			</div>
		</div>
	);
};

// Helper Components
const InfoRow = ({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon?: string;
}) => (
	<div className="flex items-start gap-3 text-xs group/row">
		<span className="text-zinc-600 min-w-[80px] flex items-center gap-2 group-hover/row:text-zinc-400 transition-colors duration-300">
			{icon && <span className="text-[10px] opacity-60">{icon}</span>}
			{label}
		</span>
		<span className="text-zinc-400 group-hover/row:text-zinc-300 transition-colors duration-300">
			{value}
		</span>
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
