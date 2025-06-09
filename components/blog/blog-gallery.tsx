import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { Post } from '@/payload-types';
import BlogGrid from '@/components/ui/blog-grid';
import { unstable_cache } from 'next/cache';
import Image from 'next/image';

const fetchPosts = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config });
      const response = await payload.find({
        collection: 'posts',
        depth: 1,
      });
      return response.docs;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
  ['posts'],
  { revalidate: 60, tags: ['posts'] },
);

const BlogGallery = async () => {
  const posts: Post[] = await fetchPosts();

  return (
    <BlogGrid>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug || ''}`} passHref>
            <article className="text-foreground border border-foreground rounded-md p-4 relative aspect-video group overflow-hidden">
              {post.featuredImage &&
                typeof post.featuredImage === 'object' &&
                post.featuredImage.url && (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title || 'Blog post'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 group-hover:from-black/70 transition-all duration-300"></div>
              <h2 className="text-white text-xl lg:text-2xl z-10 absolute bottom-0 left-0 right-0 p-4">
                {post.title}
              </h2>
            </article>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center p-8">
          <p>No blog posts found.</p>
        </div>
      )}
    </BlogGrid>
  );
};

export default BlogGallery;
