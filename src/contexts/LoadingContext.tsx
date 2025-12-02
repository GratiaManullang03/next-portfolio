"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
	isTerminalReady: boolean;
	setTerminalReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
	const [isTerminalReady, setTerminalReady] = useState(false);

	return (
		<LoadingContext.Provider value={{ isTerminalReady, setTerminalReady }}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within LoadingProvider");
	}
	return context;
}
