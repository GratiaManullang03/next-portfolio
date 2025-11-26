"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface ShuffleTextProps {
	texts: string[];
	className?: string;
	interval?: number;
	duration?: number;
	scrambleChars?: string;
	shuffleTimes?: number;
	stagger?: number;
}

export default function ShuffleText({
	texts,
	className = "",
	interval = 3000,
	duration = 0.65,
	scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
	shuffleTimes = 6,
	stagger = 0.04,
}: ShuffleTextProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isShuffling, setIsShuffling] = useState(false);
	const prevTextRef = useRef(texts[0]);

	const currentText = texts[currentIndex];
	const prevText = prevTextRef.current;

	useEffect(() => {
		const cycleInterval = setInterval(() => {
			setIsShuffling(true);
			prevTextRef.current = texts[currentIndex]; // Store current before transition
			setCurrentIndex((prev) => (prev + 1) % texts.length);
		}, interval);

		return () => clearInterval(cycleInterval);
	}, [texts.length, interval, currentIndex]);

	useEffect(() => {
		if (currentIndex === 0 && !isShuffling) return; // Skip initial mount

		setIsShuffling(true);
		const timeout = setTimeout(() => {
			setIsShuffling(false);
		}, duration * 1000 * 2 + 800); // 2x duration for 2 stages

		return () => clearTimeout(timeout);
	}, [currentIndex, duration]);

	const maxLen = Math.max(currentText.length, prevText.length);

	const getDelay = (index: number) => {
		// Stage 1: Odd positions animate first
		// Stage 2: Even positions animate second (with delay = duration)
		const isOdd = index % 2 === 1;
		if (isOdd) {
			// Odd: start immediately with internal stagger
			return (Math.floor(index / 2) * stagger);
		} else {
			// Even: wait for duration (stage 1 complete), then start with stagger
			return duration + (Math.floor(index / 2) * stagger);
		}
	};

	const getIntermediateChars = (oldChar: string, targetChar: string, rolls: number) => {
		const intermediates: string[] = [];
		const halfRolls = Math.floor(rolls / 2);

		for (let i = 0; i < rolls; i++) {
			if (i < halfRolls) {
				// First half: bias towards old character
				intermediates.push(
					Math.random() > 0.5
						? oldChar || scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
						: scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
				);
			} else {
				// Second half: bias towards target character
				intermediates.push(
					Math.random() > 0.3
						? targetChar || scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
						: scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
				);
			}
		}

		return intermediates;
	};

	return (
		<div className="relative inline-block">
			<div className={`${className} inline-flex`}>
				{Array.from({ length: maxLen }).map((_, index) => {
					const targetChar = currentText[index] || "";
					const oldChar = prevText[index] || "";

					// Handle spaces and empty characters
					if (targetChar === " " || (targetChar === "" && oldChar === "")) {
						return (
							<span
								key={`${currentIndex}-${index}`}
								className="inline-block"
								style={{ width: "0.3em" }}
							>
								{targetChar || "\u00A0"}
							</span>
						);
					}

					const rolls = Math.max(1, Math.floor(shuffleTimes));
					const intermediateChars = getIntermediateChars(oldChar, targetChar, rolls);

					return (
						<span
							key={`${currentIndex}-${index}`}
							className="inline-block overflow-hidden align-baseline"
							style={{
								width: "1ch",
							}}
						>
							<motion.span
								className="inline-flex"
								initial={{ x: `${-100 * (rolls + 1)}%` }}
								animate={{ x: 0 }}
								transition={{
									duration: duration,
									delay: getDelay(index),
									ease: [0.23, 1, 0.32, 1],
								}}
								style={{
									whiteSpace: "nowrap",
								}}
							>
								{intermediateChars.map((char, i) => (
									<span
										key={i}
										className="inline-block"
										style={{
											width: "1ch",
											textAlign: "center",
										}}
									>
										{char}
									</span>
								))}
								<span
									className="inline-block"
									style={{
										width: "1ch",
										textAlign: "center",
									}}
								>
									{targetChar || "\u00A0"}
								</span>
							</motion.span>
						</span>
					);
				})}
				<span className="animate-pulse text-emerald-500">_</span>
			</div>
			<p className="text-[10px] text-emerald-400/80 font-mono tracking-[0.3em] uppercase mt-1">
				{isShuffling ? "DECRYPTING_SECURE_DATA..." : "ACCESS_GRANTED"}
			</p>
		</div>
	);
}
