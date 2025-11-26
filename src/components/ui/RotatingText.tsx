"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
	texts: string[];
	className?: string;
	rotationInterval?: number;
	staggerDuration?: number;
	staggerFrom?: "first" | "last" | "center" | "random";
	transition?: any;
	loop?: boolean;
	auto?: boolean;
}

export default function RotatingText({
	texts,
	className = "",
	rotationInterval = 2000,
	staggerDuration = 0.025,
	staggerFrom = "last",
	transition = { type: "spring", damping: 30, stiffness: 400 },
	loop = true,
	auto = true,
}: RotatingTextProps) {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentText = texts[currentTextIndex];
	const words = currentText.split(" ");

	const getStaggerDelay = useCallback(
		(index: number, total: number) => {
			if (staggerFrom === "first") return index * staggerDuration;
			if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
			if (staggerFrom === "center") {
				const center = Math.floor(total / 2);
				return Math.abs(center - index) * staggerDuration;
			}
			if (staggerFrom === "random") {
				const randomIndex = Math.floor(Math.random() * total);
				return Math.abs(randomIndex - index) * staggerDuration;
			}
			return 0;
		},
		[staggerFrom, staggerDuration]
	);

	const next = useCallback(() => {
		const nextIndex =
			currentTextIndex === texts.length - 1
				? loop
					? 0
					: currentTextIndex
				: currentTextIndex + 1;
		if (nextIndex !== currentTextIndex) {
			setCurrentTextIndex(nextIndex);
		}
	}, [currentTextIndex, texts.length, loop]);

	useEffect(() => {
		if (!auto) return;
		const intervalId = setInterval(next, rotationInterval);
		return () => clearInterval(intervalId);
	}, [next, rotationInterval, auto]);

	if (!mounted) {
		return <span className={className}>{texts[0]}</span>;
	}

	return (
		<span className={`inline-flex flex-wrap ${className}`}>
			<AnimatePresence mode="wait">
				<motion.span
					key={currentTextIndex}
					className="inline-flex flex-wrap"
					aria-hidden="true"
				>
					{words.map((word, wordIndex) => {
						const characters = Array.from(word);
						const totalChars = currentText.replace(/\s/g, "").length;
						const previousCharsCount = words
							.slice(0, wordIndex)
							.reduce((sum, w) => sum + w.length, 0);

						return (
							<span key={wordIndex} className="inline-flex">
								{characters.map((char, charIndex) => (
									<span
										key={charIndex}
										className="inline-block overflow-hidden"
										style={{ paddingBottom: "0.1em" }}
									>
										<motion.span
											initial={{ y: "100%" }}
											animate={{ y: 0 }}
											exit={{ y: "-120%" }}
											transition={{
												...transition,
												delay: getStaggerDelay(
													previousCharsCount + charIndex,
													totalChars
												),
											}}
											className="inline-block"
										>
											{char}
										</motion.span>
									</span>
								))}
								{wordIndex < words.length - 1 && (
									<span className="inline-block">&nbsp;</span>
								)}
							</span>
						);
					})}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
