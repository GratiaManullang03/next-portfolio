import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
	display: "block",
	fallback: ["monospace"],
});

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["500", "600"],
	variable: "--font-ibm-plex-mono",
	display: "block",
	fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
	title: "Terminal Portfolio",
	description: "A terminal-style portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${firaCode.variable} ${ibmPlexMono.variable} antialiased font-mono bg-[#1e1e1e] text-white overflow-hidden`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
