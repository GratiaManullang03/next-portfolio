'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import TerminalContainer from '@/components/Terminal/TerminalContainer';
import TerminalHeader from '@/components/Terminal/TerminalHeader';
import AsciiArt from '@/components/Terminal/AsciiArt';
import TerminalOutput from '@/components/Terminal/TerminalOutput';
import Prompt from '@/components/Terminal/Prompt';
import Preloader from '@/components/Preloader';
import Background from '@/components/Background';

export default function Home() {
    const [commands, setCommands] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCommand = (command: string) => {
        setCommands(prev => [...prev, command]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [commands]);

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
                    <div className="flex flex-col h-[calc(100%-35px)]">
                        <div className="px-[20px] flex-shrink-0">
                            <AsciiArt />
                        </div>
                        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-[20px]">
                            <TerminalOutput />
                            {commands.map((cmd, index) => (
                                <div key={index} className="text-[#6b7280] mb-2 font-mono text-[13px]">
                                    <span className="text-[#a855f7] mr-[6px] font-bold text-[18px]">❯</span> {cmd}
                                </div>
                            ))}
                            <Prompt onCommand={handleCommand} />
                        </div>
                    </div>
                </TerminalContainer>
            </motion.div>
        </>
    );
}
