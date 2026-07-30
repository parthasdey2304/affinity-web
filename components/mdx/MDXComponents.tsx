import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { getShikiHighlighter } from "@/lib/shiki";
import React from 'react';

async function HighlightedCode({ code, language }: { code: string, language: string }) {
  const highlighter = await getShikiHighlighter();
  const html = highlighter.codeToHtml(code, { lang: language, theme: 'one-dark-pro' });
  return <div dangerouslySetInnerHTML={{ __html: html }} className="[&>pre]:!bg-transparent [&>pre]:!p-0" />;
}

export const MDXComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold font-poppins text-white mb-6 mt-10" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold font-poppins text-white mb-4 mt-12 border-b border-[var(--color-affinity-glass-border)] pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-medium font-poppins text-blue-300 mb-3 mt-8" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-slate-300 text-lg" {...props} />,
  a: (props: any) => <a className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-400 underline-offset-4 transition-colors" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-slate-300 text-lg" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  pre: (props: any) => {
    const codeProps = props.children?.props || {};
    const className = codeProps.className || '';
    const matches = className.match(/language-(.*)/);
    const language = matches ? matches[1] : 'text';
    const code = codeProps.children || '';

    return (
      <div className="my-8">
        <TerminalWindow filename={language === 'text' ? 'affinity' : `example.${language}`}>
          <React.Suspense fallback={<div className="p-4 text-slate-500">Loading code...</div>}>
            {/* @ts-ignore */}
            <HighlightedCode code={code} language={language} />
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
    return <code className="bg-blue-950/40 text-blue-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-blue-500/20 shadow-sm" {...props} />;
  },
};
