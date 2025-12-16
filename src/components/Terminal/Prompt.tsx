"use client";

import React, { useState, useEffect, useRef } from "react";
import { findMatchingCommands, Command } from "@/constants/commands";
import { motion, AnimatePresence } from "framer-motion";

interface PromptProps {
	onCommand?: (command: string) => void;
	commandHistory?: string[];
	disabled?: boolean;
	onDropdownChange?: (isOpen: boolean) => void;
}

export default function Prompt({
	onCommand,
	commandHistory = [],
	disabled = false,
	onDropdownChange,
}: PromptProps) {
	const [time, setTime] = useState("");
	const [mounted, setMounted] = useState(false);
	const [input, setInput] = useState("");
	const [suggestion, setSuggestion] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [matches, setMatches] = useState<Command[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

			// Focus and smooth scroll to input (but not when dropdown is showing)
			if (inputRef.current && !showDropdown) {
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
			} else if (inputRef.current && showDropdown) {
				// Just focus without scrolling when dropdown is showing
				inputRef.current.focus({ preventScroll: true });
			}
		};

		window.addEventListener("click", handleGlobalClick, true); // Use capture phase
		return () => window.removeEventListener("click", handleGlobalClick, true);
	}, [showDropdown]);

	// Update matches and suggestion based on input
	useEffect(() => {
		// Don't show dropdown when navigating history
		if (historyIndex >= 0) {
			setSuggestion("");
			setShowDropdown(false);
			setMatches([]);
			return;
		}

		if (input && input.length >= 2) {
			const foundMatches = findMatchingCommands(input);
			setMatches(foundMatches);
			setShowDropdown(foundMatches.length > 0);
			setSelectedIndex(0);

			if (
				foundMatches.length > 0 &&
				foundMatches[0].name !== input.toLowerCase()
			) {
				setSuggestion(foundMatches[0].name);
			} else {
				setSuggestion("");
			}
		} else if (input && input.length === 1) {
			const foundMatches = findMatchingCommands(input);
			if (
				foundMatches.length > 0 &&
				foundMatches[0].name !== input.toLowerCase()
			) {
				setSuggestion(foundMatches[0].name);
			} else {
				setSuggestion("");
			}
			setShowDropdown(false);
			setMatches([]);
		} else {
			setSuggestion("");
			setShowDropdown(false);
			setMatches([]);
		}
	}, [input, historyIndex]);

	// Auto scroll to bottom when dropdown FIRST appears (not on every update)
	useEffect(() => {
		if (showDropdown && dropdownRef.current && matches.length > 0) {
			// Only scroll on first appearance
			const timer = setTimeout(() => {
				dropdownRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest'
				});
			}, 150);
			return () => clearTimeout(timer);
		}
	}, [showDropdown, matches.length]);

	// Notify parent when dropdown state changes
	useEffect(() => {
		onDropdownChange?.(showDropdown);
	}, [showDropdown, onDropdownChange]);


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		// Reset history index when user types manually
		if (historyIndex >= 0) {
			setHistoryIndex(-1);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Handle dropdown navigation
		if (showDropdown && matches.length > 0) {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev < matches.length - 1 ? prev + 1 : prev
				);
				return;
			} else if (e.key === "ArrowUp" && selectedIndex > 0) {
				e.preventDefault();
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
				return;
			} else if (e.key === "Enter") {
				e.preventDefault();
				const selectedCommand = matches[selectedIndex].name;
				setInput(selectedCommand);
				setShowDropdown(false);
				onCommand?.(selectedCommand);
				setInput("");
				setSuggestion("");
				setHistoryIndex(-1);
				return;
			} else if (e.key === "Escape") {
				setShowDropdown(false);
				return;
			}
		}

		// Handle command history navigation
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (commandHistory.length > 0) {
				const newIndex =
					historyIndex < commandHistory.length - 1
						? historyIndex + 1
						: historyIndex;
				setHistoryIndex(newIndex);
				setInput(commandHistory[newIndex]);
			}
			return;
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setInput(commandHistory[newIndex]);
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setInput("");
			}
			return;
		}

		// Handle enter
		if (e.key === "Enter" && input.trim()) {
			onCommand?.(input.trim());
			setInput("");
			setSuggestion("");
			setHistoryIndex(-1);
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
		<div className="relative mb-2">
			{/* Fuzzy Search Dropdown */}
			<AnimatePresence>
				{showDropdown && matches.length > 0 && (
					<motion.div
						ref={dropdownRef}
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						transition={{ duration: 0.15 }}
						className="absolute top-full left-0 mt-3 w-full max-w-[500px] bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#333] rounded-lg shadow-2xl overflow-hidden z-[9999]"
						onWheel={(e) => e.stopPropagation()}
						onTouchMove={(e) => e.stopPropagation()}
					>
						<div className="max-h-[300px] overflow-y-auto">
							{matches.map((cmd, index) => (
								<button
									key={cmd.name}
									onClick={() => {
										setInput(cmd.name);
										setShowDropdown(false);
										onCommand?.(cmd.name);
										setInput("");
										setSuggestion("");
									}}
									disabled={disabled}
									className={`w-full text-left px-4 py-3 transition-all duration-150
										${index === selectedIndex ? "bg-[#2a2a2a]" : "hover:bg-[#222]"}
										${index !== matches.length - 1 ? "border-b border-[#2a2a2a]" : ""}
										${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
								>
									<div className="flex items-center justify-between mb-1">
										<div className="flex items-center gap-2">
											{index === selectedIndex && (
												<span className="text-[#a855f7] text-xs">↑</span>
											)}
											<span className="text-[#06b6d4] font-mono text-sm font-semibold">
												{cmd.name}
											</span>
										</div>
										<span className="text-[#f472b6] font-mono text-xs px-2 py-1 bg-[#222] rounded border border-[#333]">
											{cmd.shortcutKey}
										</span>
									</div>
									<p className="text-[#999] text-xs pl-5">{cmd.description}</p>
								</button>
							))}
						</div>
						<div className="px-4 py-2 bg-[#222] border-t border-[#333] text-center">
							<p className="text-[#666] text-xs">
								{historyIndex >= 0 ? (
									<span>
										History {historyIndex + 1}/{commandHistory.length}
									</span>
								) : (
									<span>↑↓ Navigate • Enter Select • Esc Close</span>
								)}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

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
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							disabled={disabled}
							className="bg-transparent border-none outline-none text-[#e5e7eb] text-[11px] md:text-[12px] lg:text-[13px] font-mono w-full caret-transparent absolute left-0 h-full leading-none disabled:opacity-50 disabled:cursor-not-allowed"
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
