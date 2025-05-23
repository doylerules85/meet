import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Post } from '../../../payload-types';

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
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title || 'Untitled Post'}</h1>
      <div className="text-sm text-gray-500 mb-6">
        Posted: {new Date(post.createdAt).toLocaleDateString()}
        {post.updatedAt !== post.createdAt &&
          ` (Updated: ${new Date(post.updatedAt).toLocaleDateString()})`}
      </div>
    </article>
  );
}
