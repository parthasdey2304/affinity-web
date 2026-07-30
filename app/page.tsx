import { HeroSection } from "@/components/hero/HeroSection";
import { TopNav } from "@/components/layout/TopNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2, Eye, RefreshCcw, FileDiff, TerminalSquare, FolderTree } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-[var(--affinity-base)]">
      <TopNav />
      <HeroSection />
      
      {/* Features Section */}
      <section className="w-full py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[var(--affinity-text-base)] font-poppins mb-4">Powerful Features</h2>
          <p className="text-[var(--affinity-text-muted)] max-w-2xl mx-auto">
            Everything you need for a modern terminal experience in one single executable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Core Viewer</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">300+ language support via Pygments for beautiful code formatting.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Line Focus</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">VS Code-style vertical indent markers to track block boundaries easily.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <RefreshCcw size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Watch Mode</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">Live re-render on every file save, perfect for tailing logs or watching output.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <FileDiff size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Diff Viewer</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">Color-coded side-by-side comparisons of file changes.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <TerminalSquare size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Run Mode</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">Run & view output in one command right from the TUI interface.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
              <FolderTree size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--affinity-text-base)] mb-2 font-poppins">Directory Tree</h3>
            <p className="text-[var(--affinity-text-muted)] text-sm">Beautiful tree-style folder view to browse projects efficiently.</p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
