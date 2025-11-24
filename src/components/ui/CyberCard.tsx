"use client";

import React from "react";

interface CyberCardProps {
	children: React.ReactNode;
	className?: string;
}

export default function CyberCard({
	children,
	className = "",
}: CyberCardProps) {
	return (
		<div className={`relative group ${className}`}>
			{/* Animated Border Layer */}
			<div className="absolute -inset-[1px] bg-gradient-to-r from-[#a855f7] via-[#06b6d4] to-[#a855f7] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-border-flow" />

			{/* Main Background */}
			<div className="relative h-full bg-[#0f0f11] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:bg-[#131315]">
				{/* Tech Grid Pattern Overlay (Muncul saat hover) */}
				<div
					className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"
					style={{
						backgroundImage:
							"linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}
				/>

				{children}
			</div>
		</div>
	);
}
