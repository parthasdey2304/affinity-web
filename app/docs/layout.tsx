import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-affinity-base)] text-[var(--color-affinity-text-base)]">
      <TopNav />
      <div className="flex flex-1 mx-auto w-full max-w-7xl relative">
        <Sidebar />
        <main className="flex-1 min-w-0 px-8 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
