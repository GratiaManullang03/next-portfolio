"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { skillsData, Skill } from "@/data/skills";

// Menghitung posisi titik pada bola (Fibonacci Sphere Algorithm)
const getPositions = (count: number, radius: number) => {
	const positions: THREE.Vector3[] = [];
	const phi = Math.PI * (3 - Math.sqrt(5));

	for (let i = 0; i < count; i++) {
		const y = 1 - (i / (count - 1)) * 2;
		const radiusAtY = Math.sqrt(1 - y * y);
		const theta = phi * i;

		const x = Math.cos(theta) * radiusAtY;
		const z = Math.sin(theta) * radiusAtY;

		positions.push(new THREE.Vector3(x * radius, y * radius, z * radius));
	}
	return positions;
};

// Komponen untuk Node (Icon Skill)
const SkillNode = ({
	position,
	skill,
	onClick,
}: {
	position: THREE.Vector3;
	skill: Skill;
	onClick: (skill: Skill) => void;
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<group position={position}>
			{/* Visual Dot di 3D space */}
			<mesh
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={() => onClick(skill)}
			>
				<sphereGeometry args={[0.2, 16, 16]} />
				<meshStandardMaterial
					color={hovered ? "#a855f7" : "#6b7280"}
					emissive={hovered ? "#a855f7" : "#000000"}
					emissiveIntensity={hovered ? 2 : 0}
				/>
			</mesh>

			{/* HTML Label / Icon yang melayang */}
			<Html
				distanceFactor={12}
				position={[0, 0, 0]}
				transform
				sprite
				style={{ pointerEvents: "none" }}
			>
				<div
					className={`flex flex-col items-center transition-all duration-300 ${
						hovered ? "scale-125 z-50" : "opacity-80 scale-100"
					}`}
				>
					<div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
						{/* Menggunakan img tag biasa karena di dalam Canvas */}
						<img
							src={skill.icon}
							alt={skill.name}
							className="w-full h-full object-contain"
						/>
					</div>
					<div
						className={`mt-2 px-2 py-1 rounded bg-black/80 border border-purple-500/30 text-xs font-mono text-purple-200 whitespace-nowrap transition-opacity ${
							hovered ? "opacity-100" : "opacity-0"
						}`}
					>
						{skill.name}
					</div>
				</div>
			</Html>
		</group>
	);
};

// Komponen Group Utama yang berputar
const RotatingGroup = ({
	onSkillClick,
}: {
	onSkillClick: (skill: Skill) => void;
}) => {
	const groupRef = useRef<THREE.Group>(null);
	const radius = 6;
	const positions = useMemo(() => getPositions(skillsData.length, radius), []);

	// Membuat koneksi garis antar node yang berdekatan
	const connections = useMemo(() => {
		const lines: [THREE.Vector3, THREE.Vector3][] = [];
		positions.forEach((pos1, i) => {
			positions.forEach((pos2, j) => {
				if (i < j) {
					const dist = pos1.distanceTo(pos2);
					// Jika jarak cukup dekat, buat garis
					if (dist < 3.5) {
						lines.push([pos1, pos2]);
					}
				}
			});
		});
		return lines;
	}, [positions]);

	useFrame((state, delta) => {
		if (groupRef.current) {
			// Rotasi otomatis pelan
			groupRef.current.rotation.y += delta * 0.1;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Render Garis Koneksi */}
			{connections.map((line, i) => (
				<Line
					key={i}
					points={line}
					color="#4b5563"
					transparent
					opacity={0.2}
					lineWidth={1}
				/>
			))}

			{/* Render Node Skills */}
			{skillsData.map((skill, i) => (
				<SkillNode
					key={i}
					position={positions[i]}
					skill={skill}
					onClick={onSkillClick}
				/>
			))}
		</group>
	);
};

interface SkillsGlobeProps {
	onSkillSelect: (skill: Skill) => void;
}

export default function SkillsGlobe({ onSkillSelect }: SkillsGlobeProps) {
	return (
		<div className="w-full h-full absolute inset-0 z-0 cursor-move">
			<Canvas
				camera={{ position: [0, 0, 14], fov: 45 }}
				gl={{ antialias: true, alpha: true }}
			>
				<ambientLight intensity={1.5} />
				<pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
				<pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

				<RotatingGroup onSkillClick={onSkillSelect} />

				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate={false}
					rotateSpeed={0.5}
					dampingFactor={0.1}
				/>
			</Canvas>
		</div>
	);
}
