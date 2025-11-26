"use client";

import { useState, useEffect } from "react";

interface GlitchTextProps {
	text: string;
	className?: string;
	speed?: number;
}

export default function GlitchText({
	text,
	className = "",
	speed = 1,
}: GlitchTextProps) {
	const [scrambledText, setScrambledText] = useState(text);

	useEffect(() => {
		const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
		let interval: NodeJS.Timeout;

		const scramble = () => {
			if (Math.random() > 0.95) {
				const newText = text
					.split("")
					.map((char) =>
						Math.random() > 0.9
							? glitchChars[Math.floor(Math.random() * glitchChars.length)]
							: char
					)
					.join("");
				setScrambledText(newText);

				setTimeout(() => setScrambledText(text), 50);
			}
		};

		interval = setInterval(scramble, 100);
		return () => clearInterval(interval);
	}, [text]);

	return (
		<div className={`relative inline-block ${className}`}>
			{/* Glow Background */}
			<span className="absolute top-0 left-0 w-full h-full blur-xl text-cyan-500 opacity-50 animate-pulse-glow">
				{text}
			</span>

			{/* Main Text with Text Shadow */}
			<span
				className="relative z-10 animate-text-flicker"
				style={{ textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}
			>
				{scrambledText}
			</span>

			{/* RGB Glitch Layer - Red Channel */}
			<span
				className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-70 animate-glitch-rgb-1 mix-blend-screen"
				aria-hidden="true"
			>
				{text}
			</span>

			{/* RGB Glitch Layer - Cyan Channel */}
			<span
				className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-70 animate-glitch-rgb-2 mix-blend-screen"
				aria-hidden="true"
			>
				{text}
			</span>

			{/* RGB Glitch Layer - Green Channel */}
			<span
				className="absolute top-0 left-0 -z-10 w-full h-full text-green-400 opacity-60 animate-glitch-rgb-3 mix-blend-screen"
				aria-hidden="true"
			>
				{text}
			</span>

			{/* Intense Distortion Layer */}
			<span
				className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-50 animate-glitch-distort"
				aria-hidden="true"
			>
				{text}
			</span>

			{/* Scan Lines Effect */}
			<div className="absolute inset-0 pointer-events-none animate-scan-lines opacity-30">
				<div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent bg-[length:100%_4px]" />
			</div>

			<style jsx>{`
				@keyframes glitch-rgb-1 {
					0% {
						clip-path: inset(40% 0 60% 0);
						transform: translate(-5px, -2px) skewX(2deg);
					}
					10% {
						clip-path: inset(80% 0 15% 0);
						transform: translate(5px, 2px) skewX(-2deg);
					}
					20% {
						clip-path: inset(20% 0 70% 0);
						transform: translate(-4px, -3px) skewX(3deg);
					}
					30% {
						clip-path: inset(10% 0 85% 0);
						transform: translate(4px, 1px) skewX(-1deg);
					}
					40% {
						clip-path: inset(60% 0 30% 0);
						transform: translate(-3px, 2px) skewX(2deg);
					}
					50% {
						clip-path: inset(30% 0 60% 0);
						transform: translate(5px, -2px) skewX(-3deg);
					}
					60% {
						clip-path: inset(70% 0 20% 0);
						transform: translate(-5px, 1px) skewX(1deg);
					}
					70% {
						clip-path: inset(5% 0 90% 0);
						transform: translate(4px, -1px) skewX(-2deg);
					}
					80% {
						clip-path: inset(50% 0 45% 0);
						transform: translate(-4px, 3px) skewX(2deg);
					}
					90% {
						clip-path: inset(25% 0 70% 0);
						transform: translate(3px, -2px) skewX(-1deg);
					}
					100% {
						clip-path: inset(90% 0 5% 0);
						transform: translate(-2px, 2px) skewX(1deg);
					}
				}

				@keyframes glitch-rgb-2 {
					0% {
						clip-path: inset(15% 0 80% 0);
						transform: translate(4px, 3px) skewY(2deg) scale(1.02);
					}
					10% {
						clip-path: inset(75% 0 20% 0);
						transform: translate(-5px, -2px) skewY(-2deg) scale(0.98);
					}
					20% {
						clip-path: inset(35% 0 60% 0);
						transform: translate(5px, -3px) skewY(1deg) scale(1.01);
					}
					30% {
						clip-path: inset(5% 0 90% 0);
						transform: translate(-4px, 2px) skewY(-3deg) scale(0.99);
					}
					40% {
						clip-path: inset(55% 0 40% 0);
						transform: translate(3px, -1px) skewY(2deg) scale(1.02);
					}
					50% {
						clip-path: inset(85% 0 10% 0);
						transform: translate(-5px, 3px) skewY(-1deg) scale(0.98);
					}
					60% {
						clip-path: inset(25% 0 70% 0);
						transform: translate(4px, -2px) skewY(3deg) scale(1.01);
					}
					70% {
						clip-path: inset(65% 0 30% 0);
						transform: translate(-3px, 1px) skewY(-2deg) scale(0.99);
					}
					80% {
						clip-path: inset(45% 0 50% 0);
						transform: translate(5px, 2px) skewY(1deg) scale(1.02);
					}
					90% {
						clip-path: inset(10% 0 85% 0);
						transform: translate(-4px, -3px) skewY(-3deg) scale(0.98);
					}
					100% {
						clip-path: inset(95% 0 0% 0);
						transform: translate(2px, 2px) skewY(2deg) scale(1.01);
					}
				}

				@keyframes glitch-rgb-3 {
					0% {
						clip-path: inset(50% 0 45% 0);
						transform: translate(-3px, 2px) skewX(-3deg);
					}
					15% {
						clip-path: inset(20% 0 75% 0);
						transform: translate(4px, -2px) skewX(2deg);
					}
					30% {
						clip-path: inset(80% 0 15% 0);
						transform: translate(-4px, 3px) skewX(-1deg);
					}
					45% {
						clip-path: inset(10% 0 85% 0);
						transform: translate(5px, -1px) skewX(3deg);
					}
					60% {
						clip-path: inset(65% 0 30% 0);
						transform: translate(-5px, 2px) skewX(-2deg);
					}
					75% {
						clip-path: inset(35% 0 60% 0);
						transform: translate(3px, -3px) skewX(1deg);
					}
					90% {
						clip-path: inset(5% 0 90% 0);
						transform: translate(-2px, 1px) skewX(-3deg);
					}
					100% {
						clip-path: inset(75% 0 20% 0);
						transform: translate(4px, 2px) skewX(2deg);
					}
				}

				@keyframes glitch-distort {
					0% {
						clip-path: inset(30% 0 60% 0);
						transform: translate(-8px, -4px) skewX(10deg) scale(1.05);
						opacity: 0;
					}
					5% {
						opacity: 0.8;
					}
					10% {
						clip-path: inset(70% 0 20% 0);
						transform: translate(8px, 4px) skewX(-10deg) scale(0.95);
					}
					15% {
						opacity: 0;
					}
					25% {
						clip-path: inset(10% 0 80% 0);
						transform: translate(-6px, 5px) skewY(8deg) scale(1.03);
						opacity: 0;
					}
					30% {
						opacity: 0.7;
					}
					35% {
						clip-path: inset(60% 0 30% 0);
						transform: translate(7px, -5px) skewY(-8deg) scale(0.97);
					}
					40% {
						opacity: 0;
					}
					100% {
						clip-path: inset(45% 0 45% 0);
						transform: translate(0, 0) skewX(0deg) scale(1);
						opacity: 0;
					}
				}

				@keyframes scan-lines {
					0% {
						transform: translateY(-100%);
					}
					100% {
						transform: translateY(100%);
					}
				}

				@keyframes pulse-glow {
					0%,
					100% {
						opacity: 0.3;
						filter: blur(20px);
					}
					50% {
						opacity: 0.6;
						filter: blur(30px);
					}
				}

				@keyframes text-flicker {
					0% {
						opacity: 1;
					}
					93% {
						opacity: 1;
					}
					94% {
						opacity: 0.7;
					}
					95% {
						opacity: 1;
					}
					97% {
						opacity: 0.8;
					}
					98% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				.animate-glitch-rgb-1 {
					animation: glitch-rgb-1 ${0.8 / speed}s infinite steps(1);
				}
				.animate-glitch-rgb-2 {
					animation: glitch-rgb-2 ${1 / speed}s infinite steps(1);
				}
				.animate-glitch-rgb-3 {
					animation: glitch-rgb-3 ${0.9 / speed}s infinite steps(1);
				}
				.animate-glitch-distort {
					animation: glitch-distort ${2 / speed}s infinite;
				}
				.animate-scan-lines {
					animation: scan-lines ${3 / speed}s linear infinite;
				}
				.animate-pulse-glow {
					animation: pulse-glow ${2 / speed}s ease-in-out infinite;
				}
				.animate-text-flicker {
					animation: text-flicker ${3 / speed}s linear infinite;
				}
			`}</style>
		</div>
	);
}
