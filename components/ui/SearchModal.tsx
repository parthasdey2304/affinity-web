"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[var(--color-affinity-surface)] border border-[var(--color-affinity-glass-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-white/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 mr-3">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg font-poppins"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="px-2 py-1 text-xs rounded bg-white/10 text-slate-400 hover:bg-white/20">
            ESC
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.length > 0 ? (
             <div className="text-center py-8 text-slate-400">
               Coming soon: Full-text search with Pagefind.
             </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              Type to start searching...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
