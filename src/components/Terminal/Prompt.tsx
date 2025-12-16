"use client";

import React, { useState, useEffect, useRef } from "react";
import { findMatchingCommands } from "@/constants/commands";

interface PromptProps {
	onCommand?: (command: string) => void;
}

export default function Prompt({ onCommand }: PromptProps) {
	const [time, setTime] = useState("");
	const [mounted, setMounted] = useState(false);
	const [input, setInput] = useState("");
	const [suggestion, setSuggestion] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setMounted(true);
		setIsMobile(window.innerWidth < 1024);

		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString("en-US", {
				hour12: true,
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			setTime(`${timeString} UTC+7`);
		};

		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		window.addEventListener("resize", handleResize);

		// Focus input on mount after a small delay to avoid autofocus warning
		const focusTimeout = setTimeout(() => {
			inputRef.current?.focus();
		}, 100);

		return () => {
			clearInterval(interval);
			clearTimeout(focusTimeout);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Re-focus when clicking anywhere on the page
	useEffect(() => {
		const handleGlobalClick = (e: MouseEvent) => {
			// Don't focus if clicking on links or buttons
			const target = e.target as HTMLElement;
			if (
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.closest('a') ||
				target.closest('button')
			) {
				return;
			}

			// Focus and smooth scroll to input
			if (inputRef.current) {
				// Focus first
				inputRef.current.focus({ preventScroll: true });

				// Then smooth scroll to input using scrollIntoView
				setTimeout(() => {
					inputRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'end',
						inline: 'nearest'
					});
				}, 10);
			}
		};

		window.addEventListener("click", handleGlobalClick, true); // Use capture phase
		return () => window.removeEventListener("click", handleGlobalClick, true);
	}, []);

	useEffect(() => {
		if (input) {
			const matches = findMatchingCommands(input);
			if (matches.length > 0 && matches[0].name !== input.toLowerCase()) {
				setSuggestion(matches[0].name);
			} else {
				setSuggestion("");
			}
		} else {
			setSuggestion("");
		}
	}, [input]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && input.trim()) {
			onCommand?.(input.trim());
			setInput("");
			setSuggestion("");
		} else if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
			e.preventDefault();
			setInput(suggestion);
			setSuggestion("");
		}
	};

	const focusInput = () => {
		inputRef.current?.focus();
	};

	return (
		<div>
			{/* Row 1 - Desktop (>=1024px): Full size with Path and Time */}
			<div className="hidden lg:flex items-center w-full h-[34px] relative">
				{/* Bracket Left */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[26px] font-light leading-none"
						suppressHydrationWarning
					>
						╭
					</span>
				</div>

				{/* Path Box */}
				<div
					className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#06b6d4] mr-[2px] justify-center min-w-[220px] flex-shrink-0"
					style={{
						background:
							"linear-gradient(90deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)",
					}}
				>
					~/graxya/portfolio
				</div>

				{/* Dots Separator */}
				<div className="flex-1 min-w-0 h-full mx-[10px] opacity-40 bg-[radial-gradient(circle,#6b7280_1.5px,transparent_1.5px)] bg-[length:12px_100%] bg-repeat-x bg-center"></div>

				{/* Time Box */}
				<div
					className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#f472b6] ml-[2px] justify-center min-w-[240px] flex-shrink-0"
					style={{
						background:
							"linear-gradient(270deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)",
					}}
				>
					{mounted ? time : ""}
				</div>

				{/* Bracket Right */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[26px] font-light leading-none"
						suppressHydrationWarning
					>
						╮
					</span>
				</div>
			</div>

			{/* Row 1 - Tablet (768px-1024px): Smaller size with Path and Time */}
			<div className="hidden md:flex lg:hidden items-center w-full h-[30px] relative">
				{/* Bracket Left */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[22px] font-light leading-none"
						suppressHydrationWarning
					>
						╭
					</span>
				</div>

				{/* Path Box */}
				<div
					className="h-full flex items-center px-[20px] rounded-[4px] text-[11px] font-semibold whitespace-nowrap text-[#06b6d4] mr-[2px] justify-center min-w-[160px] flex-shrink-0"
					style={{
						background:
							"linear-gradient(90deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)",
					}}
				>
					~/graxya/portfolio
				</div>

				{/* Dots Separator */}
				<div className="flex-1 min-w-0 h-full mx-[6px] opacity-40 bg-[radial-gradient(circle,#6b7280_1.5px,transparent_1.5px)] bg-[length:10px_100%] bg-repeat-x bg-center"></div>

				{/* Time Box */}
				<div
					className="h-full flex items-center px-[20px] rounded-[4px] text-[11px] font-semibold whitespace-nowrap text-[#f472b6] ml-[2px] justify-center min-w-[180px] flex-shrink-0"
					style={{
						background:
							"linear-gradient(270deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)",
					}}
				>
					{mounted ? time : ""}
				</div>

				{/* Bracket Right */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[22px] font-light leading-none"
						suppressHydrationWarning
					>
						╮
					</span>
				</div>
			</div>

			{/* Row 1 - Mobile (<768px): Simple single line */}
			<div className="md:hidden flex items-center w-full h-[28px] relative">
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[20px] font-light leading-none"
						suppressHydrationWarning
					>
						╭
					</span>
				</div>
				<div className="flex-1 h-full flex items-center justify-center">
					<span className="text-[10px] font-semibold text-[#06b6d4]">
						~/graxya/portfolio
					</span>
				</div>
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[20px] font-light leading-none"
						suppressHydrationWarning
					>
						╮
					</span>
				</div>
			</div>

			{/* Row 2 */}
			<div className="flex items-center w-full h-[28px] md:h-[30px] lg:h-[34px] relative -mt-[3px]">
				{/* Bracket Left */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[20px] md:text-[22px] lg:text-[26px] font-light leading-none"
						suppressHydrationWarning
					>
						╰
					</span>
				</div>

				{/* Input Area */}
				<div
					className="flex items-center pl-[2px] md:pl-[3px] lg:pl-[4px] flex-1 min-w-0 cursor-text"
					onClick={focusInput}
				>
					<span className="text-[#a855f7] mr-[4px] md:mr-[5px] lg:mr-[6px] font-bold text-[14px] md:text-[16px] lg:text-[18px] flex-shrink-0">
						❯
					</span>
					<div className="relative flex-1 min-w-0 h-[16px] md:h-[17px] lg:h-[18px] flex items-center">
						{/* Ghost suggestion text */}
						{suggestion && (
							<span className="absolute left-0 text-[#6b7280] text-[11px] md:text-[12px] lg:text-[13px] font-mono pointer-events-none leading-none">
								{suggestion}
							</span>
						)}
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							className="bg-transparent border-none outline-none text-[#e5e7eb] text-[11px] md:text-[12px] lg:text-[13px] font-mono w-full caret-transparent absolute left-0 h-full leading-none"
							spellCheck={false}
							autoComplete="off"
						/>
						<span
							className="absolute top-0 pointer-events-none"
							style={{ left: `${input.length * (isMobile ? 7.2 : 7.8)}px` }}
						>
							<span className="inline-block w-[8px] md:w-[9px] lg:w-[10px] h-[16px] md:h-[17px] lg:h-[18px] bg-[#a855f7] animate-blink"></span>
						</span>
					</div>
				</div>

				{/* Bracket Right */}
				<div className="h-full flex items-center flex-shrink-0">
					<span
						className="text-[#a855f7] text-[20px] md:text-[22px] lg:text-[26px] font-light leading-none"
						suppressHydrationWarning
					>
						╯
					</span>
				</div>
			</div>
		</div>
	);
}
