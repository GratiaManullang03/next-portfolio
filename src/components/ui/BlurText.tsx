"use client";

import { motion, Variants } from "framer-motion";

interface BlurTextProps {
	text: string;
	className?: string;
	delay?: number;
}

export default function BlurText({
	text,
	className = "",
	delay = 0,
}: BlurTextProps) {
	const words = text.split(" ");

	// FIX: Menambahkan tipe ': Variants' agar properti transition dikenali dengan benar
	const container: Variants = {
		hidden: { opacity: 0 },
		visible: (i: number = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: delay * i },
		}),
	};

	// FIX: Menambahkan tipe ': Variants'
	const child: Variants = {
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			filter: "blur(20px)",
			y: 20,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
			variants={container}
			initial="hidden"
			animate="visible"
			className={className}
		>
			{words.map((word, index) => (
				<motion.span
					variants={child}
					style={{ marginRight: "0.25em", display: "inline-block" }}
					key={index}
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
}
