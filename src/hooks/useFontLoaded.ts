"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect when specific fonts are loaded
 * @param fonts Array of font family names to check
 * @returns boolean indicating if all fonts are loaded
 */
export function useFontLoaded(fonts: string[]): boolean {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined" || !("fonts" in document)) {
			// Fallback for browsers that don't support document.fonts
			setLoaded(true);
			return;
		}

		const checkFonts = async () => {
			try {
				// Wait for document.fonts.ready first
				await document.fonts.ready;

				// Additional check for specific fonts
				const fontChecks = fonts.map((font) => {
					const check1 = document.fonts.check(`12px "${font}"`);
					const check2 = document.fonts.check(`500 12px "${font}"`);
					const check3 = document.fonts.check(`600 12px "${font}"`);
					return check1 || check2 || check3;
				});

				if (fontChecks.every(Boolean)) {
					setLoaded(true);
				} else {
					// Try to force load
					await Promise.all(
						fonts.flatMap((font) => [
							document.fonts.load(`12px "${font}"`),
							document.fonts.load(`500 12px "${font}"`),
							document.fonts.load(`600 12px "${font}"`),
						])
					);
					setLoaded(true);
				}
			} catch (error) {
				console.warn("Font loading check failed:", error);
				// Fallback: set loaded to true after short delay
				setTimeout(() => setLoaded(true), 500);
			}
		};

		checkFonts();
	}, [fonts]);

	return loaded;
}
