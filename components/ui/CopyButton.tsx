"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      suppressHydrationWarning
      onClick={copy}
      className={cn(
        "p-1.5 rounded-md hover:bg-white/10 text-[var(--affinity-text-muted)] hover:text-white transition-colors duration-200",
        className
      )}
      aria-label="Copy code"
      title="Copy code"
    >
      {isCopied ? <Check suppressHydrationWarning className="w-4 h-4 text-green-500" /> : <Copy suppressHydrationWarning className="w-4 h-4" />}
    </button>
  );
}
