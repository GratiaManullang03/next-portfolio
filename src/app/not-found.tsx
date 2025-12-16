"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Background from "@/components/Background";

export default function NotFound() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(10);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (countdown === 0) {
			router.push("/");
			return;
		}

		const timer = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [countdown, router]);

	// Handle ESC key to go home
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				router.push("/");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [router]);

	const handleGoHome = () => {
		router.push("/");
	};

	if (!mounted) return null;

	return (
		<>
			<Background />
			<div className="min-h-screen flex items-center justify-center p-4">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						duration: 0.8,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="w-full max-w-2xl"
				>
					{/* Terminal Container */}
					<div className="relative bg-[#1e1e1e] rounded-lg shadow-2xl border-[1.5px] border-[#2a2a2a] overflow-hidden backdrop-blur-sm">
						{/* Terminal Header */}
						<div className="h-[35px] bg-[#181818] flex items-center px-4 border-b border-[#2a2a2a]">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
								<div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
								<div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
							</div>
							<div className="flex-1 text-center text-[#9ca3af] text-xs font-semibold">
								404 - NOT FOUND
							</div>
						</div>

						{/* Terminal Body */}
						<div className="p-8 space-y-6">
							{/* ASCII Art Error */}
							<div className="text-[#ef4444] font-mono text-xs leading-tight">
								<pre className="whitespace-pre">
{`  _  _    ___  _  _
 | || |  / _ \\| || |
 | || |_| | | | || |_
 |__   _| | | |__   _|
    | | | |_| |  | |
    |_|  \\___/   |_|  `}
								</pre>
							</div>

							{/* Error Message */}
							<div className="space-y-3">
								<div className="flex items-start gap-2">
									<span className="text-[#ef4444] font-bold text-lg flex-shrink-0">
										ERROR:
									</span>
									<div className="space-y-1">
										<p className="text-[#e5e7eb] font-mono text-sm">
											Page not found in the system directory
										</p>
										<p className="text-[#9ca3af] font-mono text-xs">
											bash: cd: /home/graxya/portfolio{typeof window !== "undefined" ? window.location.pathname : ""}: No such file or directory
										</p>
									</div>
								</div>

								{/* Suggestion */}
								<div className="bg-[#2a2a2a]/50 border border-[#333] rounded p-4 space-y-2">
									<p className="text-[#06b6d4] font-mono text-xs font-semibold">
										💡 SUGGESTION:
									</p>
									<p className="text-[#9ca3af] font-mono text-xs leading-relaxed">
										The page you're looking for doesn't exist. You might have mistyped the URL
										or the page has been moved.
									</p>
								</div>

								{/* Auto redirect info */}
								<div className="flex items-center gap-2 text-xs">
									<span className="text-[#a855f7] font-bold">❯</span>
									<span className="text-[#f472b6] font-mono">
										Auto-redirecting to home in{" "}
										<motion.span
											key={countdown}
											initial={{ scale: 1.5, color: "#ef4444" }}
											animate={{ scale: 1, color: "#f472b6" }}
											transition={{ duration: 0.3 }}
											className="font-bold"
										>
											{countdown}
										</motion.span>
										s...
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 pt-4">
								<button
									onClick={handleGoHome}
									className="flex-1 bg-[#a855f7] hover:bg-[#9333ea] text-white font-mono text-sm font-semibold py-3 px-6 rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
								>
									<span className="flex items-center justify-center gap-2">
										<span>→</span>
										<span>cd ~/home</span>
									</span>
								</button>
								<button
									onClick={() => router.back()}
									className="flex-1 bg-[#2a2a2a] hover:bg-[#333] text-[#e5e7eb] font-mono text-sm font-semibold py-3 px-6 rounded border border-[#444] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
								>
									<span className="flex items-center justify-center gap-2">
										<span>←</span>
										<span>Go Back</span>
									</span>
								</button>
							</div>

							{/* Available Commands */}
							<div className="border-t border-[#2a2a2a] pt-4 space-y-2">
								<p className="text-[#06b6d4] font-mono text-xs font-semibold">
									AVAILABLE COMMANDS:
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
									<div className="flex items-center gap-2 text-[#9ca3af] font-mono">
										<span className="text-[#f472b6]">•</span>
										<code className="text-[#06b6d4]">help</code>
										<span>- Show all commands</span>
									</div>
									<div className="flex items-center gap-2 text-[#9ca3af] font-mono">
										<span className="text-[#f472b6]">•</span>
										<code className="text-[#06b6d4]">about</code>
										<span>- About me</span>
									</div>
									<div className="flex items-center gap-2 text-[#9ca3af] font-mono">
										<span className="text-[#f472b6]">•</span>
										<code className="text-[#06b6d4]">projects</code>
										<span>- View projects</span>
									</div>
									<div className="flex items-center gap-2 text-[#9ca3af] font-mono">
										<span className="text-[#f472b6]">•</span>
										<code className="text-[#06b6d4]">contact</code>
										<span>- Contact info</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Footer hint */}
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="text-center text-[#6b7280] text-xs mt-4 font-mono"
					>
						Press <kbd className="px-2 py-1 bg-[#2a2a2a] rounded border border-[#444]">ESC</kbd> or click the button to return home
					</motion.p>
				</motion.div>
			</div>
		</>
	);
}
