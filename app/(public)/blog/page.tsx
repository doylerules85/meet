import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import Image from 'next/image';

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

const Blog = async () => {
  const data = await getPosts();
  return (
    <section>
      <header className="h-60 relative px-12 flex items-center">
        <div>
          <h1 className="text-6xl text-foreground uppercase">Blog</h1>
          <p className="text-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </header>

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
