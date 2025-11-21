import TerminalContainer from '@/components/Terminal/TerminalContainer';
import TerminalHeader from '@/components/Terminal/TerminalHeader';
import AsciiArt from '@/components/Terminal/AsciiArt';
import Prompt from '@/components/Terminal/Prompt';
import Preloader from '@/components/Preloader';

export default function Home() {
    return (
        <>
            <Preloader />
            <TerminalContainer>
                <TerminalHeader />
                <div className="px-[40px]">
                    <AsciiArt />
                    <Prompt />
                </div>
            </TerminalContainer>
        </>
    );
}
