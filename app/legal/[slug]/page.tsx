import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params; // ✅ IMPORTANT

    const filePath = path.join(CONTENT_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const file = fs.readFileSync(filePath, 'utf-8');

    return (
        <article className="prose prose-slate max-w-4xl mx-auto py-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {file}
            </ReactMarkdown>
        </article>
    );
}
