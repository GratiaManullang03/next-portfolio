'use client';

import { COMMANDS, isValidCommand } from '@/constants/commands';

interface CommandOutputProps {
    command: string;
    isBrowserRunning?: boolean;
}

// Commands that open browser
const BROWSER_COMMANDS = [
    '/curriculum-vitae',
    '/project',
    '/experience',
    '/achievements',
    '/skills',
    '/chat',
];

export const isBrowserCommand = (command: string): boolean => {
    return BROWSER_COMMANDS.includes(command.toLowerCase());
};

export default function CommandOutput({ command, isBrowserRunning }: CommandOutputProps) {
    const lowerCommand = command.toLowerCase();

    // Handle /command or /commands - show list of available commands
    if (lowerCommand === '/command' || lowerCommand === '/commands' || lowerCommand === '/help') {
        return (
            <div className="mb-4 font-mono text-[13px]">
                <div className="text-[#06b6d4] mb-2">Available commands:</div>
                <div className="ml-4">
                    {COMMANDS.map((cmd) => (
                        <div key={cmd.name} className="mb-1">
                            <span className="text-[#a855f7]">{cmd.name}</span>
                            <span className="text-[#6b7280]"> - {cmd.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Handle browser commands - show funny terminal output
    if (isBrowserCommand(lowerCommand)) {
        const commandName = lowerCommand.replace('/', '');
        return (
            <div className="mb-4 font-mono text-[13px]">
                <div className="text-[#6b7280]">$ graxya run {commandName}</div>
                <div className="text-[#6b7280] mt-1">
                    <span className="text-[#fbbf24]">⚠</span> Warning: You&apos;re about to see something cool.
                </div>
                <div className="text-[#6b7280]">   Don&apos;t blame me if you get impressed.</div>
                <div className="text-[#6b7280] mt-2">
                    <span className="text-[#a855f7]">▲</span> Graxya.Portfolio v1.0.0 (Turbo Mode)
                </div>
                <div className="text-[#6b7280]">   - Local:     <span className="text-[#06b6d4]">https://graxya.dev/{commandName}</span></div>
                <div className="text-[#6b7280]">   - Network:   <span className="text-[#06b6d4]">everywhere</span></div>
                <div className="text-[#22c55e] mt-2">✓ Brewing coffee...</div>
                <div className="text-[#22c55e]">✓ Summoning creativity...</div>
                <div className="text-[#22c55e]">✓ Ready in 0.001ms (yes, I&apos;m that fast)</div>
                <div className="text-[#22c55e] mt-1">○ Launching browser window...</div>
                {isBrowserRunning && (
                    <div className="text-[#f472b6] mt-3">
                        Press <span className="text-[#06b6d4] font-bold">Ctrl + C</span> to close browser and return to terminal
                    </div>
                )}
            </div>
        );
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
            <div className="text-[#6b7280]">
                Type <span className="text-[#06b6d4]">/command</span> to see the list of available commands.
            </div>
        </div>
    );
}
