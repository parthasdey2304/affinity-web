"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchModal } from '@/components/ui/SearchModal';
import { MobileNav } from '@/components/layout/MobileNav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--affinity-glass)] backdrop-blur-xl">
        <div className="flex h-16 items-center px-4 md:px-6">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2 mr-2">
            <svg suppressHydrationWarning width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M4 17l6-6-6-6M12 19h8" />
            </svg>
            <span className="font-bold tracking-tight text-xl text-white dark:text-white font-poppins hidden sm:inline-block">
              affinity
            </span>
          </Link>
          <nav className="absolute left-1/2 -translate-x-1/2 items-center space-x-1 text-sm font-medium hidden md:flex">
            {[
              { href: '/docs/overview', label: 'Docs', match: '/docs' },
              { href: '/docs/features/core-viewer', label: 'Features', match: '/docs/features' },
              { href: '/docs/themes', label: 'Themes', match: '/docs/themes' },
            ].map(({ href, label, match }) => {
              const isActive = pathname.startsWith(match);
              return (
                <Link key={href} href={href} className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}>{label}</Link>
              );
            })}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            <div className="w-full max-w-xs md:max-w-sm">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex w-full items-center space-x-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-300 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-black/40 transition-colors"
              >
                <span className="flex-1 text-left hidden sm:inline-block">Search documentation...</span>
                <span className="flex-1 text-left sm:hidden">Search...</span>
                <kbd className="rounded bg-slate-200 dark:bg-white/10 px-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-300 hidden sm:inline-block">{isMac ? '⌘ + K' : 'Ctrl + K'}</kbd>
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
