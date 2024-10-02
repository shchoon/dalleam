import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteObserver = (callback: () => void, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);

  const intersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(); // 교차할 때 콜백 호출
        }
      });
    },
    [callback], // callback이 변경될 때만 새로 생성
  );

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(intersectionObserverCallback, options);
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [intersectionObserverCallback, options, ref.current]);

  return ref;
};
