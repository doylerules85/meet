import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/payload-types';
import BlogGrid from '@/components/ui/blog-grid';

// Extended type for posts with image URLs
type PostWithImage = Post & {
  imageUrl: string;
};

const getPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    return await payload.find({
      collection: 'posts',
    });
  },
  ['posts'],
  {
    revalidate: 30,
  },
);

// Helper function to get image URLs (not cached)
async function getPostImagesUrls(posts: Post[]): Promise<PostWithImage[]> {
  const supabase = await createClient();

  return Promise.all(
    posts.map(async (post) => {
      let imageUrl = '';

      if (
        post['hero image'] &&
        typeof post['hero image'] === 'object' &&
        'filename' in post['hero image'] &&
        post['hero image'].filename
      ) {
        const { data } = await supabase.storage
          .from('supabase-payload')
          .getPublicUrl(`media/${post['hero image'].filename}`);

        imageUrl = data.publicUrl;
      }

      return {
        ...post,
        imageUrl,
      };
    }),
  );
}

const Blog = async () => {
  // Get posts from cache
  const postsData = await getPosts();

  // Get image URLs (not cached)
  const postsWithImages = await getPostImagesUrls(postsData.docs);

  return (
    <section className="px-4 py-4 lg:py-8">
      <header className="h-40 lg:h-60 relative flex items-center container mx-auto border-b border-foreground">
        <div>
          <h1 className="text-4xl lg:text-6xl text-foreground uppercase mb-2">Blog</h1>
          <p className="text-foreground">
            The latest news, tips, and tricks for teachers. By teachers.
          </p>
        </div>
      </header>

      <BlogGrid>
        {postsWithImages.map((doc) => (
          <Link key={doc.id} href={`/blog/${doc.slug || ''}`} passHref>
            <article className="text-foreground border border-foreground rounded-md p-4 relative aspect-video group overflow-hidden opacity-0 min-h-auto">
              {doc.imageUrl && (
                <Image
                  src={doc.imageUrl}
                  alt={doc.title || ''}
                  fill={true}
                  className="object-cover group-hover:scale-105 transition-all duration-300"
                />
              )}
              <div className="absolute inset-0 bg-foreground/45"></div>
              <h2 className="text-white text-xl lg:text-2xl z-10 absolute bottom-0 left-0 right-0 p-4">
                {doc.title}
              </h2>
            </article>
          </Link>
        ))}
      </BlogGrid>
    </section>
  );
};

export default Blog;
