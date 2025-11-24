'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { Experience } from '@/data/experience';

// --- Constants ---
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_GLOW_COLOR = '168, 85, 247'; // Purple

// --- Helper Functions ---
const createParticleElement = (
    x: number,
    y: number,
    color = DEFAULT_GLOW_COLOR
) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

interface ParticleCardProps {
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    enableStars?: boolean; // FIX: Sudah ditambahkan
}

const ParticleCard = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = false,
    enableMagnetism = false,
    enableStars = true,
}: ParticleCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLElement[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;

        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(
                Math.random() * width,
                Math.random() * height,
                glowColor
            )
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        if (magnetismAnimationRef.current) magnetismAnimationRef.current.kill();

        particlesRef.current.forEach((particle) => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    if (particle.parentNode)
                        particle.parentNode.removeChild(particle);
                },
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!enableStars || !cardRef.current || !isHoveredRef.current) return;

        if (!particlesInitialized.current) {
            initializeParticles();
        }

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true) as HTMLElement;
                cardRef.current?.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(
                    clone,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)',
                    }
                );

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true,
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true,
                });
            }, index * 100);

            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles, enableStars]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;

        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            if (enableStars) animateParticles();
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();

            // Reset Magnetism
            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableMagnetism) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Magnetism Only (No Tilt)
            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05; // Kekuatan magnet
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                { scale: 0, opacity: 1 },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove(),
                }
            );
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            clearAllParticles();
        };
    }, [
        animateParticles,
        clearAllParticles,
        disableAnimations,
        enableMagnetism,
        clickEffect,
        glowColor,
        enableStars,
    ]);

    return (
        <div
            ref={cardRef}
            className={`${className} particle-container`}
            style={{ ...style, position: 'relative', overflow: 'visible' }}>
            {children}
        </div>
    );
};

interface MagicBentoProps {
    items: Experience[];
    enableStars?: boolean;
    enableMagnetism?: boolean;
    glowColor?: string;
    enableTilt?: boolean; // Biarkan prop ini ada tapi tidak dipakai agar tidak error di parent
}

export default function MagicBento({
    items,
    enableStars = true,
    enableMagnetism = true,
    glowColor = '168, 85, 247',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    enableTilt = false,
}: MagicBentoProps) {
    return (
        <div className="magic-bento-grid">
            <style jsx global>{`
                .magic-bento-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1rem;
                    width: 100%;
                    padding-bottom: 2rem;
                }
                @media (min-width: 768px) {
                    .magic-bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .magic-bento-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    /* Layout Variasi */
                    .bento-card:nth-child(1) {
                        grid-column: span 2;
                    }
                    .bento-card:nth-child(4) {
                        grid-column: span 2;
                    }
                }

                .bento-card {
                    background: rgba(15, 15, 17, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 200px;
                    transition: border-color 0.3s;
                }
                .bento-card:hover {
                    border-color: rgba(168, 85, 247, 0.5);
                }

                .bento-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #a855f7;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    display: inline-block;
                    background: rgba(168, 85, 247, 0.1);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    border: 1px solid rgba(168, 85, 247, 0.2);
                }
                .bento-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }
                .bento-company {
                    font-size: 0.9rem;
                    color: #9ca3af;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .bento-company::before {
                    content: '';
                    display: block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #06b6d4;
                }
                .bento-desc {
                    font-size: 0.85rem;
                    color: #6b7280;
                    line-height: 1.6;
                }
                .bento-meta {
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: #52525b;
                    font-family: monospace;
                }
            `}</style>

            {items.map((item) => (
                <ParticleCard
                    key={item.id}
                    className="bento-card"
                    glowColor={glowColor}
                    enableMagnetism={enableMagnetism}
                    enableStars={enableStars}
                    clickEffect={true}>
                    <div>
                        <div className="bento-label">{item.period}</div>
                        <h3 className="bento-title">{item.role}</h3>
                        <div className="bento-company">{item.company}</div>
                        <p className="bento-desc">{item.description}</p>
                    </div>
                    <div className="bento-meta">
                        <span>{item.location}</span>
                        <span>ID: {item.id.toUpperCase()}</span>
                    </div>
                </ParticleCard>
            ))}
        </div>
    );
}
