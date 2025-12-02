"use client";

import { useEffect, useState, useRef } from "react";

// Karakter yang akan muncul saat efek acak (scramble)
const CYBER_CHARS =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,./<>?";

interface HackerScrambleProps {
	text: string;
	className?: string;
	speed?: number; // Kecepatan reveal (ms per karakter)
	scrambleSpeed?: number; // Kecepatan ganti karakter acak (ms)
}

export default function HackerScramble({
	text,
	className = "",
	speed = 40,
	scrambleSpeed = 30,
}: HackerScrambleProps) {
	const [displayText, setDisplayText] = useState(text);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		let iteration = 0;
		const maxIterations = text.length;

		clearInterval(intervalRef.current as NodeJS.Timeout);

		intervalRef.current = setInterval(() => {
			setDisplayText((prev) =>
				text
					.split("")
					.map((letter, index) => {
						// Jika index karakter kurang dari iterasi saat ini, tampilkan huruf asli
						if (index < iteration) {
							return text[index];
						}
						// Jika tidak, tampilkan karakter acak
						return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
					})
					.join("")
			);

			// Kenaikan iterasi (makin kecil angkanya, makin lambat reveal-nya)
			// Kita pakai pecahan agar scramble-nya berjalan beberapa kali sebelum huruf terkunci
			iteration += 1 / 3;

			if (iteration >= maxIterations) {
				clearInterval(intervalRef.current as NodeJS.Timeout);
				setDisplayText(text); // Pastikan teks akhir bersih
			}
		}, scrambleSpeed);

		return () => clearInterval(intervalRef.current as NodeJS.Timeout);
	}, [text, speed, scrambleSpeed]);

	// Kita render sebagai span dengan styling khusus untuk karakter yang belum 'solve'
	// Tapi karena React re-render string, kita bisa inject logic pewarnaan di sini jika mau
	// Untuk performa terbaik di teks panjang, kita render string langsung,
	// tapi kita bisa manipulasi split untuk styling warna berbeda (opsional).
	// Di sini saya buat versi plain text string agar layout stabil, tapi efeknya tetap terlihat.

	return (
		<span className={`${className} inline-block font-mono`}>
			{displayText.split("").map((char, i) => {
				const isSolved = i < text.length && char === text[i];
				// Logika visual: Karakter yang belum "jadi" (scrambled) diberi warna beda & opacity
				// Kita cek apakah char saat ini sama dengan char target di posisi yang sama
				// Note: Logic simple ini mungkin flicker jika random char kebetulan sama dengan target,
				// tapi itu justru menambah efek glitch natural.
				const isFinalChar = char === text[i];

				return (
					<span
						key={i}
						className={
							isFinalChar
								? "text-white" // Warna Final
								: "text-cyan-500/70 opacity-80" // Warna Scramble (Glitchy)
						}
					>
						{char}
					</span>
				);
			})}
		</span>
	);
}
