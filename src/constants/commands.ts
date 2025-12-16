export interface Command {
	name: string;
	description: string;
	shortcut: string;
	shortcutKey: string; // For display purposes
}

export const COMMANDS: Command[] = [
	{
		name: "/about",
		description: "Display information about me",
		shortcut: "Ctrl+1",
		shortcutKey: "^1",
	},
	{
		name: "/curriculum-vitae",
		description: "View my curriculum vitae / resume",
		shortcut: "Ctrl+2",
		shortcutKey: "^2",
	},
	{
		name: "/project",
		description: "Browse my projects and works",
		shortcut: "Ctrl+3",
		shortcutKey: "^3",
	},
	{
		name: "/experience",
		description: "See my work experience",
		shortcut: "Ctrl+4",
		shortcutKey: "^4",
	},
	{
		name: "/achievements",
		description: "View my achievements and certifications",
		shortcut: "Ctrl+5",
		shortcutKey: "^5",
	},
	{
		name: "/skills",
		description: "List my technical skills",
		shortcut: "Ctrl+6",
		shortcutKey: "^6",
	},
	{
		name: "/social",
		description: "Find my social media links",
		shortcut: "Ctrl+7",
		shortcutKey: "^7",
	},
	{
		name: "/chat",
		description: "Start a conversation with me",
		shortcut: "Ctrl+8",
		shortcutKey: "^8",
	},
	{
		name: "/command",
		description: "Show list of available commands",
		shortcut: "Ctrl+9",
		shortcutKey: "^9",
	},
];

export const COMMAND_NAMES = COMMANDS.map((cmd) => cmd.name);

export const isValidCommand = (input: string): boolean => {
	return COMMAND_NAMES.includes(input.toLowerCase());
};

export const findMatchingCommands = (input: string): Command[] => {
	if (!input) return [];
	const lowerInput = input.toLowerCase();
	return COMMANDS.filter((cmd) => cmd.name.startsWith(lowerInput));
};
