export interface Skill {
	name: string;
	icon: string;
	category: string;
}

export const skillsData: Skill[] = [
	// Programming
	{
		name: "JavaScript",
		icon: "/assets/icons/javascript.webp",
		category: "Programming",
	},
	{
		name: "TypeScript",
		icon: "/assets/icons/typescript.webp",
		category: "Programming",
	},
	{ name: "C++", icon: "/assets/icons/c++.webp", category: "Programming" },
	{
		name: "Python",
		icon: "/assets/icons/python.webp",
		category: "Programming",
	},
	{ name: "Go", icon: "/assets/icons/golang.webp", category: "Programming" },
	{ name: "Dart", icon: "/assets/icons/dart.webp", category: "Programming" },

	// Web Development
	{ name: "React", icon: "/assets/icons/reactjs.webp", category: "Web" },
	{ name: "Next.js", icon: "/next.svg", category: "Web" },
	{ name: "HTML5", icon: "/assets/icons/html5.webp", category: "Web" },
	{ name: "CSS3", icon: "/assets/icons/css3.webp", category: "Web" },
	{ name: "Tailwind", icon: "/assets/icons/tailwind.webp", category: "Web" },
	{ name: "Node.js", icon: "/assets/icons/nodejs.webp", category: "Web" },

	// Backend
	{ name: "Laravel", icon: "/assets/icons/laravel.webp", category: "Backend" },
	{ name: "Gin", icon: "/assets/icons/gin.webp", category: "Backend" },
	{ name: "FastAPI", icon: "/assets/icons/fastapi.webp", category: "Backend" },

	// Data & Analytics
	{ name: "MySQL", icon: "/assets/icons/mysql.webp", category: "Database" },
	{
		name: "PostgreSQL",
		icon: "/assets/icons/postgresql.webp",
		category: "Database",
	},
	{ name: "MongoDB", icon: "/assets/icons/mongodb.webp", category: "Database" },
	{ name: "Redis", icon: "/assets/icons/redis.webp", category: "Database" },

	// DevOps & Tools
	{ name: "Docker", icon: "/assets/icons/docker.webp", category: "DevOps" },
	{ name: "Git", icon: "/assets/icons/git.webp", category: "DevOps" },
	{ name: "Figma", icon: "/assets/icons/figma.webp", category: "Tools" },
	{ name: "Postman", icon: "/assets/icons/postman.webp", category: "Tools" },
];

export const skillCategories = [
	"Programming",
	"Web",
	"Backend",
	"Database",
	"DevOps",
	"Tools",
];
