"use client"
import Link from 'next/link';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Sidebar() {
  const { data: nav } = useSWR('/api/nav', fetcher, { refreshInterval: 30000 });
  const pathname = usePathname();

  if (!nav) return <div className="w-[260px] p-6 text-sm text-slate-500 animate-pulse">Loading navigation...</div>;

  return (
    <aside className="w-[260px] shrink-0 border-r border-[var(--color-affinity-glass-border)] h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto py-6 px-4">
      <nav className="flex flex-col space-y-1">
        {Object.entries(nav).map(([key, item]: [string, any]) => {
          if (item.items) {
            return (
              <div key={key} className="pt-4 pb-2">
                <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {item.title}
                </h4>
                <div className="flex flex-col space-y-1">
                  {Object.entries(item.items).map(([subKey, subItem]: [string, any]) => {
                    const href = `/docs/${key}/${subKey}`;
                    const isActive = pathname === href;
                    return (
                      <Link key={subKey} href={href} className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors border-l-2 border-transparent",
                        isActive ? "bg-[var(--color-affinity-glass)] text-blue-400 font-medium border-blue-500" : "text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20"
                      )}>
                        {subItem.title}
                        {subItem.badge && (
                          <span className="ml-2 text-[10px] uppercase bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">{subItem.badge}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }

          const href = `/docs/${key}`;
          const isActive = pathname === href;
          return (
            <Link key={key} href={href} className={cn(
              "px-3 py-2 text-sm rounded-md transition-colors border-l-2 border-transparent",
              isActive ? "bg-[var(--color-affinity-glass)] text-blue-400 font-medium border-blue-500" : "text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20"
            )}>
              {item.title}
              {item.badge && (
                <span className="ml-2 text-[10px] uppercase bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  );
}
