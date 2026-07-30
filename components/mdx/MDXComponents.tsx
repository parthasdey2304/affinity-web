import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { getShikiHighlighter } from "@/lib/shiki";
import React from 'react';

async function HighlightedCode({ code, language }: { code: string, language: string }) {
  const highlighter = await getShikiHighlighter();
  let html = highlighter.codeToHtml(code, { lang: language, theme: 'one-dark-pro' });
  
  if (language === 'bash' || language === 'sh') {
    // Add select-none to $ spans to make them unselectable and separate from the command
    html = html.replace(
      /<span class="line"><span style="([^"]+)">\$<\/span>/g,
      '<span class="line"><span style="$1" class="select-none opacity-50 pointer-events-none w-4 inline-block">$</span>'
    );
  }

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} className="[&>pre]:!bg-transparent [&>pre]:!p-0" />;
}

export const MDXComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold font-poppins text-[var(--affinity-text-base)] mb-6 mt-10" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold font-poppins text-[var(--affinity-text-base)] mb-4 mt-12 border-b border-[var(--affinity-glass-border)] pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-medium font-poppins text-[var(--affinity-primary)] mb-3 mt-8" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-[var(--affinity-text-muted)] text-lg" {...props} />,
  a: (props: any) => <a className="text-[var(--affinity-primary)] hover:text-blue-500 underline decoration-[var(--affinity-primary)]/30 hover:decoration-[var(--affinity-primary)]/80 underline-offset-4 transition-colors" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-[var(--affinity-text-muted)] text-lg" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  pre: (props: any) => {
    const codeProps = props.children?.props || {};
    const className = codeProps.className || '';
    const matches = className.match(/language-(.*)/);
    const language = matches ? matches[1] : 'text';
    const code = codeProps.children || '';

    let filename: string | null = language === 'text' ? 'affinity' : `example.${language}`;
    let displayCode = code;

    if (typeof code === 'string') {
      const lines = code.split('\n');
      const firstLine = lines[0]?.trim() || '';
      
      if (firstLine.startsWith('// filename:')) {
        filename = firstLine.replace('// filename:', '').trim();
        displayCode = lines.slice(1).join('\n').replace(/^\n/, '');
      } else if (firstLine === '// no-filename') {
        filename = null;
        displayCode = lines.slice(1).join('\n').replace(/^\n/, '');
      } else if (firstLine.startsWith('# filename:')) {
        filename = firstLine.replace('# filename:', '').trim();
        displayCode = lines.slice(1).join('\n').replace(/^\n/, '');
      } else if (firstLine === '# no-filename') {
        filename = null;
        displayCode = lines.slice(1).join('\n').replace(/^\n/, '');
      }
    }

    return (
      <div className="my-8">
        <TerminalWindow filename={filename} rawCode={displayCode}>
          <React.Suspense fallback={<div className="p-4 text-slate-500">Loading code...</div>}>
            {/* @ts-ignore */}
            <HighlightedCode code={displayCode} language={language} />
          </React.Suspense>
        </TerminalWindow>
      </div>
    );
  },
  code: (props: any) => {
    // If it's a block code (has a newline), we shouldn't style it as inline
    if (typeof props.children === 'string' && props.children.includes('\n')) {
      return <code {...props} />;
    }
    return <code className="bg-black/5 dark:bg-white/10 text-[var(--affinity-text-code)] px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-[var(--affinity-glass-border)] shadow-sm" {...props} />;
  },
};
