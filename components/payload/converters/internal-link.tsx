import { SerializedLinkNode } from '@payloadcms/richtext-lexical';

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;

  // Check if value is an object and has a slug property
  const slug = typeof value === 'object' && value !== null && 'slug' in value ? value.slug : '';

  if (relationTo === 'posts') {
    return `/blog/${slug}`;
  } else {
    return `/${slug}`;
  }
};
