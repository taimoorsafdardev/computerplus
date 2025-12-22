import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/layout/footer';

// This function tells Next.js which routes to generate at build time
export async function generateStaticParams() {
  const legalDir = path.join(process.cwd(), 'public', 'legal');
  try {
    const files = fs.readdirSync(legalDir);

    return files.map((filename) => ({
      slug: filename.replace(/\.md$/, ''),
    }));
  } catch (error) {
    // If the directory doesn't exist, return an empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper to get markdown content
function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), 'public', 'legal', `${slug}.md`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}


export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = getMarkdownContent(slug);

  if (!content) {
    notFound();
  }

  // Extract title from the first line (e.g., # Title)
  const title = content.split('\n')[0].replace(/^#\s*/, '') || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-28 py-12">
          <article className="prose lg:prose-xl dark:prose-invert max-w-none">
            <h1>{title}</h1>
            <ReactMarkdown>{content.substring(content.indexOf('\n') + 1)}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
