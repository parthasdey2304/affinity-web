"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpen(true)}
        className="p-2 mr-2 rounded-md hover:bg-white/10 text-slate-300 transition-colors"
        aria-label="Open menu"
      >
        <Menu suppressHydrationWarning className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex" onClick={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-72 max-w-[82vw] h-screen flex flex-col shadow-2xl animate-in slide-in-from-left duration-250"
            style={{ background: 'var(--affinity-base)', borderRight: '1px solid rgba(255,255,255,0.18)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--affinity-glass-border)]">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <svg suppressHydrationWarning width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                  <path d="M4 17l6-6-6-6M12 19h8" />
                </svg>
                <span className="font-bold text-lg text-[var(--affinity-text-base)] tracking-tight">affinity</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-[var(--affinity-text-muted)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar nav */}
            <div className="overflow-y-auto flex-1 pt-2 pb-8">
              <Sidebar mobile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
