import { TerminalWindow } from "@/components/ui/TerminalWindow";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[var(--color-affinity-base)]">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[300px] w-[800px] bg-blue-600/30 blur-[120px] rounded-full" />
        </div>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins tracking-tight mb-6 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          The IDE Experience. <br/> In Your Terminal.
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-[var(--color-affinity-text-muted)] mb-10 font-poppins">
          Affinity is a next-generation terminal viewer designed as a beautiful replacement for cat and bat, featuring IDE-level capabilities right from the command line.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(96,165,250,0.6)] transition-all duration-200">
            Get Started &rarr;
          </button>
          <a href="https://github.com/parthasdey2304/affinity" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full font-semibold text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2">
            View on GitHub
          </a>
        </div>
        
        <div className="mx-auto max-w-3xl transform hover:scale-[1.02] transition-transform duration-500">
          <TerminalWindow filename="install.sh">
            <div className="text-left text-[14px]">
              <span className="text-pink-500">pip</span> <span className="text-blue-300">install</span> <span className="text-green-400">affinity-code-viewer</span>
              <div className="mt-2 text-slate-400"># Or build from source...</div>
              <div className="mt-2 text-[var(--color-affinity-term-cyan)]">$ affinity --help</div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
