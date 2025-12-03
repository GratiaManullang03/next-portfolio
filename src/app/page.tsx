"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalContainer from "@/components/Terminal/TerminalContainer";
import TerminalHeader from "@/components/Terminal/TerminalHeader";
import AsciiArt from "@/components/Terminal/AsciiArt";
import TerminalOutput from "@/components/Terminal/TerminalOutput";
import Prompt from "@/components/Terminal/Prompt";
import CommandOutput, {
	isBrowserCommand,
} from "@/components/Terminal/CommandOutput";
import Browser from "@/components/Browser/Browser";
import Preloader from "@/components/Preloader";
import Background from "@/components/Background";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { useLenis } from "@/hooks/useLenis";

interface CommandEntry {
	command: string;
	id: number;
}

export default function Home() {
	const [commands, setCommands] = useState<CommandEntry[]>([]);
	const [browserCommand, setBrowserCommand] = useState<string | null>(null);
	const [showTerminal, setShowTerminal] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const commandIdRef = useRef(0);

	// Initialize Lenis for smooth scrolling on terminal
	const lenisRef = useLenis(scrollRef, {
		duration: 1.2,
		smoothWheel: true,
	});

	const handleCommand = (command: string) => {
		commandIdRef.current += 1;
		setCommands((prev) => [...prev, { command, id: commandIdRef.current }]);

		// Check if it's a browser command
		if (isBrowserCommand(command)) {
			setBrowserCommand(command);
		}
	};

	const handleCloseBrowser = () => {
		setBrowserCommand(null);
	};

	// Handle Ctrl+C to close browser
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "c" && browserCommand) {
				e.preventDefault();
				handleCloseBrowser();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [browserCommand]);

	// Smooth scroll to bottom using Lenis
	useEffect(() => {
		if (scrollRef.current && lenisRef.current) {
			// Use Lenis scrollTo instead of native scrollTop
			lenisRef.current.scrollTo(scrollRef.current.scrollHeight, {
				immediate: false,
				duration: 0.5,
			});
		}
	}, [commands, lenisRef]);

	return (
		<LoadingProvider>
			<Background />
			<Preloader onLoadingComplete={() => setShowTerminal(true)} />

			{/* Browser Overlay */}
			<AnimatePresence>
				{browserCommand && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
					>
						<Browser command={browserCommand} onClose={handleCloseBrowser} />
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={
					showTerminal
						? { scale: 1, opacity: 1 }
						: { scale: 0.8, opacity: 0 }
				}
				transition={{
					duration: 0.8,
					ease: [0.16, 1, 0.3, 1],
				}}
			>
				<TerminalContainer>
					<TerminalHeader />
					<div className="flex flex-col h-[calc(100%-35px)]">
						<div className="px-[20px] flex-shrink-0">
							<AsciiArt />
						</div>
						<div
							ref={scrollRef}
							className="flex-1 overflow-y-auto scrollbar-hide px-[20px]"
						>
							<TerminalOutput />
							{commands.map((entry) => (
								<div key={entry.id}>
									<div className="text-[#6b7280] mb-2 font-mono text-[13px]">
										<span className="text-[#a855f7] mr-[6px] font-bold text-[18px]">
											❯
										</span>{" "}
										{entry.command}
									</div>
									<CommandOutput
										command={entry.command}
										isBrowserRunning={browserCommand === entry.command}
									/>
								</div>
							))}
							{!browserCommand && <Prompt onCommand={handleCommand} />}
						</div>
					</div>
				</TerminalContainer>
			</motion.div>
		</LoadingProvider>
	);
}
