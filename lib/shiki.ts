import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter | null = null;

export async function getShikiHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['python', 'bash', 'json', 'yaml', 'toml', 'javascript', 'typescript'],
    });
  }
  return highlighter;
}
