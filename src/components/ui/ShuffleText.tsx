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

	// Generate scrambled characters once per transition
	const scrambledFrames = useMemo(() => {
		const frames: string[][] = [];
		for (let i = 0; i < shuffleTimes; i++) {
			const frame: string[] = [];
			for (let j = 0; j < maxLen; j++) {
				frame.push(scrambleChars[Math.floor(Math.random() * scrambleChars.length)]);
			}
			frames.push(frame);
		}
		return frames;
	}, [currentIndex, maxLen, scrambleChars, shuffleTimes]);

	const getDelay = (index: number) => {
		// EVEN positions slide first, ODD positions slide second
		const isEven = index % 2 === 0;
		if (isEven) {
			return Math.floor(index / 2) * stagger;
		} else {
			return duration + (Math.floor(index / 2) * stagger);
		}
	};

	return (
		<div className="relative inline-block">
			<div className={`${className} inline-flex`}>
				{Array.from({ length: maxLen }).map((_, index) => {
					const targetChar = currentText[index] || "";
					const oldChar = prevText[index] || "";

					// Handle spaces
					if (targetChar === " ") {
						return (
							<span
								key={`pos-${index}`}
								className="inline-block"
								style={{ width: "0.3em" }}
							>
								{" "}
							</span>
						);
					}

					// Handle empty (text shortening)
					if (targetChar === "" && oldChar !== "") {
						return null;
					}

					// Build the film strip: [targetChar, ...scrambled chars (reversed), oldChar]
					const filmStrip = [targetChar, ...scrambledFrames.map(frame => frame[index]).reverse(), oldChar];
					const stripWidth = filmStrip.length;

					return (
						<span
							key={`pos-${index}`}
							className="inline-block overflow-hidden"
							style={{
								width: "1ch",
								height: "1em",
							}}
						>
							{/* Film strip container that slides horizontally */}
							<motion.span
								key={`${currentIndex}-${index}`}
								className="inline-flex"
								initial={{ x: -(stripWidth - 1) + "ch" }}
								animate={{ x: 0 }}
								transition={{
									delay: getDelay(index),
									duration: 0.5,
									ease: "easeInOut",
								}}
							>
								{filmStrip.map((char, i) => (
									<span
										key={i}
										className="inline-block text-center"
										style={{ width: "1ch" }}
									>
										{char}
									</span>
								))}
							</motion.span>
						</span>
					);
				})}
			</div>
			<p className="text-[10px] text-emerald-400/80 font-mono tracking-[0.3em] uppercase mt-1">
				{isShuffling ? "DECRYPTING_SECURE_DATA..." : "ACCESS_GRANTED"}
			</p>
		</div>
	);
}
