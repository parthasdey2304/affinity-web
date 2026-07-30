"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpen(true)}
        className="p-2 mr-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-[var(--color-affinity-base)] border-r border-[var(--color-affinity-glass-border)] shadow-2xl flex flex-col pt-5 animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-y-auto h-full pb-20 mt-4">
              <Sidebar mobile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
