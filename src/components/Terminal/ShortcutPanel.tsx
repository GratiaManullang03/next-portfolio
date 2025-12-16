"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMANDS } from "@/constants/commands";
import { useLenis } from "@/hooks/useLenis";

interface ShortcutPanelProps {
	onCommandSelect: (command: string) => void;
	disabled?: boolean;
	show?: boolean;
}

export default function ShortcutPanel({
	onCommandSelect,
	disabled = false,
	show = true,
}: ShortcutPanelProps) {
	const [isMinimized, setIsMinimized] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 20, y: 20 });
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [hoveredCommand, setHoveredCommand] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Lenis smooth scroll for panel content
	useLenis(scrollRef, {
		duration: 1.2,
		smoothWheel: true,
		wheelMultiplier: 0.8,
		touchMultiplier: 1.5,
		infinite: false,
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	// Handle dragging
	const handleMouseDown = (e: React.MouseEvent) => {
		if (isMinimized) return;
		setIsDragging(true);
		if (panelRef.current) {
			const rect = panelRef.current.getBoundingClientRect();
			setDragOffset({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				setPosition({
					x: e.clientX - dragOffset.x,
					y: e.clientY - dragOffset.y,
				});
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragOffset]);

	const handleCommandClick = (commandName: string) => {
		if (disabled) return;
		onCommandSelect(commandName);
	};

	// Don't render until mounted and show is true
	if (!mounted || !show) return null;

	return (
		<>
			{/* Mobile: Floating Button */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8, y: 100 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{
					delay: 0.6,
					duration: 0.6,
					type: "spring",
					stiffness: 200,
					damping: 20
				}}
				className="lg:hidden fixed bottom-6 right-6 z-50"
			>
				<AnimatePresence mode="wait">
					{isMinimized ? (
						<motion.button
							key="minimized"
							initial={{ scale: 0, rotate: -90 }}
							animate={{
								scale: 1,
								rotate: 0,
							}}
							exit={{ scale: 0, rotate: 90 }}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							onClick={() => setIsMinimized(false)}
							disabled={disabled}
							className={`w-14 h-14 rounded-full bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#f472b6]
								shadow-lg shadow-purple-500/50 flex items-center justify-center relative overflow-hidden
								${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl hover:shadow-purple-500/60"}
								transition-all duration-300 border border-[#a855f7]/30`}
						>
							{/* Animated gradient background */}
							<div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 to-[#f472b6]/20 animate-pulse" />

							{/* Lightning bolt icon */}
							<svg
								className="w-6 h-6 text-white relative z-10"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
							</svg>
						</motion.button>
					) : (
						<motion.div
							key="expanded"
							initial={{ scale: 0.8, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.8, opacity: 0, y: 20 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#333] rounded-xl shadow-2xl overflow-hidden"
						>
							{/* Mobile Header */}
							<div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#222] to-[#1a1a1a] border-b border-[#333]">
								<div className="flex items-center gap-3">
									{/* Lightning icon */}
									<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#f472b6] flex items-center justify-center">
										<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
										</svg>
									</div>
									<div>
										<span className="text-sm font-bold text-white block">Quick Commands</span>
										<span className="text-[10px] text-[#999]">9 shortcuts available</span>
									</div>
								</div>
								<button
									onClick={() => setIsMinimized(true)}
									className="text-[#999] hover:text-[#a855f7] transition-colors p-2 hover:bg-[#2a2a2a] rounded-lg"
								>
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
							</div>

							{/* Mobile Command List */}
							<div ref={scrollRef} className="max-h-[60vh] overflow-y-auto p-2">
								{COMMANDS.map((cmd) => (
									<button
										key={cmd.name}
										onClick={() => handleCommandClick(cmd.name)}
										disabled={disabled}
										className={`w-full text-left px-3 py-2 rounded-lg mb-1
											transition-all duration-200 group
											${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2a2a2a] active:bg-[#333]"}`}
									>
										<div className="flex items-center justify-between">
											<span className="text-[#06b6d4] font-mono text-sm">
												{cmd.name}
											</span>
											<span className="text-[#f472b6] font-mono text-xs px-2 py-1 bg-[#222] rounded">
												{cmd.shortcutKey}
											</span>
										</div>
										<p className="text-[#999] text-xs mt-1">
											{cmd.description}
										</p>
									</button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Desktop: Draggable Panel */}
			<div className="hidden lg:block">
				<motion.div
					ref={panelRef}
					initial={{ scale: 0, opacity: 0, x: 300, rotate: -10 }}
					animate={{
						scale: isMinimized ? 0.5 : 1,
						opacity: 1,
						x: 0,
						rotate: 0,
					}}
					transition={{
						delay: 0.6,
						duration: 0.7,
						type: "spring",
						stiffness: 150,
						damping: 20
					}}
					style={{
						position: "fixed",
						top: position.y,
						left: position.x,
						zIndex: 50,
					}}
					className={`${isDragging ? "cursor-grabbing" : ""} ${isMinimized ? "cursor-pointer" : ""}`}
				>
					<AnimatePresence mode="wait">
						{isMinimized ? (
							<motion.button
								key="minimized"
								initial={{ scale: 0, rotate: -90 }}
								animate={{
									scale: 1,
									rotate: 0,
								}}
								exit={{ scale: 0, rotate: 90 }}
								transition={{ type: "spring", stiffness: 300, damping: 25 }}
								onClick={() => setIsMinimized(false)}
								disabled={disabled}
								className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#f472b6]
									shadow-xl shadow-purple-500/50 flex items-center justify-center relative overflow-hidden
									${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl hover:shadow-purple-500/70"}
									transition-all duration-300 border border-[#a855f7]/40`}
							>
								{/* Animated gradient background */}
								<div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/30 to-[#f472b6]/30 animate-pulse" />

								{/* Lightning bolt icon */}
								<svg
									className="w-7 h-7 text-white relative z-10"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
								</svg>
							</motion.button>
						) : (
							<motion.div
								key="expanded"
								initial={{ scale: 0.9, opacity: 0, y: -20 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0.9, opacity: 0, y: -20 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#333]/80 rounded-xl
									shadow-2xl overflow-hidden w-[340px]"
							>
								{/* Header */}
								<div
									onMouseDown={handleMouseDown}
									className={`flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#222] to-[#1a1a1a]
										border-b border-[#333] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
								>
									<div className="flex items-center gap-3">
										{/* Lightning icon */}
										<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#f472b6] flex items-center justify-center relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 to-[#f472b6]/20 animate-pulse" />
											<svg className="w-4 h-4 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
												<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
											</svg>
										</div>
										<div>
											<span className="text-sm font-bold text-white block">Quick Commands</span>
											<span className="text-[10px] text-[#999]">Drag to move • Click to use</span>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => setIsMinimized(true)}
											className="text-[#999] hover:text-[#a855f7] transition-colors p-2 hover:bg-[#2a2a2a] rounded-lg"
										>
											<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
											</svg>
										</button>
									</div>
								</div>

								{/* Command List */}
								<div ref={scrollRef} className="max-h-[500px] overflow-y-auto p-3 scrollbar-hide">
									{COMMANDS.map((cmd) => (
										<div
											key={cmd.name}
											onMouseEnter={() => setHoveredCommand(cmd.name)}
											onMouseLeave={() => setHoveredCommand(null)}
											className="mb-2 last:mb-0"
										>
											<button
												onClick={() => handleCommandClick(cmd.name)}
												disabled={disabled}
												className={`w-full text-left px-3 py-2.5 rounded-lg
													transition-all duration-200 group relative overflow-hidden
													${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2a2a2a] active:bg-[#333]"}`}
											>
												{/* Hover glow effect */}
												<div
													className={`absolute inset-0 bg-gradient-to-r from-[#a855f7]/10 to-[#f472b6]/10
														transition-opacity duration-300
														${hoveredCommand === cmd.name ? "opacity-100" : "opacity-0"}`}
												/>

												<div className="relative">
													<div className="flex items-center justify-between mb-1">
														<span className="text-[#06b6d4] font-mono text-sm font-semibold">
															{cmd.name}
														</span>
														<span
															className="text-[#f472b6] font-mono text-xs px-2 py-1
															bg-[#222] rounded border border-[#333]
															group-hover:border-[#f472b6] transition-colors"
														>
															{cmd.shortcutKey}
														</span>
													</div>

													{/* Description - always rendered, opacity changes */}
													<p
														className={`text-[#999] text-xs mt-2 border-t pt-2 transition-all duration-300
															${hoveredCommand === cmd.name ? "opacity-100 border-[#333]" : "opacity-0 border-transparent"}`}
													>
														{cmd.description}
													</p>
												</div>
											</button>
										</div>
									))}
								</div>

								{/* Footer */}
								<div className="px-4 py-2 bg-[#222] border-t border-[#333] text-center">
									<p className="text-[#666] text-xs">
										Click command or use keyboard shortcut
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>

		</>
	);
}
