import { cn } from "@/lib/utils";

interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  filename?: string;
}

export function TerminalWindow({ children, className, filename = "affinity", ...props }: TerminalWindowProps) {
  return (
    <div className={cn("terminal-chrome flex flex-col font-mono text-[13px] shadow-2xl", className)} {...props}>
      <div className="flex items-center px-4 py-2 border-b border-white/10 bg-black/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex-1 text-center text-slate-400 select-none">
          {filename}
        </div>
      </div>
      <div className="p-4 overflow-x-auto overflow-y-auto max-h-[400px] bg-[#0A0F1E]">
        {children}
      </div>
    </div>
  );
}
