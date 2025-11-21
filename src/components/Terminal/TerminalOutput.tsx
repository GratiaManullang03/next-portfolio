export default function TerminalOutput() {
    return (
        <div className="px-[20px] mb-6 font-mono text-[13px] leading-relaxed">
            <div className="text-[#6b7280] mb-2">
                <span className="text-[#4ade80]">$</span> cat about.txt
            </div>
            <div className="text-[#e5e7eb] mb-4">
                <p className="mb-2">
                    <span className="text-[#f472b6]">Name:</span> Gratia
                </p>
                <p className="mb-2">
                    <span className="text-[#f472b6]">Role:</span> Backend Developer
                </p>
                <p className="mb-2">
                    <span className="text-[#f472b6]">Focus:</span> IT | Logistics | Business
                </p>
                <p className="mb-2">
                    <span className="text-[#f472b6]">Email:</span>{' '}
                    <a href="mailto:gratiamanullang03@gmail.com" className="text-[#7dd3fc] hover:underline">
                        gratiamanullang03@gmail.com
                    </a>
                </p>
                <p>
                    <span className="text-[#f472b6]">GitHub:</span>{' '}
                    <a href="https://github.com/GratiaManullang03/" target="_blank" rel="noreferrer" className="text-[#7dd3fc] hover:underline">
                        GratiaManullang03
                    </a>
                </p>
            </div>
            <div className="text-[#6b7280]">
                <span className="text-[#4ade80]">$</span> echo &quot;Welcome to my portfolio!&quot;
            </div>
            <div className="text-[#a855f7] mb-4">
                Welcome to my portfolio!
            </div>
        </div>
    );
}
