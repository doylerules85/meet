import BlogGallery from '@/components/blog/blog-gallery';
import { Suspense } from 'react';

export default function Blog() {
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
      <Suspense fallback={<div className="text-center text-foreground">Loading...</div>}>
        <BlogGallery />
      </Suspense>
    </section>
  );
}
