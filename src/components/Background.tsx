'use client';

import { useEffect, useRef } from 'react';

interface Ripple {
    x: number;
    y: number;
    radius: number;
    lifespan: number;
    age: number;
}

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const config = {
            tileSize: 30,
            gap: 2,
            baseRadius: 150,
            maxRadius: 400,
            baseColor: '#08080a',
            rippleColor: '#00f7ff',
            smoothness: 0.1,
            noiseSpeed: 0.008,
        };

        let width: number, height: number, cols: number, rows: number;
        let mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };
        let cursor = { x: -1000, y: -1000 };
        let ripples: Ripple[] = [];
        let time = 0;
        let animationId: number;

        function hexToRgb(hex: string) {
            const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return res
                ? {
                      r: parseInt(res[1], 16),
                      g: parseInt(res[2], 16),
                      b: parseInt(res[3], 16),
                  }
                : { r: 0, g: 0, b: 0 };
        }

        function hslToRgb(h: number, s: number, l: number) {
            let r: number, g: number, b: number;
            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p: number, q: number, t: number) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255),
            };
        }

        const baseRgb = hexToRgb(config.baseColor);
        const rippleRgb = hexToRgb(config.rippleColor);

        function init() {
            width = canvas!.width = window.innerWidth;
            height = canvas!.height = window.innerHeight;
            cols = Math.ceil(width / (config.tileSize + config.gap));
            rows = Math.ceil(height / (config.tileSize + config.gap));
        }

        function lerp(start: number, end: number, amt: number) {
            return (1 - amt) * start + amt * end;
        }

        function animate() {
            time += config.noiseSpeed;

            const dynamicHue = 0.72 + Math.sin(time * 0.5) * 0.08;
            const activeRgb = hslToRgb(dynamicHue, 0.8, 0.6);

            const distX = mouse.x - mouse.prevX;
            const distY = mouse.y - mouse.prevY;
            const currentSpeed = Math.hypot(distX, distY);
            mouse.speed = lerp(mouse.speed, currentSpeed, 0.05);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            const dynamicRadius = Math.min(
                config.baseRadius + mouse.speed * 5,
                config.maxRadius
            );

            cursor.x = lerp(cursor.x, mouse.x, config.smoothness);
            cursor.y = lerp(cursor.y, mouse.y, config.smoothness);

            ctx!.fillStyle = '#020204';
            ctx!.fillRect(0, 0, width, height);

            ripples = ripples.filter((r) => {
                r.age += 1;
                r.radius += 4;
                return r.age < r.lifespan;
            });

            const tR = time;
            const tB = time + 2.0;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * (config.tileSize + config.gap);
                    const y = j * (config.tileSize + config.gap);
                    const centerX = x + config.tileSize / 2;
                    const centerY = y + config.tileSize / 2;

                    const nR =
                        (Math.sin(i * 0.04 + tR) + Math.cos(j * 0.03 + tR)) / 2;
                    const nB =
                        (Math.sin(i * 0.05 + tB) + Math.cos(j * 0.04 + tB)) / 2;

                    const intR = Math.max(0, nR * 0.06);
                    const intB = Math.max(0, nB * 0.08);

                    const dx = cursor.x - centerX;
                    const dy = cursor.y - centerY;
                    const dist = Math.hypot(dx, dy);
                    let mouseLight = 0;

                    if (dist < dynamicRadius) {
                        const mInt = 1 - dist / dynamicRadius;
                        mouseLight = Math.pow(mInt, 3);
                    }

                    let r = baseRgb.r;
                    let g = baseRgb.g;
                    let b = baseRgb.b;

                    r += 40 * intR;
                    b += 60 * intB;

                    if (mouseLight > 0) {
                        r += (activeRgb.r - r) * mouseLight;
                        g += (activeRgb.g - g) * mouseLight;
                        b += (activeRgb.b - b) * mouseLight;
                    }

                    ripples.forEach((rip) => {
                        const dToRipple = Math.hypot(
                            centerX - rip.x,
                            centerY - rip.y
                        );
                        const ringWidth = 60;
                        if (Math.abs(dToRipple - rip.radius) < ringWidth) {
                            let rInt =
                                1 -
                                Math.abs(dToRipple - rip.radius) / ringWidth;
                            rInt = rInt * rInt * (3 - 2 * rInt);

                            const fade = 1 - rip.age / rip.lifespan;
                            const finalInt = rInt * fade;

                            r += (rippleRgb.r - r) * finalInt;
                            g += (rippleRgb.g - g) * finalInt;
                            b += (rippleRgb.b - b) * finalInt;
                        }
                    });

                    r = Math.min(255, Math.max(0, r));
                    g = Math.min(255, Math.max(0, g));
                    b = Math.min(255, Math.max(0, b));

                    ctx!.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
                    ctx!.fillRect(x, y, config.tileSize, config.tileSize);
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleClick = (e: MouseEvent) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                lifespan: 100,
                age: 0,
            });
        };

        const handleTouchMove = (e: TouchEvent) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        };

        const handleResize = () => init();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10"
        />
    );
}
