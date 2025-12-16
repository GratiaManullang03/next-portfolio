"use client";

import AboutOutput from './AboutOutput';
import { COMMANDS, isValidCommand } from "@/constants/commands";

interface CommandOutputProps {
	command: string;
	isBrowserRunning?: boolean;
}

// Commands that open browser
const BROWSER_COMMANDS = [
	"/curriculum-vitae",
	"/project",
	"/experience",
	"/achievements",
	"/skills",
	"/chat",
];

export const isBrowserCommand = (command: string): boolean => {
	return BROWSER_COMMANDS.includes(command.toLowerCase());
};

export default function CommandOutput({
	command,
	isBrowserRunning,
}: CommandOutputProps) {
	const lowerCommand = command.toLowerCase();

	// Handle /command or /commands - show list of available commands
	if (
		lowerCommand === "/command" ||
		lowerCommand === "/commands" ||
		lowerCommand === "/help"
	) {
		return (
			<div className="mb-4 font-mono text-[13px]">
				<div className="text-[#06b6d4] mb-2">Available commands:</div>
				<div className="ml-4">
					{COMMANDS.map((cmd) => (
						<div key={cmd.name} className="mb-1">
							<span className="text-[#a855f7]">{cmd.name}</span>
							<span className="text-[#d1d5db]"> - {cmd.description}</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	// Handle browser commands - show funny terminal output
	if (isBrowserCommand(lowerCommand)) {
		const commandName = lowerCommand.replace("/", "");
		return (
			<div className="mb-4 font-mono text-[13px]">
				<div className="text-[#9ca3af]">$ graxya run {commandName}</div>
				<div className="text-[#d1d5db] mt-1">
					<span className="text-[#fbbf24]">⚠</span> Warning: You&apos;re about
					to see something cool.
				</div>
				<div className="text-[#d1d5db]">
					{" "}
					Don&apos;t blame me if you get impressed.
				</div>
				<div className="text-[#9ca3af] mt-2">
					<span className="text-[#a855f7]">▲</span> Graxya.Portfolio v1.0.0
					(Turbo Mode)
				</div>
				<div className="text-[#9ca3af]">
					{" "}
					- Local:{" "}
					<span className="text-[#06b6d4]">
						https://graxya.dev/{commandName}
					</span>
				</div>
				<div className="text-[#9ca3af]">
					{" "}
					- Network: <span className="text-[#06b6d4]">everywhere</span>
				</div>
				<div className="text-[#22c55e] mt-2">✓ Brewing coffee...</div>
				<div className="text-[#22c55e]">✓ Summoning creativity...</div>
				<div className="text-[#22c55e]">
					✓ Ready in 0.001ms (yes, I&apos;m that fast)
				</div>
				<div className="text-[#22c55e] mt-1">○ Launching browser window...</div>
				{isBrowserRunning && (
					<div className="text-[#f472b6] mt-3">
						Press <span className="text-[#06b6d4] font-bold">Ctrl + C</span> to
						close browser and return to terminal
					</div>
				)}
			</div>
		);
	}

	// Handle /social command
	if (lowerCommand === "/social") {
		return (
			<div className="mb-4 font-mono text-[13px]">
				<div className="text-[#9ca3af] mb-3">$ cat socials.txt</div>

				<div className="text-[#06b6d4] mb-3">Connect with me:</div>

				<div className="text-[#e5e7eb] ml-2">
					<a
						href="https://github.com/GratiaManullang03"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 mb-3 group"
					>
						<svg
							className="w-5 h-5 text-[#a855f7] group-hover:text-[#f472b6] transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						<span className="text-[#06b6d4] group-hover:text-[#f472b6] transition-colors">
							github.com/GratiaManullang03
						</span>
					</a>
					<a
						href="https://linkedin.com/in/graxya"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 mb-3 group"
					>
						<svg
							className="w-5 h-5 text-[#a855f7] group-hover:text-[#f472b6] transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
						<span className="text-[#06b6d4] group-hover:text-[#f472b6] transition-colors">
							linkedin.com/in/graxya
						</span>
					</a>
					<a
						href="https://instagram.com/graxya_"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 mb-3 group"
					>
						<svg
							className="w-5 h-5 text-[#a855f7] group-hover:text-[#f472b6] transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg>
						<span className="text-[#06b6d4] group-hover:text-[#f472b6] transition-colors">
							@graxya_
						</span>
					</a>
					<a
						href="mailto:gratiamanullang03@gmail.com"
						className="flex items-center gap-3 mb-3 group"
					>
						<svg
							className="w-5 h-5 text-[#a855f7] group-hover:text-[#f472b6] transition-colors"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
						<span className="text-[#06b6d4] group-hover:text-[#f472b6] transition-colors">
							gratiamanullang03@gmail.com
						</span>
					</a>
					<a
						href="https://graxya.is-a.dev"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 group"
					>
						<svg
							className="w-5 h-5 text-[#a855f7] group-hover:text-[#f472b6] transition-colors"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="2" y1="12" x2="22" y2="12" />
							<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
						</svg>
						<span className="text-[#06b6d4] group-hover:text-[#f472b6] transition-colors">
							graxya.is-a.dev
						</span>
					</a>
				</div>

				<div className="text-[#9ca3af] mt-4 text-[11px]">
					Feel free to reach out! I don&apos;t bite... usually.
				</div>
			</div>
		);
	}

	// Handle /about command
	if (lowerCommand === "/about") {
		return <AboutOutput />;
	}

	// Check if valid command (non-browser)
	if (isValidCommand(lowerCommand)) {
		// Valid command - no output needed (will be handled later)
		return null;
	}

	// Invalid command - show error
	return (
		<div className="mb-4 font-mono text-[13px]">
			<div className="text-[#ef4444]">
				Command not found: <span className="text-[#f472b6]">{command}</span>
			</div>
			<div className="text-[#d1d5db]">
				Type <span className="text-[#06b6d4]">/command</span> to see the list of
				available commands.
			</div>
		</div>
	);
}
