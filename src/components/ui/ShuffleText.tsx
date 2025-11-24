'use client';

import { motion } from 'framer-motion';

interface ShuffleTextProps {
    text: string;
    className?: string;
    targetClassName?: string;
}

const DURATION = 0.25;
const STAGGER = 0.025;

export default function ShuffleText({
    text,
    className = '',
    targetClassName = '',
}: ShuffleTextProps) {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden whitespace-nowrap leading-[1] font-black uppercase ${className}`}
            style={{ lineHeight: 0.9 }} // Tweak line height agar rapat
        >
            <div className="relative inline-block">
                {text.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: '-100%' },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i,
                        }}
                        className={`inline-block ${targetClassName}`}
                        key={i}>
                        {l === ' ' ? '\u00A0' : l}
                    </motion.span>
                ))}
            </div>

            <div className="absolute inset-0 inline-block">
                {text.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: { y: '100%' },
                            hovered: { y: 0 },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i,
                        }}
                        className={`inline-block ${targetClassName} text-[#a855f7]`} // Warna Ungu saat hover
                        key={i}>
                        {l === ' ' ? '\u00A0' : l}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
