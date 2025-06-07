import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { Post } from '@/payload-types';
import BlogGrid from '@/components/ui/blog-grid';

const BlogGallery = async () => {
  // Get posts without relying on hero_image_id
  let posts: Post[] = [];

  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'posts',
    });
    posts = response.docs;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <BlogGrid>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug || ''}`} passHref>
            <article className="text-foreground border border-foreground rounded-md p-4 relative aspect-video group overflow-hidden">
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-all duration-300"></div>
              <h2 className="text-foreground text-xl lg:text-2xl z-10 absolute bottom-0 left-0 right-0 p-4">
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
