"use client";

import React, { useRef, useEffect, useState } from "react";

interface ShuffleProps {
	text: string;
	className?: string;
	style?: React.CSSProperties;
	shuffleDirection?: "left" | "right";
	duration?: number;
	tag?: keyof React.JSX.IntrinsicElements;
	textAlign?: "left" | "center" | "right";
	onShuffleComplete?: () => void;
	shuffleTimes?: number;
	stagger?: number;
	scrambleCharset?: string;
	triggerOnHover?: boolean;
	threshold?: number;
	animationMode?: string;
	ease?: string;
	triggerOnce?: boolean;
	respectReducedMotion?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const Shuffle: React.FC<ShuffleProps> = ({
	text,
	className = "",
	style = {},
	duration = 0.5,
	tag = "div",
	textAlign = "left",
	onShuffleComplete,
	shuffleTimes = 1,
	stagger = 0.03,
	scrambleCharset = CHARS,
	triggerOnHover = true,
	shuffleDirection = "right",
}) => {
	const containerRef = useRef<HTMLElement>(null);
	const [isReady, setIsReady] = useState(false);
	const animatingRef = useRef(false);

	const createShuffleEffect = () => {
		if (!containerRef.current || animatingRef.current) return;

		animatingRef.current = true;
		const container = containerRef.current;

		// Clear container
		container.innerHTML = "";
		container.style.visibility = "visible";

		const chars = text.split("");

		chars.forEach((char, index) => {
			if (char === " ") {
				const space = document.createElement("span");
				space.style.display = "inline-block";
				space.style.width = "0.25em";
				container.appendChild(space);
				return;
			}

			// Create wrapper for overflow hidden
			const wrapper = document.createElement("span");
			wrapper.style.display = "inline-block";
			wrapper.style.overflow = "hidden";
			wrapper.style.verticalAlign = "top";
			wrapper.style.position = "relative";

			// Create inner container for sliding
			const inner = document.createElement("span");
			inner.style.display = "inline-flex";
			inner.style.flexDirection =
				shuffleDirection === "right" ? "column" : "column-reverse";
			inner.style.position = "relative";
			inner.style.willChange = "transform";

			// Add scrambled characters
			const scrambleCount = shuffleTimes;
			const allChars: string[] = [];

			if (shuffleDirection === "right") {
				// For right direction: scrambles first, then original
				for (let i = 0; i < scrambleCount; i++) {
					allChars.push(
						scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)]
					);
				}
				allChars.push(char);
			} else {
				// For left direction: original first, then scrambles
				allChars.push(char);
				for (let i = 0; i < scrambleCount; i++) {
					allChars.push(
						scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)]
					);
				}
			}

			allChars.forEach((c) => {
				const charSpan = document.createElement("span");
				charSpan.textContent = c;
				charSpan.style.display = "block";
				charSpan.style.lineHeight = "1";
				inner.appendChild(charSpan);
			});

			wrapper.appendChild(inner);
			container.appendChild(wrapper);

			// Get height for animation
			const firstChar = inner.firstElementChild as HTMLElement;
			const charHeight = firstChar?.offsetHeight || 20;

			// Set initial position
			const totalChars = allChars.length;
			const initialOffset =
				shuffleDirection === "right" ? 0 : -(totalChars - 1) * charHeight;
			inner.style.transform = `translateY(${initialOffset}px)`;

			// Animate
			const delay = index * stagger * 1000;
			const finalOffset =
				shuffleDirection === "right" ? -(totalChars - 1) * charHeight : 0;

			setTimeout(() => {
				inner.style.transition = `transform ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;
				inner.style.transform = `translateY(${finalOffset}px)`;
			}, delay);
		});

		// Mark animation complete
		const totalDuration = (chars.length * stagger + duration) * 1000;
		setTimeout(() => {
			animatingRef.current = false;
			onShuffleComplete?.();
		}, totalDuration);
	};

	useEffect(() => {
		if (!isReady) {
			// Initial render
			const timer = setTimeout(() => {
				setIsReady(true);
				createShuffleEffect();
			}, 100);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isReady]);

	const handleMouseEnter = () => {
		if (triggerOnHover && isReady) {
			createShuffleEffect();
		}
	};

	const commonStyle: React.CSSProperties = {
		textAlign,
		display: "inline-block",
		visibility: isReady ? "visible" : "hidden",
		lineHeight: 1,
		...style,
	};

	const Tag = tag as keyof React.JSX.IntrinsicElements;

	return React.createElement(Tag, {
		ref: containerRef,
		className: className,
		style: commonStyle,
		onMouseEnter: handleMouseEnter,
	});
};

export default Shuffle;
