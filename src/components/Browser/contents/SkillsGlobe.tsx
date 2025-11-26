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

	const skillsData: SkillNode[] = useMemo(() => {
		const phi = Math.PI * (3 - Math.sqrt(5));
		// Type explicit di sini fix error "tech implicitly any"
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

	useEffect(() => {
		if (globeEl.current) {
			globeEl.current.controls().autoRotate = true;
			globeEl.current.controls().autoRotateSpeed = 0.8;

			const altitude = isMobile ? 3.5 : 2.5;
			globeEl.current.pointOfView({ lat: 20, lng: 0, altitude }, 1000);
			globeEl.current.controls().enableZoom = !isMobile;
		}
	}, [isMobile, dimensions]);

	return (
		<div
			ref={containerRef}
			className="w-full h-full flex items-center justify-center bg-black cursor-move"
		>
			{dimensions.width > 0 && (
				<Globe
					ref={globeEl}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="rgba(0,0,0,0)"
					globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
					bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
					showAtmosphere={true}
					atmosphereColor="#4ade80"
					atmosphereAltitude={0.15}
					htmlElementsData={skillsData}
					htmlElement={(d: any) => {
						const el = document.createElement("div");
						el.style.width = isMobile ? "30px" : "50px";
						el.style.height = isMobile ? "30px" : "50px";
						el.style.display = "flex";
						el.style.alignItems = "center";
						el.style.justifyContent = "center";
						el.style.background = "rgba(0, 20, 0, 0.8)";
						el.style.borderRadius = "50%";
						el.style.border = "1px solid #22c55e";
						el.style.boxShadow = "0 0 10px rgba(34, 197, 94, 0.3)";
						el.style.cursor = "pointer";
						el.style.transition = "all 0.3s ease";

						const img = document.createElement("img");
						img.src = d.icon;
						img.style.width = "60%";
						img.style.height = "60%";
						img.style.objectFit = "contain";

						el.appendChild(img);

						el.onmouseenter = () => {
							el.style.transform = "scale(1.2)";
							el.style.borderColor = "#fff";
							el.style.zIndex = "10";
						};
						el.onmouseleave = () => {
							el.style.transform = "scale(1)";
							el.style.borderColor = "#22c55e";
							el.style.zIndex = "1";
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
