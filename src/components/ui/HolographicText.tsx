"use client";

import { useState, useEffect } from "react";

interface HolographicTextProps {
	text: string;
	className?: string;
	speed?: number;
}

export default function HolographicText({
	text,
	className = "",
	speed = 1,
}: HolographicTextProps) {
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPhase((prev) => (prev + 0.05) % (Math.PI * 2));
		}, 50 / speed);

		return () => clearInterval(interval);
	}, [speed]);

	return (
		<div className={`relative inline-block ${className}`}>
			{/* Background Glow Layers */}
			<span
				className="absolute top-0 left-0 w-full h-full text-cyan-400 blur-2xl opacity-40"
				style={{
					transform: `translateY(${Math.sin(phase) * 2}px)`,
					filter: `blur(${20 + Math.sin(phase * 2) * 5}px)`,
				}}
			>
				{text}
			</span>

			<span
				className="absolute top-0 left-0 w-full h-full text-blue-500 blur-xl opacity-30"
				style={{
					transform: `translateY(${Math.sin(phase + Math.PI / 2) * 2}px)`,
					filter: `blur(${15 + Math.cos(phase * 2) * 5}px)`,
				}}
			>
				{text}
			</span>

			{/* Chromatic Aberration Layers */}
			<span
				className="absolute top-0 left-0 text-red-500 opacity-50 mix-blend-screen"
				style={{
					transform: `translate(${Math.sin(phase) * 2}px, ${Math.cos(phase) * 1}px)`,
				}}
			>
				{text}
			</span>

			<span
				className="absolute top-0 left-0 text-cyan-400 opacity-50 mix-blend-screen"
				style={{
					transform: `translate(${-Math.sin(phase) * 2}px, ${-Math.cos(phase) * 1}px)`,
				}}
			>
				{text}
			</span>

			<span
				className="absolute top-0 left-0 text-green-400 opacity-40 mix-blend-screen"
				style={{
					transform: `translate(${Math.cos(phase + Math.PI / 4) * 1.5}px, ${Math.sin(phase + Math.PI / 4) * 1.5}px)`,
				}}
			>
				{text}
			</span>

			{/* Main Text */}
			<span
				className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold"
				style={{
					textShadow: `
						0 0 20px rgba(6, 182, 212, 0.8),
						0 0 40px rgba(6, 182, 212, 0.4),
						0 0 60px rgba(6, 182, 212, 0.2)
					`,
					filter: `brightness(${1 + Math.sin(phase * 3) * 0.1})`,
				}}
			>
				{text}
			</span>

			{/* Scanline Effect */}
			<div
				className="absolute inset-0 pointer-events-none overflow-hidden opacity-20"
				style={{
					background: `linear-gradient(
						to bottom,
						transparent 0%,
						rgba(6, 182, 212, 0.3) 50%,
						transparent 100%
					)`,
					backgroundSize: "100% 4px",
					transform: `translateY(${((phase * 100) / (Math.PI * 2)) % 100}%)`,
				}}
			/>

			{/* Interference Pattern */}
			<div
				className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
				style={{
					background: `repeating-linear-gradient(
						0deg,
						transparent,
						transparent 2px,
						rgba(6, 182, 212, 0.5) 2px,
						rgba(6, 182, 212, 0.5) 4px
					)`,
					transform: `translateX(${Math.sin(phase * 2) * 2}px)`,
				}}
			/>

			{/* Flickering Edge */}
			<span
				className="absolute top-0 left-0 w-full h-full text-white opacity-0"
				style={{
					opacity: Math.random() > 0.95 ? 0.3 : 0,
					filter: "blur(1px)",
				}}
			>
				{text}
			</span>

			<style jsx>{`
				@keyframes hologram-flicker {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.95;
					}
					75% {
						opacity: 0.98;
					}
				}
			`}</style>
		</div>
	);
}
