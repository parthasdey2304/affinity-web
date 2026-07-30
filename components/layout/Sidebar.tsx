"use client"
import Link from 'next/link';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const { data: nav } = useSWR('/api/nav', fetcher, { refreshInterval: 30000 });
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  if (!nav) return (
    <div className={cn("p-6 text-sm text-slate-500 animate-pulse", mobile ? "w-full" : "w-[260px]")}>
      Loading...
    </div>
  );

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSectionOpen = (key: string, item: any): boolean => {
    // auto-open section if a child is active
    if (key in openSections) return openSections[key];
    if (item.items) {
      return Object.keys(item.items).some(sub => pathname === `/docs/${key}/${sub}`);
    }
    return false;
  };

  return (
    <aside className={cn(
      "shrink-0 py-5 px-3",
      mobile
        ? "w-full"
        : "w-[260px] border-r border-[var(--affinity-glass-border)] h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto bg-[var(--affinity-surface)]"
    )}>
      <nav className="flex flex-col space-y-0.5">
        {Object.entries(nav).map(([key, item]: [string, any]) => {
          if (item.items) {
            const open = isSectionOpen(key, item);
            return (
              <div key={key}>
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-semibold text-[var(--affinity-text-base)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                  <span>{item.title}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 text-[var(--affinity-text-muted)] transition-transform duration-200",
                    open && "rotate-90"
                  )} />
                </button>
                {open && (
                  <div className="ml-1 pl-3 border-l border-[var(--affinity-glass-border)] mt-0.5 mb-1 flex flex-col space-y-0.5">
                    {Object.entries(item.items).map(([subKey, subItem]: [string, any]) => {
                      const href = `/docs/${key}/${subKey}`;
                      const isActive = pathname === href;
                      return (
                        <Link key={subKey} href={href} className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-blue-500/15 text-blue-500 dark:text-blue-400 font-medium"
                            : "text-[var(--affinity-text-muted)] hover:text-[var(--affinity-text-base)] hover:bg-black/5 dark:hover:bg-white/5"
                        )}>
                          {subItem.title}
                          {subItem.badge && (
                            <span className="ml-2 text-[10px] uppercase bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">{subItem.badge}</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const href = `/docs/${key}`;
          const isActive = pathname === href;
          return (
            <Link key={key} href={href} className={cn(
              "px-3 py-2 text-sm rounded-md transition-colors font-medium",
              isActive
                ? "bg-blue-500/15 text-blue-500 dark:text-blue-400"
                : "text-[var(--affinity-text-muted)] hover:text-[var(--affinity-text-base)] hover:bg-black/5 dark:hover:bg-white/5"
            )}>
              {item.title}
              {item.badge && (
                <span className="ml-2 text-[10px] uppercase bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
