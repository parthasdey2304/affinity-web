import { TerminalWindow } from "@/components/ui/TerminalWindow";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[var(--affinity-base)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.15),transparent_50%)]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 px-3 py-1 mb-8 border border-blue-500/20">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-sm font-medium text-blue-400">Affinity v1.0 is here</span>
        </div>
        
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-[var(--affinity-text-base)] font-poppins mb-6">
          The terminal viewer <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">reimagined.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-[var(--affinity-text-muted)] mb-10 font-poppins">
          Experience standard cat and bat with a fully featured syntax highlighter, live watch mode, interactive search, and beautiful diff viewer all built inside a premium glassmorphic TUI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/docs/overview" className="group inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/docs/features/core-viewer" className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-white/20 px-8 py-3 text-sm font-semibold text-slate-700 dark:text-white transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
            View Features
          </Link>
        </div>
        
        <div className="mt-16 w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl" style={{border: '1px solid rgba(255,255,255,0.08)'}}>
          <div className="flex items-center px-4 py-3 border-b border-white/10" style={{background: 'var(--terminal-header-bg)'}}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-slate-400">~/projects/affinity</div>
          </div>
          <div className="p-6 font-mono text-sm text-left relative overflow-hidden" style={{background: 'var(--terminal-body-bg)', color: 'var(--terminal-text)'}}>
            <div className="flex flex-col space-y-2 relative z-10">
              <div className="mt-2 text-[var(--affinity-term-cyan)]">$ affinity --help</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
