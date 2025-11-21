'use client';

import { motion } from 'framer-motion';
import TerminalContainer from '@/components/Terminal/TerminalContainer';
import TerminalHeader from '@/components/Terminal/TerminalHeader';
import AsciiArt from '@/components/Terminal/AsciiArt';
import TerminalOutput from '@/components/Terminal/TerminalOutput';
import Prompt from '@/components/Terminal/Prompt';
import Preloader from '@/components/Preloader';
import Background from '@/components/Background';

export default function Home() {
    return (
        <>
            <Background />
            <Preloader />
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    delay: 3.5,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <TerminalContainer>
                    <TerminalHeader />
                    <div className="px-[20px]">
                        <AsciiArt />
                        <TerminalOutput />
                        <Prompt />
                    </div>
                </TerminalContainer>
            </motion.div>
        </>
    );
}
