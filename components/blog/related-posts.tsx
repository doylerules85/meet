import { getPayload } from 'payload';
import config from '@payload-config';
import { Post } from '@/payload-types';
import Link from 'next/link';
import Image from 'next/image';
import * as motion from 'motion/react-client';

const RelatedPosts = async ({ currentPost }: { currentPost: Post }) => {
  const payload = await getPayload({ config });
  const relatedPosts = await payload.find({
    collection: 'posts',
    limit: 3,
    where: {
      slug: {
        not_equals: currentPost.slug,
      },
    },
  });
  return (
    <div className="container mx-auto border-t border-border pt-12">
      <h2 className="text-2xl lg:text-3xl uppercase tracking-wider">Read more from the blog</h2>
      <motion.div
        transition={{ staggerChildren: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
      >
        {relatedPosts.docs.map((post) => (
          <motion.div
            key={post.id}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15, type: 'spring', stiffness: 100, delay: 0.25 }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedPosts;
