import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Post } from '../../../../payload-types';
import { unstable_cache } from 'next/cache';
import { RichText } from '@/components/payload/rich-text';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Load post data - separate function for reuse in metadata
async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
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
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await unstable_cache(getPost, ['post', slug], {
    tags: ['post', slug],
  })(slug);

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
  console.log(post);
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 bg-primary">
      <h1 className="text-3xl font-bold mb-4">{post.title || 'Untitled Post'}</h1>
      <div className="text-sm text-gray-200 mb-6">
        Posted: {new Date(post.createdAt).toLocaleDateString()}
        {post.updatedAt !== post.createdAt &&
          ` (Updated: ${new Date(post.updatedAt).toLocaleDateString()})`}
      </div>
      <RichText data={post.content as SerializedEditorState} />
    </article>
  );
}
