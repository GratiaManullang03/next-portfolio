"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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
			prevTextRef.current = texts[currentIndex];
			setCurrentIndex((prev) => (prev + 1) % texts.length);
		}, interval);

		return () => clearInterval(cycleInterval);
	}, [texts.length, interval, currentIndex]);

	useEffect(() => {
		if (currentIndex === 0 && !isShuffling) return;

		setIsShuffling(true);
		const timeout = setTimeout(() => {
			setIsShuffling(false);
		}, duration * 1000 * 2 + 800);

		return () => clearTimeout(timeout);
	}, [currentIndex, duration]);

	const maxLen = Math.max(currentText.length, prevText.length);

	// Generate film strip: pure old chars → pure target chars (NO RANDOM!)
	const characterData = useMemo(() => {
		const rolls = Math.max(1, Math.floor(shuffleTimes));
		const halfRolls = Math.floor(rolls / 2);

		return Array.from({ length: maxLen }).map((_, index) => {
			const targetChar = currentText[index] || "";
			const oldChar = prevText[index] || "";

			// Film strip: first half = old char, second half = target char
			const intermediates: string[] = [];
			for (let i = 0; i < rolls; i++) {
				if (i < halfRolls) {
					intermediates.push(oldChar || " ");
				} else {
					intermediates.push(targetChar || " ");
				}
			}

			return {
				targetChar,
				oldChar,
				intermediates,
			};
		});
	}, [currentIndex, currentText, prevText, maxLen, shuffleTimes]);

	const getDelay = (index: number) => {
		// CRITICAL FIX: EVEN positions animate FIRST, ODD positions SECOND
		const isEven = index % 2 === 0;
		if (isEven) {
			// Even: start immediately with stagger
			return Math.floor(index / 2) * stagger;
		} else {
			// Odd: wait for duration (stage 1 complete), then start
			return duration + (Math.floor(index / 2) * stagger);
		}
	};

	return (
		<div className="relative inline-block">
			<div className={`${className} inline-flex`}>
				{characterData.map(({ targetChar, intermediates }, index) => {
					// Handle empty characters
					if (targetChar === "" && intermediates[0] === " ") {
						return null;
					}

					// Handle spaces
					if (targetChar === " ") {
						return (
							<span
								key={`${currentIndex}-${index}`}
								className="inline-block"
								style={{ width: "0.3em" }}
							>
								{" "}
							</span>
						);
					}

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
								initial={{ x: `${-100 * (intermediates.length + 1)}%` }}
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
								{intermediates.map((char, i) => (
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
									{targetChar}
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
