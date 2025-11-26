export interface Project {
	id: string;
	title: string; // Kita ambil English saja untuk konsistensi Terminal
	type: string;
	thumbnail: string;
	description: string;
	technologies: string[];
	liveUrl: string | null;
	repoUrl: string | null;
	featured: boolean;
}

export const projectsData: Project[] = [
	{
		id: "ticket-queue-system",
		title: "Concert Ticket Queue System",
		type: "Backend Application",
		thumbnail: "/assets/images/projects/ticket-system-thumbnail.webp",
		description:
			"A scalable system for handling concert ticket orders with high concurrency (100k+ users).",
		technologies: [
			"Go",
			"Redis",
			"NATS JetStream",
			"PostgreSQL",
			"Docker",
			"k6",
		],
		liveUrl: null,
		repoUrl: "https://github.com/GratiaManullang03/Ticket_Queue_System",
		featured: true,
	},
	{
		id: "admin-dashboard",
		title: "Admin Dashboard System",
		type: "Full-Stack Application",
		thumbnail: "/assets/images/projects/admin-dashboard-thumbnail.webp",
		description:
			"Modern admin dashboard with Laravel frontend and Go backend API featuring JWT auth.",
		technologies: [
			"Laravel",
			"Go (Golang)",
			"Gin",
			"PostgreSQL",
			"JWT",
			"Tailwind CSS",
		],
		liveUrl: "http://admindashboardlaravel.wuaze.com/login",
		repoUrl:
			"https://github.com/GratiaManullang03/AdminDashboardFrontendLaravel",
		featured: true,
	},
	{
		id: "web-portfolio",
		title: "Personal Portfolio Website",
		type: "Website",
		thumbnail: "/assets/images/projects/portfolio-thumbnail.webp",
		description:
			"This very terminal website you are looking at right now. Absolute cinema.",
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Three.js",
		],
		liveUrl: "https://graxya.is-a.dev/",
		repoUrl: "https://github.com/GratiaManullang03/portfolio",
		featured: true,
	},
	{
		id: "esensi-mitra-solusi",
		title: "Esensi Mitra Solusi",
		type: "Corporate Website",
		thumbnail: "/assets/images/projects/esensi-thumbnail.webp",
		description:
			"Corporate website for multi-service provider with dynamic content management.",
		technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
		liveUrl: "https://esensi-mitrasolusi.com/",
		repoUrl: null,
		featured: true,
	},
	{
		id: "timeh-frozen-food",
		title: "Timeh Frozen Food Apps",
		type: "Mobile Application",
		thumbnail: "/assets/images/projects/timeh-thumbnail.webp",
		description:
			"Flutter-based ordering system with realtime inventory and push notifications.",
		technologies: ["Flutter", "Dart", "MongoDB", "Firebase"],
		liveUrl: null,
		repoUrl: "https://github.com/GratiaManullang03/timeh_frozen_food",
		featured: false,
	},
	{
		id: "fuzzy-search-table",
		title: "Fuzzy Search Engine",
		type: "Web Application",
		thumbnail: "/assets/images/projects/fuzzy-search-thumbnail.webp",
		description:
			"Powerful table application with highly tolerant Levenshtein distance fuzzy searching.",
		technologies: ["React", "Vite", "Fuzzysort.js", "Algorithms"],
		liveUrl: "https://fuzzy-wuzzy.vercel.app/",
		repoUrl: "https://github.com/GratiaManullang03/FuzzyWuzzy",
		featured: false,
	},
	{
		id: "healthcare-chatbot",
		title: "Healthcare AI Chatbot",
		type: "AI Innovation",
		thumbnail: "/assets/images/projects/chatbot-thumbnail.webp",
		description:
			"GPT-4 powered medical assistant integrating OpenAI API for local language.",
		technologies: ["C#", "OpenAI API", "ASP.NET"],
		liveUrl: null,
		repoUrl: null,
		featured: false,
	},
	{
		id: "smes-odoo-erp",
		title: "SMEs Odoo ERP",
		type: "ERP System",
		thumbnail: "/assets/images/projects/odoo-erp-thumbnail.webp",
		description:
			"Integrated Odoo ERP implementation for workshop management and automation.",
		technologies: ["Odoo", "Python", "PostgreSQL"],
		liveUrl: null,
		repoUrl: null,
		featured: false,
	},
	{
		id: "street-fighter-console",
		title: "Street Fighter Console",
		type: "Game Dev",
		thumbnail: "/assets/images/projects/street-fighter-thumbnail.webp",
		description:
			"Object-oriented C++ console game with character classes and ASCII visuals.",
		technologies: ["C++", "OOP"],
		liveUrl: null,
		repoUrl: null,
		featured: false,
	},
	{
		id: "pharma-ml",
		title: "Pharma ML Prediction",
		type: "Machine Learning",
		thumbnail: "/assets/images/projects/pharma-thumbnail.webp",
		description:
			"Drug dosage recommendation system utilizing linear regression models.",
		technologies: ["Python", "Pandas", "Scikit-Learn"],
		liveUrl: null,
		repoUrl: null,
		featured: false,
	},
];
