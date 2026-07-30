import { getDocBySlug, getAllDocs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/mdx/MDXComponents';

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
    <article className="prose prose-invert prose-blue max-w-4xl font-sans text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-2 font-poppins">{doc.frontmatter.title}</h1>
      {doc.frontmatter.description && (
        <p className="text-xl text-slate-400 mb-8">{doc.frontmatter.description}</p>
      )}
      
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
