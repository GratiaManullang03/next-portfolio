"use client";

import { motion } from "framer-motion";

interface ShuffleTextProps {
	text: string;
	className?: string;
	targetClassName?: string;
}

const DURATION = 0.25;
const STAGGER = 0.025;

export default function ShuffleText({
	text,
	className = "",
	targetClassName = "",
}: ShuffleTextProps) {
	return (
		<motion.div
			// Key penting agar animasi ulang saat text berubah
			key={text}
			initial="initial"
			animate="animate"
			className={`relative block overflow-hidden whitespace-nowrap leading-[1] font-black uppercase ${className}`}
			style={{ lineHeight: 0.9 }}
		>
			<div className="relative inline-block">
				{text.split("").map((l, i) => (
					<motion.span
						variants={{
							initial: { y: "100%" },
							animate: { y: 0 },
						}}
						transition={{
							duration: DURATION,
							ease: "circOut",
							delay: STAGGER * i,
						}}
						className={`inline-block ${targetClassName}`}
						key={i}
					>
						{l === " " ? "\u00A0" : l}
					</motion.span>
				))}
			</div>
		</motion.div>
	);
}
