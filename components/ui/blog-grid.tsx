'use client';

import { useEffect } from 'react';
import { stagger, useAnimate } from 'motion/react';

const BlogGrid = ({ children }: { children: React.ReactNode }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'article',
      { opacity: 1 },
      { duration: 0.5, delay: stagger(0.5, { startDelay: 0 }), ease: 'easeInOut' },
    );
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-4 my-12 container mx-auto" ref={scope}>
      {children}
    </div>
  );
};

export default BlogGrid;
