import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteObserver = (callback: () => void, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const intersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      console.log('call');
      console.log('entries =', entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          callback();
        }
      });
    },
    [callback],
  );

  useEffect(() => {
    console.log('ref = ', ref);
    if (!ref.current) return;

    const observer = new IntersectionObserver(intersectionObserverCallback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return ref;
};
