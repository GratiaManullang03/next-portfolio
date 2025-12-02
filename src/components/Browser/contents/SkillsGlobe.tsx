import { useEffect, useState, useRef, useMemo } from "react";
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
			className="w-full h-full flex items-center justify-center bg-black relative"
			style={{ cursor: "grab" }}
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
						// Responsive Size - lebih kecil di idle state
						const idleSize = isMobile ? "30px" : "40px";
						const hoverSize = isMobile ? "45px" : "65px";

						el.style.width = idleSize;
						el.style.height = idleSize;
						el.style.display = "flex";
						el.style.alignItems = "center";
						el.style.justifyContent = "center";
						el.style.position = "relative";

						// Glassmorphism Icon Container
						el.style.background = "rgba(0, 20, 0, 0.6)";
						el.style.backdropFilter = "blur(4px)";
						el.style.borderRadius = "50%";
						el.style.border = "1px solid rgba(74, 222, 128, 0.3)";
						el.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.1)";
						el.style.cursor = "pointer";
						el.style.pointerEvents = "auto";
						el.style.zIndex = "1";
						el.style.transition =
							"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

						const img = document.createElement("img");
						img.src = d.icon;
						img.style.width = "55%";
						img.style.height = "55%";
						img.style.objectFit = "contain";
						img.style.position = "absolute";
						img.style.top = "50%";
						img.style.left = "50%";
						img.style.transform = "translate(-50%, -50%)";
						// BLACK & WHITE by default - warna asli pas hover
						img.style.filter = "grayscale(100%) brightness(0.8)";
						img.style.transition = "filter 0.3s ease";
						img.style.pointerEvents = "none"; // Prevent img from blocking hover

						el.appendChild(img);

						// Label nama skill (hidden by default)
						const label = document.createElement("div");
						label.textContent = d.name;
						label.style.position = "absolute";
						label.style.bottom = "-25px";
						label.style.left = "50%";
						label.style.transform = "translateX(-50%)";
						label.style.whiteSpace = "nowrap";
						label.style.fontSize = isMobile ? "9px" : "11px";
						label.style.fontWeight = "600";
						label.style.color = "#4ade80";
						label.style.background = "rgba(0, 0, 0, 0.9)";
						label.style.padding = "3px 8px";
						label.style.borderRadius = "4px";
						label.style.border = "1px solid rgba(74, 222, 128, 0.5)";
						label.style.opacity = "0";
						label.style.pointerEvents = "none";
						label.style.transition = "opacity 0.3s ease, bottom 0.3s ease";
						label.style.fontFamily = "monospace";
						label.style.letterSpacing = "0.5px";
						label.style.zIndex = "100";

						el.appendChild(label);

						// Interaction
						el.onmouseenter = (e) => {
							e.stopPropagation();

							// Icon container zoom
							el.style.width = hoverSize;
							el.style.height = hoverSize;
							el.style.borderColor = "#4ade80";
							el.style.boxShadow = "0 0 25px rgba(74, 222, 128, 0.8)";
							el.style.zIndex = "999";
							el.style.background = "rgba(0, 30, 0, 0.95)";
							el.style.cursor = "pointer";

							// Kembalikan warna asli icon
							img.style.filter = "grayscale(0%) brightness(1)";

							// Show label
							label.style.opacity = "1";
							label.style.bottom = "-30px";

							// Pause rotation on hover
							if (globeEl.current) {
								globeEl.current.controls().autoRotate = false;
							}
						};

						el.onmouseleave = (e) => {
							e.stopPropagation();

							// Reset ke idle size
							el.style.width = idleSize;
							el.style.height = idleSize;
							el.style.borderColor = "rgba(74, 222, 128, 0.3)";
							el.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.1)";
							el.style.zIndex = "1";
							el.style.background = "rgba(0, 20, 0, 0.6)";

							// Back to grayscale
							img.style.filter = "grayscale(100%) brightness(0.8)";

							// Hide label
							label.style.opacity = "0";
							label.style.bottom = "-25px";

							if (globeEl.current) {
								globeEl.current.controls().autoRotate = true;
							}
						};

						return el;
					}}
				/>
			)}
		</div>
	);
};

export default SkillsGlobe;
