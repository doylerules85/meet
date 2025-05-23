import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';

const Blog = async () => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'posts',
  });
  return (
    <section className="p-4 bg-accent min-h-screen">
      <h1 className="text-6xl text-foreground">Blog</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.docs.map((doc) => (
          <Link key={doc.id} href={`/blog/${doc.slug}`}>
            <h2>{doc.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
