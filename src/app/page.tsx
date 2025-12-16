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
import ShortcutPanel from "@/components/Terminal/ShortcutPanel";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import { useLenis } from "@/hooks/useLenis";
import { COMMANDS } from "@/constants/commands";

interface CommandEntry {
	command: string;
	id: number;
}

function HomeContent() {
	const [commands, setCommands] = useState<CommandEntry[]>([]);
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [browserCommand, setBrowserCommand] = useState<string | null>(null);
	const [showTerminal, setShowTerminal] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const commandIdRef = useRef(0);
	const { isTerminalReady } = useLoading();

	// Initialize Lenis for smooth scrolling on terminal
	const lenisRef = useLenis(scrollRef, {
		duration: 0.5,
		smoothWheel: true,
		wheelMultiplier: 0.5,
		touchMultiplier: 1,
		infinite: false,
		syncTouch: false,
	});

	const handleCommand = (command: string) => {
		// Handle clear command
		if (command.toLowerCase() === "clear") {
			setCommands([]);
			setCommandHistory([]);
			return;
		}

		commandIdRef.current += 1;
		setCommands((prev) => [...prev, { command, id: commandIdRef.current }]);

		// Update command history (no duplicates, newest first)
		setCommandHistory((prev) => {
			const filtered = prev.filter((cmd) => cmd !== command);
			return [command, ...filtered];
		});

		// Check if it's a browser command
		if (isBrowserCommand(command)) {
			setBrowserCommand(command);
		}
	};

	const handleCloseBrowser = () => {
		setBrowserCommand(null);
	};

	// Handle keyboard shortcuts (Ctrl+C and Ctrl+1-9)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Don't trigger shortcuts if input is disabled (preload)
			if (!isTerminalReady) return;

			// Ctrl+C to close browser
			if (e.ctrlKey && e.key === "c" && browserCommand) {
				e.preventDefault();
				handleCloseBrowser();
				return;
			}

			// Ctrl+1 to Ctrl+9 for command shortcuts
			if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
				const num = parseInt(e.key);
				if (num >= 1 && num <= 9) {
					e.preventDefault();
					const commandIndex = num - 1;
					if (COMMANDS[commandIndex]) {
						handleCommand(COMMANDS[commandIndex].name);
					}
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [browserCommand, isTerminalReady]);

	// Smooth scroll to bottom using Lenis
	useEffect(() => {
		if (commands.length === 0) return;

		// Multiple delays untuk memastikan DOM fully rendered
		const timer1 = setTimeout(() => {
			if (scrollRef.current && lenisRef.current) {
				// Force Lenis to recalculate dimensions
				lenisRef.current.resize();
			}
		}, 50);

		const timer2 = setTimeout(() => {
			if (scrollRef.current) {
				const scrollElement = scrollRef.current;
				const contentElement = scrollElement.firstElementChild as HTMLElement;

				if (contentElement) {
					// Calculate exact scroll target
					const targetScroll = contentElement.scrollHeight;

					// Try Lenis first
					if (lenisRef.current) {
						lenisRef.current.scrollTo(targetScroll, {
							immediate: false,
							duration: 1.2,
						});
					}
				}
			}
		}, 150);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [commands]);

	return (
		<>
			<Background />
			<Preloader onLoadingComplete={() => setShowTerminal(true)} />

			{/* Shortcut Panel */}
			<ShortcutPanel
				onCommandSelect={handleCommand}
				disabled={!isTerminalReady}
				show={showTerminal}
			/>

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
							<div className={isDropdownOpen ? "pb-[250px]" : ""}>
								<TerminalOutput />
								{commands.map((entry) => (
									<div key={entry.id}>
										<div className="text-[#9ca3af] mb-2 font-mono text-[13px]">
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
								{!browserCommand && (
									<Prompt
										onCommand={handleCommand}
										commandHistory={commandHistory}
										disabled={!isTerminalReady}
										onDropdownChange={setIsDropdownOpen}
									/>
								)}
							</div>
						</div>
					</div>
				</TerminalContainer>
			</motion.div>
		</>
	);
}

export default function Home() {
	return (
		<LoadingProvider>
			<HomeContent />
		</LoadingProvider>
	);
}
