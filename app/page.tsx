import { HeroSection } from "@/components/hero/HeroSection";
import { TopNav } from "@/components/layout/TopNav";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-[var(--color-affinity-base)]">
      <TopNav />
      <HeroSection />
      
      <section className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">Everything a Developer Needs</h2>
          <p className="text-[var(--color-affinity-text-muted)] max-w-2xl mx-auto">
            Affinity is packed with features to make viewing and understanding code in the terminal an absolute joy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard>
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Syntax Highlighting</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">300+ language support via Pygments for beautiful code formatting.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="text-4xl mb-4">📏</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Scope Guides</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">VS Code-style vertical indent markers to track block boundaries easily.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Watch Mode</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">Live re-render on every file save, perfect for tailing logs or watching output.</p>
          </GlassCard>
          
          <GlassCard>
            <div className="text-4xl mb-4">🔀</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Diff Viewer</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">Color-coded side-by-side comparisons of file changes.</p>
          </GlassCard>

          <GlassCard>
            <div className="text-4xl mb-4">▶</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Inline Execution</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">Run & view output in one command right from the TUI interface.</p>
          </GlassCard>

          <GlassCard>
            <div className="text-4xl mb-4">🌲</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-poppins">Directory Tree</h3>
            <p className="text-[var(--color-affinity-text-muted)] text-sm">Beautiful tree-style folder view to browse projects efficiently.</p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
