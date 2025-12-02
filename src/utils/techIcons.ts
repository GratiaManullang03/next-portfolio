// src/utils/techIcons.ts
import { skillsData } from "@/data/skills";

// Build iconMap from skills.ts data + additional mappings for backward compatibility
const iconMap: Record<string, string> = {
	// Additional aliases for backward compatibility
	"Tailwind CSS": "tailwind.webp",
	TailwindCSS: "tailwind.webp",
	Vite: "vite.svg",
	PHP: "php.webp",
	"Go (Golang)": "golang.webp",
	"ASP.NET": "aspnet.webp",
	"NATS JetStream": "nats.webp",
	k6: "k6.webp",
	SketchUp: "sketchup.webp",
	FlexSim: "flexsim.webp",
	"IBM SPSS": "ibm-spss.webp",
	"HTML/CSS": "html5.webp",
	jQuery: "jquery.webp",
	SweetAlert2: "javascript.webp",
};

// Add all skills from skillsData to iconMap
skillsData.forEach((skill) => {
	// Extract just the filename from the full path
	const filename = skill.icon.split("/").pop() || skill.icon;
	iconMap[skill.name] = filename;
});

// Export techIcons directly from skillsData to ensure all skills are included
export const techIcons = skillsData.map((skill) => ({
	name: skill.name,
	icon: skill.icon,
	category: skill.category,
}));

export const getTechIcon = (techName: string): string | null => {
	if (iconMap[techName]) {
		if (iconMap[techName].endsWith(".svg")) {
			return `/${iconMap[techName]}`;
		}
		return `/assets/icons/${iconMap[techName]}`;
	}

	const key = Object.keys(iconMap).find((k) => techName.includes(k));
	if (key) {
		if (iconMap[key].endsWith(".svg")) {
			return `/${iconMap[key]}`;
		}
		return `/assets/icons/${iconMap[key]}`;
	}

	return null;
};
