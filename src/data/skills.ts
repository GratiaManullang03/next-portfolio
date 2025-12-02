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
	{
		name: "C++",
		icon: "/assets/icons/c++.webp",
		category: "Programming",
	},
	{
		name: "C#",
		icon: "/assets/icons/csharp.webp",
		category: "Programming",
	},
	{
		name: "Python",
		icon: "/assets/icons/python.webp",
		category: "Programming",
	},
	{
		name: "Go",
		icon: "/assets/icons/golang.webp",
		category: "Programming",
	},
	{
		name: "Dart",
		icon: "/assets/icons/dart.webp",
		category: "Programming",
	},
	{
		name: "R",
		icon: "/assets/icons/r.webp",
		category: "Programming",
	},

	// Web Development
	{
		name: "React",
		icon: "/assets/icons/reactjs.webp",
		category: "Web",
	},
	{
		name: "Next.js",
		icon: "/next.svg",
		category: "Web",
	},
	{
		name: "HTML5",
		icon: "/assets/icons/html5.webp",
		category: "Web",
	},
	{
		name: "CSS3",
		icon: "/assets/icons/css3.webp",
		category: "Web",
	},
	{
		name: "Tailwind",
		icon: "/assets/icons/tailwind.webp",
		category: "Web",
	},
	{
		name: "Bootstrap",
		icon: "/assets/icons/bootstrap.webp",
		category: "Web",
	},
	{
		name: "Node.js",
		icon: "/assets/icons/nodejs.webp",
		category: "Web",
	},

	// Mobile Development
	{
		name: "Flutter",
		icon: "/assets/icons/flutter.webp",
		category: "Mobile",
	},

	// Backend
	{
		name: "Laravel",
		icon: "/assets/icons/laravel.webp",
		category: "Backend",
	},
	{
		name: "Gin",
		icon: "/assets/icons/gin.webp",
		category: "Backend",
	},
	{
		name: "FastAPI",
		icon: "/assets/icons/fastapi.webp",
		category: "Backend",
	},
	{
		name: "Flask",
		icon: "/assets/icons/flask.webp",
		category: "Backend",
	},
	{
		name: "ASP.NET",
		icon: "/assets/icons/aspnet.webp",
		category: "Backend",
	},
	{
		name: "Frappe",
		icon: "/assets/icons/frappe.webp",
		category: "Backend",
	},

	// Database
	{
		name: "MySQL",
		icon: "/assets/icons/mysql.webp",
		category: "Database",
	},
	{
		name: "PostgreSQL",
		icon: "/assets/icons/postgresql.webp",
		category: "Database",
	},
	{
		name: "MongoDB",
		icon: "/assets/icons/mongodb.webp",
		category: "Database",
	},
	{
		name: "Redis",
		icon: "/assets/icons/redis.webp",
		category: "Database",
	},
	{
		name: "Firebase",
		icon: "/assets/icons/firebase.webp",
		category: "Database",
	},
	{
		name: "pgvector",
		icon: "/assets/icons/postgresql.webp",
		category: "Database",
	},

	// DevOps
	{
		name: "Docker",
		icon: "/assets/icons/docker.webp",
		category: "DevOps",
	},
	{
		name: "Git",
		icon: "/assets/icons/git.webp",
		category: "DevOps",
	},
	{
		name: "Nats Jetstream",
		icon: "/assets/icons/nats.webp",
		category: "DevOps",
	},
	{
		name: "K6",
		icon: "/assets/icons/k6.webp",
		category: "DevOps",
	},

	// Tools & AI
	{
		name: "Figma",
		icon: "/assets/icons/figma.webp",
		category: "Tools",
	},
	{
		name: "Postman",
		icon: "/assets/icons/postman.webp",
		category: "Tools",
	},
	{
		name: "Swagger",
		icon: "/assets/icons/swagger.webp",
		category: "Tools",
	},
	{
		name: "Odoo",
		icon: "/assets/icons/odoo.webp",
		category: "Tools",
	},
	{
		name: "Hugging Face",
		icon: "/assets/icons/huggingface.webp",
		category: "AI & Data",
	},
];

export const skillCategories = [
	"Programming",
	"Web",
	"Mobile",
	"Backend",
	"Database",
	"DevOps",
	"AI & Data",
	"Tools",
];
