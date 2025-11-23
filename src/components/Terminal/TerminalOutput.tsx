export default function TerminalOutput() {
    return (
        <div className="mb-6 font-mono text-[13px] leading-relaxed">
            <div className="text-[#6b7280]">
                <span className="text-[#a855f7] mr-[6px] font-bold text-[18px]">❯</span> echo &quot;Welcome to my portfolio!&quot;
            </div>
            <div className="text-[#f472b6] mb-4">
                Welcome to my portfolio!
            </div>
            <div className="text-[#6b7280] text-[11px]">
                Type <span className="text-[#06b6d4]">/command</span> to see available commands, or start typing to explore.
            </div>
        </div>
    );
}
