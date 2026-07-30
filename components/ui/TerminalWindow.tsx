import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/ui/CopyButton";

interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  filename?: string | null;
  rawCode?: string;
}

export function TerminalWindow({ children, className, filename = "affinity", rawCode, ...props }: TerminalWindowProps) {
  return (
    <div className={cn("glass-panel overflow-hidden flex flex-col font-mono text-[13.5px] shadow-2xl my-6 relative group", className)} {...props}>
      <div suppressHydrationWarning className="flex items-center px-4 py-3 border-b backdrop-blur-md" style={{background: 'var(--terminal-header-bg)', borderColor: 'var(--terminal-border)'}}>
        <div className="flex space-x-2 w-16">
          <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="flex-1 text-center text-slate-300 font-medium select-none tracking-wide text-xs">
          {filename && filename.trim() !== '' ? filename : ''}
        </div>
        <div className="w-16 flex justify-end">
          {rawCode && <CopyButton text={rawCode} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      </div>
      <div suppressHydrationWarning className="p-5 overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar leading-relaxed" style={{background: 'var(--terminal-body-bg)', color: 'var(--terminal-text)'}}>
        {children}
      </div>
    </div>
  );
}
