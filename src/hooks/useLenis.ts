import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface UseLenisOptions {
	duration?: number;
	easing?: (t: number) => number;
	orientation?: "vertical" | "horizontal";
	gestureOrientation?: "vertical" | "horizontal" | "both";
	smoothWheel?: boolean;
	smoothTouch?: boolean;
	wheelMultiplier?: number;
	touchMultiplier?: number;
	infinite?: boolean;
	autoResize?: boolean;
}

export function useLenis(
	containerRef: React.RefObject<HTMLElement | null>,
	options: UseLenisOptions = {}
) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const lenis = new Lenis({
			wrapper: containerRef.current,
			content: containerRef.current.firstElementChild as HTMLElement,
			duration: options.duration ?? 1.2,
			easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
			orientation: options.orientation ?? "vertical",
			gestureOrientation: options.gestureOrientation ?? "vertical",
			smoothWheel: options.smoothWheel ?? true,
			smoothTouch: options.smoothTouch ?? false,
			wheelMultiplier: options.wheelMultiplier ?? 1,
			touchMultiplier: options.touchMultiplier ?? 2,
			infinite: options.infinite ?? false,
			autoResize: options.autoResize ?? true,
		});

		lenisRef.current = lenis;

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [containerRef, options]);

	return lenisRef;
}
