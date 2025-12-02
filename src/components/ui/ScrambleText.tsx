"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ScrambleTextProps {
	text: string;
	className?: string;
	radius?: number;
	duration?: number;
	scrambleChars?: string;
}

export default function ScrambleText({
	text,
	className = "",
	radius = 100,
	duration = 1.2,
	scrambleChars = ".:",
}: ScrambleTextProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const charsRef = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		charsRef.current = [];

		// Clear container
		container.innerHTML = "";

		// Split text into individual characters wrapped in spans
		text.split("").forEach((char) => {
			const span = document.createElement("span");
			span.className = "char";
			span.textContent = char;
			span.setAttribute("data-original", char);
			span.style.display = "inline-block";
			span.style.whiteSpace = "pre";
			span.style.minWidth = "0.2em";
			span.style.willChange = "transform";
			container.appendChild(span);
			charsRef.current.push(span);
		});

		// Pointer move handler
		const handleMove = (e: PointerEvent) => {
			charsRef.current.forEach((c) => {
				const rect = c.getBoundingClientRect();
				const dx = e.clientX - (rect.left + rect.width / 2);
				const dy = e.clientY - (rect.top + rect.height / 2);
				const dist = Math.hypot(dx, dy);

				if (dist < radius) {
					const dynamicDuration = duration * (1 - dist / radius);

					// Animate with scramble effect
					gsap.to(c, {
						overwrite: true,
						duration: dynamicDuration,
						val: 1,
						onUpdate: function () {
							const randomChar =
								scrambleChars[
									Math.floor(Math.random() * scrambleChars.length)
								];
							const original = c.getAttribute("data-original") || "";
							// Don't scramble spaces
							if (original.trim() !== "") {
								c.textContent = randomChar;
							}
						},
						onComplete: function () {
							c.textContent = c.getAttribute("data-original") || "";
						},
					});
				}
			});
		};

		container.addEventListener("pointermove", handleMove);

		return () => {
			container.removeEventListener("pointermove", handleMove);
		};
	}, [text, radius, duration, scrambleChars]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{ cursor: "default" }}
		/>
	);
}
