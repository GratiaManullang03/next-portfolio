'use client';

import React, { useState, useEffect } from 'react';

export default function Prompt() {
    const [time, setTime] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

    return (
        <div className="px-[20px]">
            {/* Row 1 */}
            <div className="flex items-center w-full h-[34px] relative">
                {/* Bracket Left */}
                <div className="h-full flex items-center px-[6px]">
                    <span className="text-[#555] text-[26px] font-light leading-none" suppressHydrationWarning>╭</span>
                </div>

                {/* Path Box */}
                <div
                    className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#4ade80] mr-[2px] justify-center min-w-[220px]"
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
                    className="h-full flex items-center px-[40px] rounded-[4px] text-[13px] font-semibold whitespace-nowrap text-[#7dd3fc] ml-[2px] justify-center min-w-[240px]"
                    style={{
                        background: 'linear-gradient(270deg, #1f1f1f 0%, #1f1f1f 5%, #282828 5%, #282828 10%, #323232 10%, #323232 15%, #3d3d3d 15%, #3d3d3d 85%, #323232 85%, #323232 90%, #282828 90%, #282828 95%, #1f1f1f 95%, #1f1f1f 100%)'
                    }}
                >
                    {mounted ? time : ''}
                </div>

                {/* Bracket Right */}
                <div className="h-full flex items-center px-[6px]">
                    <span className="text-[#555] text-[26px] font-light leading-none" suppressHydrationWarning>╮</span>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center w-full h-[34px] relative -mt-[3px]">
                {/* Bracket Left */}
                <div className="h-full flex items-center px-[6px]">
                    <span className="text-[#555] text-[26px] font-light leading-none" suppressHydrationWarning>╰</span>
                </div>

                {/* Input Area */}
                <div className="flex items-center pl-[4px] flex-1">
                    <span className="text-[#a855f7] mr-[12px] font-bold text-[18px]">
                        ❯
                    </span>
                    <span className="text-white text-[14px] tracking-[0.5px] font-medium">
                        npm run dev
                    </span>
                    <span className="inline-block w-[10px] h-[18px] bg-[#a855f7] ml-[8px] animate-blink"></span>
                </div>

                {/* Bracket Right */}
                <div className="h-full flex items-center px-[6px]">
                    <span className="text-[#555] text-[26px] font-light leading-none" suppressHydrationWarning>╯</span>
                </div>
            </div>
        </div>
    );
}
