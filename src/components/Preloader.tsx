"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./ui/DecryptedText";
import ScrambleText from "./ui/ScrambleText";
import { useFontLoaded } from "@/hooks/useFontLoaded";
import { useLoading } from "@/contexts/LoadingContext";

interface PreloaderProps {
	onLoadingComplete?: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps = {}) {
	const [isLoading, setIsLoading] = useState(true);
	const [showText, setShowText] = useState(false);
	const [minTimeElapsed, setMinTimeElapsed] = useState(false);

	// Check if critical fonts are loaded
	const fontsLoaded = useFontLoaded(["IBM Plex Mono", "Fira Code"]);

	// Check if terminal/ASCII is ready to render
	const { isTerminalReady } = useLoading();

	// Calculate loading progress based on actual conditions
	const loadingProgress =
		(minTimeElapsed ? 33 : 0) +
		(fontsLoaded ? 33 : 0) +
		(isTerminalReady ? 34 : 0);

	useEffect(() => {
		// Start decrypt animation after a short delay
		const textTimer = setTimeout(() => {
			setShowText(true);
		}, 500);

		// Minimum loading time (smooth UX, not too fast)
		const minTimer = setTimeout(() => {
			setMinTimeElapsed(true);
		}, 1500);

		return () => {
			clearTimeout(textTimer);
			clearTimeout(minTimer);
		};
	}, []);

	// Only hide preloader when ALL conditions are met
	useEffect(() => {
		if (minTimeElapsed && fontsLoaded && isTerminalReady) {
			// Small delay to ensure everything is painted
			const finalDelay = setTimeout(() => {
				setIsLoading(false);
				onLoadingComplete?.();
			}, 100);

			return () => clearTimeout(finalDelay);
		}
	}, [minTimeElapsed, fontsLoaded, isTerminalReady, onLoadingComplete]);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					className="fixed inset-0 z-50 bg-[#020204] flex flex-col items-center justify-center"
				>
					{/* Animated grid background */}
					<div className="absolute inset-0 opacity-20">
						<div
							className="w-full h-full"
							style={{
								backgroundImage: `
                                    linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                                `,
								backgroundSize: "50px 50px",
							}}
						/>
					</div>

					{/* Main content */}
					<div className="relative z-10 text-center">
						{showText && (
							<>
								{/* GRAXYA title with scramble effect */}
								<div className="mb-8">
									<ScrambleText
										text="GRAXYA"
										radius={120}
										duration={1.2}
										scrambleChars=".:"
										className="text-5xl md:text-7xl font-bold tracking-wider text-[#a855f7] font-mono"
									/>
								</div>

								{/* Subtitle */}
								<div className="mb-12">
									<DecryptedText
										text="INITIALIZING SYSTEM..."
										speed={40}
										maxIterations={20}
										characters="!@#$%^&*()_+-=[]{}|;:,.<>?"
										animateOn="view"
										className="text-[#f472b6]"
										encryptedClassName="text-[#4ade80]"
										parentClassName="text-sm md:text-base font-mono tracking-widest"
									/>
								</div>

								{/* Loading bar */}
								<div className="w-64 md:w-80 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
									<motion.div
										initial={{ width: "0%" }}
										animate={{ width: `${loadingProgress}%` }}
										transition={{
											duration: 0.3,
											ease: "easeOut",
										}}
										className="h-full bg-gradient-to-r from-[#06b6d4] via-[#a855f7] to-[#f472b6]"
									/>
								</div>
							</>
						)}
					</div>

					{/* Corner decorations */}
					<div className="absolute top-4 left-4 text-[#a855f7] font-mono text-xs opacity-50">
						[SYS.BOOT]
					</div>
					<div className="absolute top-4 right-4 text-[#06b6d4] font-mono text-xs opacity-50">
						v1.0.0
					</div>
					<div className="absolute bottom-4 left-4 text-[#f472b6] font-mono text-xs opacity-50">
						BACKEND.DEV
					</div>
					<div className="absolute bottom-4 right-4 text-[#4ade80] font-mono text-xs opacity-50">
						STATUS: ONLINE
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
