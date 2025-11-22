'use client';

import dynamic from 'next/dynamic';

const ASCIIText = dynamic(() => import('../ASCIIText'), { ssr: false });

export default function AsciiArt() {
    return (
        <div className="relative w-full h-[120px] mb-[10px]">
            <ASCIIText
                text="GRAXYA"
                asciiFontSize={8}
                textFontSize={240}
                textColor="#a855f7"
                planeBaseHeight={10}
                enableWaves={true}
            />
        </div>
    );
}
