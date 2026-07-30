import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export async function getDocBySlug(slug: string[]) {
  const realSlug = slug.join('/');
  const fullPath = path.join(contentDir, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    frontmatter: data,
    content,
  };
}

export function getAllDocs() {
  const docs: string[][] = [];
  
  function walk(dir: string, currentPath: string[] = []) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath, [...currentPath, file]);
      } else if (file.endsWith('.mdx')) {
        docs.push([...currentPath, file.replace(/\.mdx$/, '')]);
      }
    }
  }
  
  walk(contentDir);
  return docs;
}
