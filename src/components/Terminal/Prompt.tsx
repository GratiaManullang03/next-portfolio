'use client';

import React, { useState, useEffect, useRef } from 'react';
import { findMatchingCommands } from '@/constants/commands';

interface PromptProps {
    onCommand?: (command: string) => void;
}

export default function Prompt({ onCommand }: PromptProps) {
    const [time, setTime] = useState('');
    const [mounted, setMounted] = useState(false);
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        // Focus input on mount
        inputRef.current?.focus();

        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTime(`${timeString} UTC+7`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Re-focus when clicking anywhere on the page
    useEffect(() => {
        const handleGlobalClick = () => {
            inputRef.current?.focus();
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    useEffect(() => {
        if (input) {
            const matches = findMatchingCommands(input);
            if (matches.length > 0 && matches[0].name !== input.toLowerCase()) {
                setSuggestion(matches[0].name);
            } else {
                setSuggestion('');
            }
        } else {
            setSuggestion('');
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            onCommand?.(input.trim());
            setInput('');
            setSuggestion('');
        } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
            e.preventDefault();
            setInput(suggestion);
            setSuggestion('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div>
            {/* Row 1 */}
            <div className="flex items-center w-full h-[34px] relative">
                {/* Bracket Left */}
                <div className="h-full flex items-center">
                    <span className="text-[#a855f7] text-[26px] font-light leading-none" suppressHydrationWarning>╭</span>
                </div>

                {/* Path Box */}
                <div
                    className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#06b6d4] mr-[2px] justify-center min-w-[220px]"
                    style={{
                        background: 'linear-gradient(90deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)'
                    }}
                >
                    ~/graxya/portfolio
                </div>

                {/* Dots Separator */}
                <div className="flex-1 h-full mx-[10px] opacity-40 bg-[radial-gradient(circle,#6b7280_1.5px,transparent_1.5px)] bg-[length:12px_100%] bg-repeat-x bg-center"></div>

                {/* Time Box */}
                <div
                    className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#f472b6] ml-[2px] justify-center min-w-[240px]"
                    style={{
                        background: 'linear-gradient(270deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)'
                    }}
                >
                    {mounted ? time : ''}
                </div>

                {/* Bracket Right */}
                <div className="h-full flex items-center">
                    <span className="text-[#a855f7] text-[26px] font-light leading-none" suppressHydrationWarning>╮</span>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center w-full h-[34px] relative -mt-[3px]">
                {/* Bracket Left */}
                <div className="h-full flex items-center">
                    <span className="text-[#a855f7] text-[26px] font-light leading-none" suppressHydrationWarning>╰</span>
                </div>

                {/* Input Area */}
                <div className="flex items-center pl-[4px] flex-1 cursor-text" onClick={focusInput}>
                    <span className="text-[#a855f7] mr-[6px] font-bold text-[18px]">
                        ❯
                    </span>
                    <div className="relative flex-1 h-[18px] flex items-center">
                        {/* Ghost suggestion text */}
                        {suggestion && (
                            <span className="absolute left-0 text-[#6b7280] text-[13px] font-mono pointer-events-none leading-none">
                                {suggestion}
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-[#e5e7eb] text-[13px] font-mono w-full caret-transparent absolute left-0 h-full leading-none"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <span
                            className="absolute top-0 pointer-events-none"
                            style={{ left: `${input.length * 7.8}px` }}
                        >
                            <span className="inline-block w-[10px] h-[18px] bg-[#a855f7] animate-blink"></span>
                        </span>
                    </div>
                </div>

                {/* Bracket Right */}
                <div className="h-full flex items-center">
                    <span className="text-[#a855f7] text-[26px] font-light leading-none" suppressHydrationWarning>╯</span>
                </div>
            </div>
        </div>
    );
}
