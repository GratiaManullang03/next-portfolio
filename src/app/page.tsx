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
            <TerminalContainer>
                <TerminalHeader />
                <div className="px-[20px]">
                    <AsciiArt />
                    <TerminalOutput />
                    <Prompt />
                </div>
            </TerminalContainer>
        </>
    );
}
