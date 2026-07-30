import { getDocBySlug, getAllDocs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import Image from 'next/image';

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((slug) => ({
    slug,
  }));
}

export default async function DocPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const doc = await getDocBySlug(params.slug);
  
  if (!doc) {
    notFound();
  }
  
  return (
    <article className="prose prose-blue max-w-4xl font-sans dark:prose-invert text-[var(--affinity-text-muted)]">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-bold text-[var(--affinity-text-base)] mb-2 font-poppins">{doc.frontmatter.title}</h1>
          {doc.frontmatter.description && (
            <p className="text-xl text-[var(--affinity-text-muted)] mb-0">{doc.frontmatter.description}</p>
          )}
        </div>
        <Image suppressHydrationWarning src="/icon.png" alt="Affinity" width={96} height={96} className="rounded-2xl shrink-0 mt-1 not-prose border border-white/30" />
      </div>
      
      <div className="mt-8">
        <MDXRemote 
          source={doc.content} 
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            }
          }}
        />
      </div>
    </article>
  );
}
