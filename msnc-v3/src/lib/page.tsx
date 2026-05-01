import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogBySlug } from '@/lib/payload'
import type { Blog, Media } from '@/types/payload-types'
import Container from '@/components/ui/Container'
import { format } from 'date-fns'
import FallbackImage from '@/components/ui/FallbackImage'

// A very simple Lexical content renderer. NOTE: This is a basic implementation.
// For full feature support (e.g., uploads, custom elements), a more robust
// renderer like `@payloadcms/richtext-react` would be needed.
const RichText = ({ content }: { content: any }) => {
    if (!content?.root?.children) return null;

    const serializeNode = (node: any, index: number): React.ReactNode => {
        if (node.type === 'text') {
            let text: React.ReactNode = node.text;
            if (node.bold) text = <strong key={index}>{text}</strong>;
            if (node.italic) text = <em key={index}>{text}</em>;
            if (node.underline) text = <u key={index}>{text}</u>;
            if (node.strikethrough) text = <s key={index}>{text}</s>;
            return text;
        }

        if (!node) return null;

        const children = node.children?.map((child: any, i: number) => serializeNode(child, i));

        switch (node.type) {
            case 'h1': return <h1 key={index}>{children}</h1>;
            case 'h2': return <h2 key={index}>{children}</h2>;
            case 'h3': return <h3 key={index}>{children}</h3>;
            case 'h4': return <h4 key={index}>{children}</h4>;
            case 'p': return <p key={index}>{children}</p>;
            case 'quote': return <blockquote key={index}>{children}</blockquote>;
            case 'ul': return <ul key={index}>{children}</ul>;
            case 'ol': return <ol key={index}>{children}</ol>;
            case 'li': return <li key={index}>{children}</li>;
            case 'link': return <a href={node.url} key={index} target={node.newTab ? '_blank' : '_self'} rel="noopener noreferrer">{children}</a>;
            // Fallback for unknown block types
            default: return <p key={index}>{children}</p>;
        }
    };

    return (
        <div className="prose-msnc">
            {content.root.children.map((node: any, i: number) => serializeNode(node, i))}
        </div>
    );
};


export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog: Blog | null = await getBlogBySlug(params.slug)

  if (!blog) {
    return notFound()
  }

  const { title, content, featuredImage, createdAt, excerpt } = blog;
  
  // Type guard to ensure featuredImage is a Media object
  const hasImage = (img: number | Media | null | undefined): img is Media => {
    return typeof img === 'object' && img !== null && 'url' in img;
  }

  const imageUrl = hasImage(featuredImage) && featuredImage.url ? featuredImage.url : '/media/logo.png';
  const imageAlt = hasImage(featuredImage) && featuredImage.alt ? featuredImage.alt : title;

  return (
    <main className="bg-white">
      <article>
        <header className="relative bg-slate-50 py-24 sm:py-32 border-b border-slate-200">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base font-semibold leading-7 text-sky-600">
                {format(new Date(createdAt), 'MMMM d, yyyy')}
              </p>
              <h1 className="mt-2 text-2xl text-primary sm:text-3xl md:text-4xl">
                {title}
              </h1>
              {excerpt && (
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {excerpt}
                </p>
              )}
            </div>
          </Container>
        </header>

        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.5/1] w-full">
          <FallbackImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover bg-slate-100"
            fallbackSrc="/media/logo.png"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="py-16 sm:py-24">
            <Container className="max-w-3xl mx-auto">
                <RichText content={content} />
            </Container>
        </div>
      </article>
    </main>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = await getBlogBySlug(params.slug)
    
    if (!blog) return { title: 'Not Found' }

    const { title, excerpt } = blog;

    return {
        title: `${title} | MSNC Journal`,
        description: excerpt || "An article from the Mulenge Scholars' Network Canada Journal.",
    }
}