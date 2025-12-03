import Image from 'next/image';

const AboutOutput = () => {
  return (
    <div className="my-6 font-mono text-sm">
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Left Column: Profile Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded overflow-hidden border border-zinc-700 group/avatar">
            <Image
              src="/assets/images/profile.webp"
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full grayscale group-hover/avatar:grayscale-0 transition-all duration-300"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/10 transition-colors duration-300"></div>
          </div>
          <div className="mt-2 text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Available</span>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex-1 space-y-4 w-full">

          {/* Header */}
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-lg font-bold text-white mb-1">Felix Gratia Mangatur Manullang</h2>
            <p className="text-zinc-500 text-xs">Backend Developer • GPA 3.94/4.0</p>
          </div>

          {/* Info Grid */}
          <div className="space-y-2">
            <InfoRow label="Location" value="Tangerang, Banten" />
            <InfoRow label="Education" value="Polytechnic Multimedia Nusantara (2022 - Present)" />
            <InfoRow label="Current" value="Intern at Alfagift (PT Global Loyalty Indonesia)" />
            <InfoRow label="Previous" value="Intern at PT Samanasoft Inovasi Persada" />
          </div>

          {/* Bio */}
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-zinc-400 leading-relaxed text-xs">
              High-performing Backend Developer with expertise in architecting scalable systems using Python (FastAPI), PostgreSQL, and Docker.
              Experience building multi-tenant SaaS platforms, RAG-based AI solutions, and secure SSO authentication services.
            </p>
          </div>

          {/* Key Projects */}
          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Key Projects</h3>
            <div className="space-y-2">
              <ProjectItem
                name="ATABOT"
                desc="Universal Business Intelligence AI with RAG-based system"
              />
              <ProjectItem
                name="ATLAS"
                desc="SSO Authentication & Authorization Service with RBAC"
              />
              <ProjectItem
                name="AVENTORY"
                desc="End-to-end Inventory Management System"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              <TechBadge>Python</TechBadge>
              <TechBadge>FastAPI</TechBadge>
              <TechBadge>PostgreSQL</TechBadge>
              <TechBadge>Docker</TechBadge>
              <TechBadge>Go</TechBadge>
              <TechBadge>Redis</TechBadge>
              <TechBadge>MongoDB</TechBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-3 text-xs">
    <span className="text-zinc-600 min-w-[80px]">{label}</span>
    <span className="text-zinc-300">{value}</span>
  </div>
);

const ProjectItem = ({ name, desc }: { name: string; desc: string }) => (
  <div className="text-xs">
    <span className="text-zinc-300 font-medium">{name}</span>
    <span className="text-zinc-600 mx-2">—</span>
    <span className="text-zinc-500">{desc}</span>
  </div>
);

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 rounded hover:border-zinc-700 hover:text-zinc-300 transition-colors">
    {children}
  </span>
);

export default AboutOutput;