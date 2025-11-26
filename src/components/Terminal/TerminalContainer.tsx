import React from "react";

interface TerminalContainerProps {
	children: React.ReactNode;
}

export default function TerminalContainer({
	children,
}: TerminalContainerProps) {
	return (
		<div className="w-[60vw] h-[60vh] bg-[#121212] rounded-xl border border-[#222] overflow-hidden pb-[35px] shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
			{children}
		</div>
	);
}
