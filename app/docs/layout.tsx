import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--affinity-base)] text-[var(--affinity-text-base)]">
      <TopNav />
      <div className="flex flex-1 mx-auto w-full max-w-7xl relative">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
