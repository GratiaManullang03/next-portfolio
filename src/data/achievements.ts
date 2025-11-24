export interface Achievement {
	id: string;
	title: string;
	category: "award" | "certification";
	issuer: string;
	date: string;
	description: string;
	thumbnail: string; // Path ke gambar di public/assets
	credentialUrl?: string; // Link ke sertifikat asli
	rank?: string; // e.g., "1st Place", "Finalist"
}

export const achievementsData: Achievement[] = [
	{
		id: "podcast-comp-2023",
		title: "1st Runner Up Podcast Competition",
		category: "award",
		issuer: "Politeknik Swasta Indonesia (PELITA)",
		date: "2023",
		description:
			"Achieved 2nd place in the national level podcast competition, demonstrating public speaking and content creation skills.",
		thumbnail: "/assets/images/certificates/podcast-competition-thumbnail.webp",
		credentialUrl: "/assets/certificates/podcast-competition-certificate.pdf",
		rank: "1st Runner Up",
	},
	{
		id: "business-plan-2023",
		title: "National Business Plan Competition",
		category: "award",
		issuer: "National Level",
		date: "2023",
		description:
			'Participated as part of team "SquidWork". Developed a comprehensive business strategy and financial projection model.',
		thumbnail: "/assets/images/projects/saga-thumbnail.webp", // Placeholder/Related image
		credentialUrl: undefined,
		rank: "Finalist",
	},
	{
		id: "samsung-innovation",
		title: "Samsung Innovation Campus Batch 5",
		category: "certification",
		issuer: "Samsung Electronics Indonesia",
		date: "2023/2024",
		description:
			"Completed intensive training in IoT, Coding, and Programming. Developed practical solutions for real-world problems.",
		thumbnail: "/assets/images/certificates/samsung-innovation-thumbnail.webp",
		credentialUrl: "/assets/certificates/samsung-innovation-certificate.pdf",
		rank: "Graduate",
	},
	{
		id: "dqlab-datascience",
		title: "Data Science Bootcamp",
		category: "certification",
		issuer: "DQLab",
		date: "2023",
		description:
			"Mastered fundamental concepts of Data Science using R, Python, and SQL for data analysis and visualization.",
		thumbnail: "/assets/images/certificates/dqlab-ds-thumbnail.webp",
		credentialUrl: "/assets/certificates/dqlab-ds-certificate.pdf",
	},
	{
		id: "frappe-framework",
		title: "Frappe Framework Certification",
		category: "certification",
		issuer: "Frappe School",
		date: "2024",
		description:
			"Certified proficiency in building web applications using Frappe Framework and Python.",
		thumbnail: "/assets/images/certificates/frappe-bootcamp-thumbnail.webp",
		credentialUrl: "/assets/certificates/frappe-bootcamp-certificate.pdf",
	},
	{
		id: "inauguration-chair",
		title: "Certificate of Appreciation",
		category: "award",
		issuer: "Polytechnic Multimedia Nusantara",
		date: "2024",
		description:
			"Awarded for exceptional leadership and dedication as the Chairman of Inaugurasi 2024.",
		thumbnail: "/assets/images/certificates/inauguration-thumbnail.webp",
		credentialUrl: "/assets/certificates/inauguration-certificate.pdf",
		rank: "Chairman",
	},
];
