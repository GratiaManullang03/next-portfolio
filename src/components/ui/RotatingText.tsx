"use client";

import { useCallback, useEffect, useState, useRef } from "react";

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
	loop = true,
	auto = true,
}: RotatingTextProps) {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [animationState, setAnimationState] = useState<'initial' | 'enter' | 'exit'>('initial');
	const containerRef = useRef<HTMLSpanElement>(null);

	const currentText = texts[currentTextIndex];
	const characters = Array.from(currentText);

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

	// Trigger enter animation on mount and when text changes
	useEffect(() => {
		// Start with enter animation
		const enterTimeout = setTimeout(() => {
			setAnimationState('enter');
		}, 50);

		if (!auto) return () => clearTimeout(enterTimeout);

		// Calculate max delay for stagger effect
		const maxStaggerDelay = (characters.length - 1) * staggerDuration * 1000;

		// Schedule exit animation after rotationInterval
		const exitTimeout = setTimeout(() => {
			setAnimationState('exit');
		}, rotationInterval);

		// Schedule initial state reset (before text change)
		const resetTimeout = setTimeout(() => {
			setAnimationState('initial');
		}, rotationInterval + 500 + maxStaggerDelay);

		// Schedule text change (after reset to initial)
		const changeTextTimeout = setTimeout(() => {
			const nextIndex = currentTextIndex === texts.length - 1
				? (loop ? 0 : currentTextIndex)
				: currentTextIndex + 1;

			if (nextIndex !== currentTextIndex) {
				setCurrentTextIndex(nextIndex);
			}
		}, rotationInterval + 500 + maxStaggerDelay + 100);

		return () => {
			clearTimeout(enterTimeout);
			clearTimeout(exitTimeout);
			clearTimeout(resetTimeout);
			clearTimeout(changeTextTimeout);
		};
	}, [currentTextIndex, texts.length, loop, auto, rotationInterval, characters.length, staggerDuration]);

	return (
		<span ref={containerRef} className={`inline-flex ${className}`}>
			{characters.map((char, charIndex) => {
				const enterDelay = getStaggerDelay(charIndex, characters.length);
				// For exit, reverse the stagger (first char exits first)
				const exitDelay = getStaggerDelay(characters.length - 1 - charIndex, characters.length);

				// Determine transform and transition based on animation state
				let transform = "translateY(100%)"; // initial: from bottom
				let transitionDelay = enterDelay;

				if (animationState === 'enter') {
					transform = "translateY(0)"; // enter: center
					transitionDelay = enterDelay;
				} else if (animationState === 'exit') {
					transform = "translateY(-120%)"; // exit: to top
					transitionDelay = exitDelay;
				} else if (animationState === 'initial') {
					// No delay for initial state to snap back immediately
					transitionDelay = 0;
				}

				return (
					<span
						key={`${currentTextIndex}-${charIndex}`}
						className="inline-block overflow-hidden"
						style={{ lineHeight: 1 }}
					>
						<span
							className="inline-block"
							style={{
								transform,
								opacity: animationState === 'enter' ? 1 : 0,
								transition: animationState === 'initial'
									? 'none'
									: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${transitionDelay}s, opacity 0.4s ease ${transitionDelay}s`,
							}}
						>
							{char === " " ? "\u00A0" : char}
						</span>
					</span>
				);
			})}
		</span>
	);
}
