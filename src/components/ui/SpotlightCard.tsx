"use client";

import { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	spotlightColor?: string;
}

export default function SpotlightCard({
	children,
	className = "",
	spotlightColor = "rgba(168, 85, 247, 0.25)", // Default Purple
	...props
}: SpotlightCardProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!divRef.current) return;

		const rect = divRef.current.getBoundingClientRect();
		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleMouseEnter = () => {
		setOpacity(1);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f11] text-gray-200 shadow-2xl ${className}`}
			{...props}
		>
			{/* Spotlight Effect Layer */}
			<div
				className="pointer-events-none absolute -inset-px transition-opacity duration-300"
				style={{
					opacity,
					background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
				}}
			/>

			{/* Content Layer */}
			<div className="relative h-full">{children}</div>
		</div>
	);
}
