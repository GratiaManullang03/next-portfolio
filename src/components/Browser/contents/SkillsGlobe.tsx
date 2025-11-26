import React, { useEffect, useState, useRef, useMemo } from "react";
// @ts-ignore - Ignore type check if declaration file is missing locally
import Globe, { GlobeMethods } from "react-globe.gl";
import { techIcons } from "@/utils/techIcons";

interface SkillNode {
	id: string;
	lat: number;
	lng: number;
	icon: string;
	name: string;
	size: number;
}

const SkillsGlobe = () => {
	const globeEl = useRef<GlobeMethods | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [isMobile, setIsMobile] = useState(false);

	// 1. Data Skills (Icon positions)
	const skillsData: SkillNode[] = useMemo(() => {
		const phi = Math.PI * (3 - Math.sqrt(5));
		return techIcons.map(
			(tech: { name: string; icon: string }, index: number) => {
				const y = 1 - (index / (techIcons.length - 1)) * 2;
				const radius = Math.sqrt(1 - y * y);
				const theta = phi * index;

				return {
					id: tech.name,
					lat: Math.asin(y) * (180 / Math.PI),
					lng: theta * (180 / Math.PI),
					icon: tech.icon,
					name: tech.name,
					size: 30,
				};
			}
		);
	}, []);

	// 2. Data Rings (Efek berdenyut acak biar kayak server aktif)
	const [ringsData, setRingsData] = useState<any[]>([]);

	useEffect(() => {
		// Generate random signal pulses
		const interval = setInterval(() => {
			const randomTech =
				skillsData[Math.floor(Math.random() * skillsData.length)];
			const newRing = {
				lat: randomTech.lat,
				lng: randomTech.lng,
				maxR: 5 + Math.random() * 5, // Random radius
				propagationSpeed: 2 + Math.random() * 2,
				repeatPeriod: 800 + Math.random() * 1000,
			};

			// Keep only last 5 rings to prevent lag
			setRingsData((prev) => [...prev.slice(-4), newRing]);
		}, 2000);

		return () => clearInterval(interval);
	}, [skillsData]);

	// 3. Resize Handler
	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				setDimensions({
					width: containerRef.current.clientWidth,
					height: containerRef.current.clientHeight,
				});
				setIsMobile(window.innerWidth < 768);
			}
		};

		updateDimensions();
		const resizeObserver = new ResizeObserver(() => {
			updateDimensions();
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	// 4. Initial Globe Settings
	useEffect(() => {
		if (globeEl.current) {
			// Auto rotate smooth
			globeEl.current.controls().autoRotate = true;
			globeEl.current.controls().autoRotateSpeed = 0.6;
			globeEl.current.controls().enableZoom = !isMobile;

			// Adjust camera distance
			const altitude = isMobile ? 3.0 : 2.5;
			globeEl.current.pointOfView({ lat: 10, lng: 0, altitude }, 1000);
		}
	}, [isMobile, dimensions]);

	return (
		<div
			ref={containerRef}
			className="w-full h-full flex items-center justify-center bg-black cursor-move relative"
		>
			{/* Background Grid Decoration (Optional subtle background) */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black pointer-events-none" />

			{dimensions.width > 0 && (
				<Globe
					ref={globeEl}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="rgba(0,0,0,0)"
					// --- VISUAL SETUP: WIREFRAME SPHERE ---
					globeImageUrl={null} // HAPUS TEXTURE BUMI
					bumpImageUrl={null} // HAPUS TEXTURE BUMI
					// Tampilkan Grid/Jaring sebagai bentuk bola
					showGraticules={true}
					showGlobe={false} // Hide solid core, show only grid & atmosphere
					// Styling Atmosphere (Glow Pinggiran)
					showAtmosphere={true}
					atmosphereColor="#22c55e" // Green glow
					atmosphereAltitude={0.15}
					// --- RINGS ANIMATION (Cyber Effect) ---
					ringsData={ringsData}
					ringColor={() => (t: number) => `rgba(34, 197, 94, ${1 - t})`}
					ringMaxRadius="maxR"
					ringPropagationSpeed="propagationSpeed"
					ringRepeatPeriod="repeatPeriod"
					// --- ICONS ---
					htmlElementsData={skillsData}
					htmlElement={(d: any) => {
						const el = document.createElement("div");
						// Responsive Size
						const size = isMobile ? "35px" : "55px";

						el.style.width = size;
						el.style.height = size;
						el.style.display = "flex";
						el.style.alignItems = "center";
						el.style.justifyContent = "center";
						el.style.position = "relative";

						// Glassmorphism Icon Container
						el.style.background = "rgba(0, 20, 0, 0.6)"; // Darker semi-transparent
						el.style.backdropFilter = "blur(4px)";
						el.style.borderRadius = "50%";
						el.style.border = "1px solid rgba(74, 222, 128, 0.3)"; // Subtle border
						el.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.1)"; // Faint glow
						el.style.cursor = "pointer";
						el.style.transition =
							"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // Bouncy transition

						const img = document.createElement("img");
						img.src = d.icon;
						img.style.width = "55%";
						img.style.height = "55%";
						img.style.objectFit = "contain";
						img.style.position = "absolute";
						img.style.top = "50%";
						img.style.left = "50%";
						img.style.transform = "translate(-50%, -50%)";
						// Opsional: Bikin icon jadi agak putih/grayscale biar seragam
						// img.style.filter = "grayscale(100%) brightness(1.5)";

						el.appendChild(img);

						// Interaction
						el.onmouseenter = () => {
							el.style.transform = "scale(1.3)";
							el.style.borderColor = "#4ade80"; // Brighter green
							el.style.boxShadow = "0 0 20px rgba(74, 222, 128, 0.6)";
							el.style.zIndex = "10";
							el.style.background = "rgba(0, 30, 0, 0.9)";

							// Pause rotation on hover (optional)
							if (globeEl.current) {
								globeEl.current.controls().autoRotate = false;
							}
						};

						el.onmouseleave = () => {
							el.style.transform = "scale(1)";
							el.style.borderColor = "rgba(74, 222, 128, 0.3)";
							el.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.1)";
							el.style.zIndex = "1";
							el.style.background = "rgba(0, 20, 0, 0.6)";

							if (globeEl.current) {
								globeEl.current.controls().autoRotate = true;
							}
						};

						el.title = d.name;
						return el;
					}}
				/>
			)}
		</div>
	);
};

export default SkillsGlobe;
