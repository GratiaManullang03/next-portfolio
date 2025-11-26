export interface Command {
	name: string;
	description: string;
}

export const COMMANDS: Command[] = [
	{ name: "/about", description: "Display information about me" },
	{
		name: "/curriculum-vitae",
		description: "View my curriculum vitae / resume",
	},
	{ name: "/project", description: "Browse my projects and works" },
	{ name: "/experience", description: "See my work experience" },
	{
		name: "/achievements",
		description: "View my achievements and certifications",
	},
	{ name: "/skills", description: "List my technical skills" },
	{ name: "/social", description: "Find my social media links" },
	{ name: "/chat", description: "Start a conversation with me" },
	{ name: "/command", description: "Show list of available commands" },
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
