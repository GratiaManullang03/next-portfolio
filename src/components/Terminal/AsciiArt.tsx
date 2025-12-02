"use client";

import dynamic from "next/dynamic";
import { useLoading } from "@/contexts/LoadingContext";

const ASCIIText = dynamic(() => import("../ui/ASCIIText"), { ssr: false });

export default function AsciiArt() {
	const { setTerminalReady } = useLoading();

	const handleAsciiReady = () => {
		setTerminalReady(true);
	};

	return (
		<div className="relative w-full h-[120px] mb-[10px]">
			<ASCIIText
				text="GRAXYA"
				asciiFontSize={5}
				textFontSize={400}
				textColor="#a855f7"
				planeBaseHeight={10}
				enableWaves={true}
				onReady={handleAsciiReady}
			/>
		</div>
	);
}
