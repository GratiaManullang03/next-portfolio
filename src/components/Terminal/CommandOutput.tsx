'use client';

import { COMMANDS, isValidCommand } from '@/constants/commands';

interface CommandOutputProps {
    command: string;
}

export default function CommandOutput({ command }: CommandOutputProps) {
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

    // Check if valid command
    if (isValidCommand(lowerCommand)) {
        // Valid command - no output needed (will be handled by navigation/action later)
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
