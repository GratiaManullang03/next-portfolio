"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./DecryptedText";

export default function Preloader() {
	const [isLoading, setIsLoading] = useState(true);
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		// Start decrypt animation after a short delay
		const textTimer = setTimeout(() => {
			setShowText(true);
		}, 500);

		// End preloader after animation completes
		const endTimer = setTimeout(() => {
			setIsLoading(false);
		}, 3500);

		return () => {
			clearTimeout(textTimer);
			clearTimeout(endTimer);
		};
	}, []);

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
								{/* GRAXYA title with decrypt effect */}
								<div className="mb-8">
									<DecryptedText
										text="GRAXYA"
										speed={80}
										maxIterations={15}
										characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"
										animateOn="view"
										className="text-[#a855f7]"
										encryptedClassName="text-[#06b6d4]"
										parentClassName="text-5xl md:text-7xl font-bold tracking-wider"
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
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{
											duration: 2.5,
											ease: "easeInOut",
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
