import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Post } from '../../../../payload-types';
import { RichText } from '@/components/payload/rich-text';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Image from 'next/image';
import RelatedPosts from '@/components/blog/related-posts';
import * as motion from 'motion/react-client';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Load post data - separate function for reuse in metadata
async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (!docs.length) {
      return null;
    }

    return docs[0] as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title || 'Blog Post',
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="px-4 py-8">
      <header className="mb-8 container mx-auto flex lg:flex-row flex-col gap-4 items-center">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl leading-tight text-foreground text-balance">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            Posted: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 100 }}
          className="relative aspect-video rounded-md overflow-hidden order-first lg:order-last h-auto flex-1 border border-foreground"
        >
          {post.featuredImage &&
            typeof post.featuredImage === 'object' &&
            post.featuredImage.url && (
              <Image
                src={post.featuredImage.url}
                alt={post.title || 'Blog post'}
                width={800}
                height={600}
                className="object-cover aspect-video h-auto w-full"
              />
            )}
        </motion.div>
      </header>
      <div className="container-fluid mx-auto border-t border-border pb-8">
        <div className="max-w-2xl mx-auto py-12">
          {post.content && <RichText data={post.content as SerializedEditorState} />}
        </div>
      </div>
      <RelatedPosts currentPost={post} />
    </section>
  );
}
