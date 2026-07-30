"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchModal } from '@/components/ui/SearchModal';

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
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
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-affinity-glass-border)] bg-[var(--color-affinity-glass)] backdrop-blur-xl">
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M4 17l6-6-6-6M12 19h8" />
            </svg>
            <span className="font-bold tracking-tight text-xl text-white font-poppins">
              affinity
            </span>
          </Link>
          <nav className="mx-6 flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="/docs/overview" className="transition-colors hover:text-white">Docs</Link>
            <Link href="/docs/features/core-viewer" className="transition-colors hover:text-white">Features</Link>
            <Link href="/docs/themes" className="transition-colors hover:text-white">Themes</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full max-w-sm">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex w-full items-center space-x-2 rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-slate-400 hover:bg-black/40"
              >
                <span className="flex-1 text-left">Search documentation...</span>
                <kbd className="rounded bg-white/10 px-1.5 text-[10px] font-medium text-slate-300">⌘K</kbd>
              </button>
            </div>
          </div>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
