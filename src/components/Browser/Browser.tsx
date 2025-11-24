'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import CVContent from './contents/CVContent';
import ProjectContent from './contents/ProjectContent'; // Import ProjectContent

interface BrowserProps {
    command: string;
    onClose: () => void;
}

interface BrowserConfig {
    tabName: string;
    tabIcon: string;
    url: string;
    content: string;
}

const BROWSER_CONFIGS: Record<string, BrowserConfig> = {
    '/curriculum-vitae': {
        tabName: 'Curriculum Vitae',
        tabIcon: '📄',
        url: 'https://graxya.dev/curriculum-vitae',
        content: 'curriculum-vitae',
    },
    '/project': {
        tabName: 'Projects Database',
        tabIcon: '🚀',
        url: 'https://graxya.dev/projects',
        content: 'project',
    },
    '/experience': {
        tabName: 'Experience',
        tabIcon: '💼',
        url: 'https://graxya.dev/experience',
        content: 'experience',
    },
    '/achievements': {
        tabName: 'Achievements',
        tabIcon: '🏆',
        url: 'https://graxya.dev/achievements',
        content: 'achievements',
    },
    '/skills': {
        tabName: 'Skills',
        tabIcon: '⚡',
        url: 'https://graxya.dev/skills',
        content: 'skills',
    },
    '/chat': {
        tabName: 'Chat with Me',
        tabIcon: '💬',
        url: 'https://graxya.dev/chat',
        content: 'chat',
    },
};

export default function Browser({ command, onClose }: BrowserProps) {
    const [time, setTime] = useState('');
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const browserRef = useRef<HTMLDivElement>(null);

    const config = BROWSER_CONFIGS[command.toLowerCase()] || {
        tabName: 'Unknown',
        tabIcon: '❓',
        url: 'https://graxya.dev/404',
        content: 'not found',
    };

    useEffect(() => {
        setMounted(true);
        setTimeout(() => setIsVisible(true), 50);

        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    // Drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;
        if ((e.target as HTMLElement).closest('button')) return;

        setIsDragging(true);
        const rect = browserRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();

            const newX =
                e.clientX -
                dragOffset.x -
                window.innerWidth / 2 +
                (browserRef.current?.offsetWidth || 0) / 2;
            const newY =
                e.clientY -
                dragOffset.y -
                window.innerHeight / 2 +
                (browserRef.current?.offsetHeight || 0) / 2;

            setPosition({ x: newX, y: newY });
        },
        [isDragging, dragOffset]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Content Renderer Helper
    const renderContent = () => {
        switch (config.content) {
            case 'curriculum-vitae':
                return <CVContent />;
            case 'project':
                return <ProjectContent />;
            default:
                return (
                    <div className="flex-grow p-[40px] overflow-y-auto h-full">
                        <div className="max-w-[800px] mx-auto">
                            <div className="text-[#e4e4e7] text-[24px] font-semibold mb-[20px]">
                                {config.tabName} - Work in Progress
                            </div>
                            <p className="text-gray-500 font-mono text-sm">
                                Module{' '}
                                <span className="text-[#a855f7]">
                                    {config.content}
                                </span>{' '}
                                is currently being compiled. Check back later
                                for system updates.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            ref={browserRef}
            className={`bg-[#0a0a0c]/95 backdrop-blur-[20px] border border-white/[0.08] overflow-hidden flex flex-col transition-all ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${
                isMaximized
                    ? 'fixed inset-0 w-full h-full rounded-none'
                    : 'w-[85vw] h-[85vh] md:w-[75vw] md:h-[80vh] rounded-lg'
            }`}
            style={{
                boxShadow: isMaximized
                    ? 'none'
                    : '0 0 0 1px rgba(0,0,0,0.5), 0 25px 50px -12px rgba(0,0,0,0.7)',
                transform: isMaximized
                    ? 'none'
                    : `translate(${position.x}px, ${position.y}px)`,
                transitionDuration: isDragging ? '0ms' : '300ms',
            }}>
            {/* Header Bar */}
            <div
                className={`h-[44px] bg-black/30 border-b border-white/[0.08] flex items-end px-[10px] select-none ${
                    !isMaximized ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                onMouseDown={handleMouseDown}>
                {/* Tab */}
                <div className="flex-grow flex h-full pt-[8px]">
                    <div className="w-[220px] h-full bg-[#0a0a0c]/95 text-[#e4e4e7] rounded-t-md border border-white/[0.08] border-b-0 flex items-center px-[15px] text-[12px] font-medium relative group">
                        {/* Gradient top border */}
                        <div className="absolute top-[-1px] left-0 w-full h-[2px] bg-gradient-to-r from-[#a855f7] to-[#f472b6]" />
                        <span className="mr-[10px] opacity-80 group-hover:opacity-100 transition-opacity">
                            {config.tabIcon}
                        </span>
                        {config.tabName}
                    </div>
                </div>

                {/* Window Controls */}
                <div className="flex h-full items-center pl-[10px] gap-[8px]">
                    {/* Maximize Button */}
                    <button
                        onClick={handleMaximize}
                        className="w-[32px] h-[32px] flex items-center justify-center text-[#71717a] rounded hover:bg-white/10 hover:text-white transition-colors"
                        title={isMaximized ? 'Restore' : 'Maximize'}>
                        {isMaximized ? (
                            // Restore icon
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor">
                                <rect
                                    x="1.5"
                                    y="3.5"
                                    width="7"
                                    height="7"
                                    strokeWidth="1.5"
                                />
                                <path d="M3.5 1.5H10.5V8.5" strokeWidth="1.5" />
                            </svg>
                        ) : (
                            // Maximize icon
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor">
                                <rect
                                    x="1.5"
                                    y="1.5"
                                    width="9"
                                    height="9"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="w-[32px] h-[32px] flex items-center justify-center text-[#71717a] rounded hover:bg-[#ef4444] hover:text-white transition-colors"
                        title="Close (Ctrl+C)">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor">
                            <path
                                d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="h-[50px] flex items-center px-[16px] gap-[16px] bg-white/[0.01] border-b border-white/[0.08]">
                {/* Nav Actions (disabled) */}
                <div className="flex gap-[12px] text-[#71717a] opacity-50 cursor-not-allowed">
                    <span>←</span>
                    <span>→</span>
                    <span>↻</span>
                </div>

                {/* URL Bar */}
                <div className="flex-grow h-[32px] bg-black/40 border border-white/[0.04] rounded flex items-center px-[12px] font-mono text-[13px] text-[#71717a] select-none">
                    <span className="opacity-60 mr-[8px]">🔒</span>
                    <span className="text-[#555]">{config.url}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-hidden relative bg-[#050505]">
                {renderContent()}
            </div>

            {/* Status Bar */}
            <div className="h-[28px] bg-black/50 border-t border-white/[0.05] flex items-center justify-end px-[15px] gap-[20px] font-mono text-[10px] text-[#71717a] select-none">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    SECURE CONNECTION
                </div>
                <div>READ-ONLY MODE</div>
                <div>{mounted ? time : ''}</div>
            </div>
        </div>
    );
}
