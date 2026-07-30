"use client"

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  title: string;
  href: string;
  section?: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { data: nav } = useSWR('/api/nav', fetcher);
  const router = useRouter();
  
  const searchIndex = useMemo(() => {
    if (!nav) return [];
    const items: SearchItem[] = [];
    
    Object.entries(nav).forEach(([key, value]: [string, any]) => {
      if (value.items) {
        Object.entries(value.items).forEach(([subKey, subItem]: [string, any]) => {
          items.push({
            title: subItem.title,
            href: `/docs/${key}/${subKey}`,
            section: value.title
          });
        });
      } else {
        items.push({
          title: value.title,
          href: `/docs/${key}`,
          section: 'General'
        });
      }
    });
    
    return items;
  }, [nav]);

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return searchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.section?.toLowerCase().includes(lowerQuery) ||
      item.href.toLowerCase().includes(lowerQuery)
    );
  }, [query, searchIndex]);

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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/40 dark:bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[var(--affinity-surface)] border border-[var(--affinity-glass-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-black/10 dark:border-white/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--affinity-text-muted)] mr-3">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="flex-1 bg-transparent border-none outline-none text-[var(--affinity-text-base)] placeholder-[var(--affinity-text-muted)] text-lg font-poppins"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results.length > 0) {
                router.push(results[0].href);
                onClose();
              }
            }}
          />
          <button onClick={onClose} className="px-2 py-1 text-xs rounded bg-black/5 dark:bg-white/10 text-[var(--affinity-text-muted)] hover:bg-black/10 dark:hover:bg-white/20">
            ESC
          </button>
        </div>
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {query.length > 0 ? (
            results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((result, idx) => (
                  <li key={result.href}>
                    <Link 
                      href={result.href}
                      onClick={onClose}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-500/10 dark:hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="text-[var(--affinity-text-base)] font-medium group-hover:text-[var(--affinity-primary)] dark:group-hover:text-blue-400">
                          {result.title}
                        </span>
                        <span className="text-xs text-[var(--affinity-text-muted)] mt-0.5">
                          {result.section}
                        </span>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 text-[var(--affinity-text-muted)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12 text-[var(--affinity-text-muted)]">
                No results found for "{query}"
              </div>
            )
          ) : (
            <div className="text-center py-12 text-[var(--affinity-text-muted)]">
              Start typing to search documentation...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
