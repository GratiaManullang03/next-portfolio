import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface UseLenisOptions {
	duration?: number;
	easing?: (t: number) => number;
	orientation?: "vertical" | "horizontal";
	gestureOrientation?: "vertical" | "horizontal" | "both";
	smoothWheel?: boolean;
	syncTouch?: boolean;
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
	const rafIdRef = useRef<number | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Destroy previous instance if exists
		if (lenisRef.current) {
			lenisRef.current.destroy();
		}

		const lenis = new Lenis({
			wrapper: containerRef.current,
			content: containerRef.current.firstElementChild as HTMLElement,
			duration: options.duration ?? 1.2,
			easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
			orientation: options.orientation ?? "vertical",
			gestureOrientation: options.gestureOrientation ?? "vertical",
			smoothWheel: options.smoothWheel ?? true,
			syncTouch: options.syncTouch ?? false,
			wheelMultiplier: options.wheelMultiplier ?? 1,
			touchMultiplier: options.touchMultiplier ?? 2,
			infinite: options.infinite ?? false,
			autoResize: options.autoResize ?? true,
		});

		lenisRef.current = lenis;

		function raf(time: number) {
			lenis.raf(time);
			rafIdRef.current = requestAnimationFrame(raf);
		}

		rafIdRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [
		containerRef,
		options.duration,
		options.smoothWheel,
		options.wheelMultiplier,
		options.touchMultiplier,
	]);

	return lenisRef;
}
