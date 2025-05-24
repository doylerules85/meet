import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';

const getPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    return await payload.find({
      collection: 'posts',
    });
  },
  ['posts'],
  {
    revalidate: 60,
  },
);

const Blog = async () => {
  const data = await getPosts();
  return (
    <section className="p-4 bg-accent min-h-screen">
      <h1 className="text-6xl text-foreground">Blog</h1>
      <div className="grid lg:grid-cols-3 gap-4 my-12">
        {data.docs.map((doc) => (
          <Link
            key={doc.id}
            href={`/blog/${doc.slug}`}
            className="text-foreground border border-foreground rounded-md p-4"
          >
            <h2>{doc.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
