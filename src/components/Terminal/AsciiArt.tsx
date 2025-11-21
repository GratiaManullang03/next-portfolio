export default function AsciiArt() {
    return (
        <div className="flex flex-col items-center mb-[50px] leading-none">
            <pre
                className="m-0 font-mono text-[12px] leading-[1.1] font-bold whitespace-pre"
                dangerouslySetInnerHTML={{
                    __html: `<span style="color:#06b6d4">  ██████╗ </span><span style="color:#3b82f6">██████╗  </span><span style="color:#8b5cf6">█████╗ </span><span style="color:#a855f7">██╗  ██╗</span><span style="color:#d946ef">██╗   ██╗</span><span style="color:#f472b6">█████╗ </span>
<span style="color:#06b6d4"> ██╔════╝ </span><span style="color:#3b82f6">██╔══██╗</span><span style="color:#8b5cf6">██╔══██╗</span><span style="color:#a855f7">╚██╗██╔╝</span><span style="color:#d946ef">╚██╗ ██╔╝</span><span style="color:#f472b6">██╔══██╗</span>
<span style="color:#06b6d4"> ██║  ███╗</span><span style="color:#3b82f6">██████╔╝</span><span style="color:#8b5cf6">███████║</span><span style="color:#a855f7"> ╚███╔╝ </span><span style="color:#d946ef"> ╚████╔╝ </span><span style="color:#f472b6">███████║</span>
<span style="color:#06b6d4"> ██║   ██║</span><span style="color:#3b82f6">██╔══██╗</span><span style="color:#8b5cf6">██╔══██║</span><span style="color:#a855f7"> ██╔██╗ </span><span style="color:#d946ef">  ╚██╔╝  </span><span style="color:#f472b6">██╔══██║</span>
<span style="color:#06b6d4"> ╚██████╔╝</span><span style="color:#3b82f6">██║  ██║</span><span style="color:#8b5cf6">██║  ██║</span><span style="color:#a855f7">██╔╝ ██╗</span><span style="color:#d946ef">   ██║   </span><span style="color:#f472b6">██║  ██║</span>
<span style="color:#06b6d4">  ╚═════╝ </span><span style="color:#3b82f6">╚═╝  ╚═╝</span><span style="color:#8b5cf6">╚═╝  ╚═╝</span><span style="color:#a855f7">╚═╝  ╚═╝</span><span style="color:#d946ef">   ╚═╝   </span><span style="color:#f472b6">╚═╝  ╚═╝</span>`
                }}
            />
        </div>
    );
}
