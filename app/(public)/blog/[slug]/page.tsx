import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Post } from '../../../../payload-types';
import { unstable_cache } from 'next/cache';
import { RichText } from '@/components/payload/rich-text';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

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

  const supabase = await createClient();
  const { data: imageData } = await supabase.storage
    .from('supabase-payload')
    .getPublicUrl(
      `media/${post['hero image'] && typeof post['hero image'] === 'object' ? post['hero image'].filename || '' : ''}`,
    );

  const imageUrl = imageData.publicUrl;
  console.log('imageUrl', imageUrl);

  return (
    <section className="px-4 py-8">
      {post['hero image'] && (
        <header className="flex flex-col-reverse md:flex-row mb-8 gap-8 container mx-auto">
          <div className="flex-1 flex flex-col gap-3 justify-center">
            <h1 className="text-3xl md:text-5xl leading-tight text-foreground text-balance">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Posted: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex-1 relative min-h-48 md:min-h-80 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title || 'Blog post hero image'}
              className="object-cover"
              fill={true}
            />
          </div>
        </header>
      )}
      <article className="container-fluid mx-auto border-t border-border pb-8">
        <div className="max-w-2xl mx-auto py-12">
          <RichText data={post.content as SerializedEditorState} />
        </div>
      </article>
    </section>
  );
}
