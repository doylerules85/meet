import { getPayload } from 'payload';
import config from '@payload-config';

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return <div className="bg-primary">{data.docs[0].title}</div>;
};

export default BlogPost;
