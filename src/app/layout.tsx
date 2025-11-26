import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
	display: "swap",
	fallback: ["monospace"],
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
				className={`${firaCode.variable} antialiased font-mono bg-[#1e1e1e] text-white overflow-hidden`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
