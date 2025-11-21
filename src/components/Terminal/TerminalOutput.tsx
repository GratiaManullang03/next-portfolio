export default function TerminalOutput() {
    return (
        <div className="px-[20px] mb-6 font-mono text-[13px] leading-relaxed">
            <div className="text-[#6b7280] mb-2">
                <span className="text-[#06b6d4]">$</span> cat about.txt
            </div>
            <div className="text-[#e5e7eb] mb-4">
                <p className="mb-2">
                    <span className="text-[#a855f7]">Name:</span> Gratia
                </p>
                <p className="mb-2">
                    <span className="text-[#a855f7]">Role:</span> Backend Developer
                </p>
                <p className="mb-2">
                    <span className="text-[#a855f7]">Focus:</span> IT | Logistics | Business
                </p>
                <p className="mb-2">
                    <span className="text-[#a855f7]">Email:</span>{' '}
                    <a href="mailto:gratiamanullang03@gmail.com" className="text-[#06b6d4] hover:text-[#f472b6] transition-colors">
                        gratiamanullang03@gmail.com
                    </a>
                </p>
                <p>
                    <span className="text-[#a855f7]">GitHub:</span>{' '}
                    <a href="https://github.com/GratiaManullang03/" target="_blank" rel="noreferrer" className="text-[#06b6d4] hover:text-[#f472b6] transition-colors">
                        GratiaManullang03
                    </a>
                </p>
            </div>
            <div className="text-[#6b7280]">
                <span className="text-[#06b6d4]">$</span> echo &quot;Welcome to my portfolio!&quot;
            </div>
            <div className="text-[#f472b6] mb-4">
                Welcome to my portfolio!
            </div>
        </div>
    );
}
