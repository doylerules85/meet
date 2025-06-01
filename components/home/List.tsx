import { useEffect } from 'react';
import { stagger, useAnimate } from 'motion/react';

const List = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'li',
      { opacity: 1 },
      { duration: 1, delay: stagger(1, { startDelay: delay }), ease: 'easeInOut' },
    );
  }, []);

  return (
    <ul className="flex flex-col items-start gap-2" ref={scope}>
      {children}
    </ul>
  );
};

export default List;
