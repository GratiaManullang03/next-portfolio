// src/utils/techIcons.ts

// Map nama teknologi dari data ke file icon di public/assets/icons
const iconMap: Record<string, string> = {
	React: "reactjs.webp",
	"Next.js": "next.svg",
	TypeScript: "typescript.webp",
	"Tailwind CSS": "tailwind.webp",
	TailwindCSS: "tailwind.webp",
	Vite: "vite.svg",
	Laravel: "laravel.webp",
	PHP: "php.webp",
	MySQL: "mysql.webp",
	Bootstrap: "bootstrap.webp",
	Go: "golang.webp",
	"Go (Golang)": "golang.webp",
	Redis: "redis.webp",
	PostgreSQL: "postgresql.webp",
	Docker: "docker.webp",
	Python: "python.webp",
	Flutter: "flutter.webp",
	Dart: "dart.webp",
	MongoDB: "mongodb.webp",
	Firebase: "firebase.webp",
	"C#": "csharp.webp",
	"ASP.NET": "aspnet.webp",
	"C++": "c++.webp",
	Odoo: "odoo.webp",
	Figma: "figma.webp",
	Gin: "gin.webp",
	Git: "git.webp",
	"NATS JetStream": "nats.webp",
	k6: "k6.webp",
	Swagger: "swagger.webp",
	SketchUp: "sketchup.webp",
	FlexSim: "flexsim.webp",
	"IBM SPSS": "ibm-spss.webp",
	R: "r.webp",
	"Hugging Face": "huggingface.webp",
	"HTML/CSS": "html5.webp",
	JavaScript: "javascript.webp",
	jQuery: "jquery.webp",
	SweetAlert2: "javascript.webp",
};

// [NEW] Export ini yang dicari sama SkillsGlobe.tsx
// Kita convert object di atas jadi Array of Objects
export const techIcons = Object.entries(iconMap).map(([name, path]) => ({
	name,
	icon: path.endsWith(".svg") ? `/${path}` : `/assets/icons/${path}`,
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
