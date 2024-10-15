'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Gathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import ProgressCard from './ProgressCard';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import useFilterStore from '@/stores/filterStore';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { buildFilteredParams } from '@/utils/gathering';

const limit = 10;
const INITIAL_QUERY_KEY = 'gatherings,지역 선택,날짜 선택,마감 임박,DALLAEMFIT';

const ProgressCardList = ({ gatherings }: { gatherings: Gathering[] }) => {
  const { location, date, sortBy, type, resetFilters } = useFilterStore();

  const queryKey = ['gatherings', location, date, sortBy, type];

  const isInitialQuery = queryKey.toString() === INITIAL_QUERY_KEY;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam = 0 }) => {
      const axios = getInstance();
      const params = buildFilteredParams({
        offset: pageParam,
        limit,
        location: location !== '지역 선택' ? location : undefined,
        date: date !== '날짜 선택' ? date : undefined,
        sortBy: sortBy === '마감 임박' ? 'dateTime' : 'participantCount',
        type: type === 'DALLAEMFIT' ? 'DALLAEMFIT' : type,
        sortOrder: 'desc',
      });

      const response = await axios.get<Gathering[]>('gatherings', {
        params,
      });

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length * limit : undefined;
    },
    initialPageParam: 0,
    queryKey: queryKey,
    initialData: isInitialQuery
      ? {
          pages: [gatherings],
          pageParams: [0],
        }
      : undefined,
    staleTime: 1000 * 5 * 60,
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    resetFilters();
    return () => resetFilters();
  }, []);

  const { scrollY } = useScroll();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  });

  return (
    <div className="relative">
      {/* Content */}
      <div className="flex flex-col items-center gap-6 mt-6 relaive">
        <div
          className={`sticky top-0 w-full h-188pxr rounded-t-3xl z-0 ${isScrolling ? 'scrollShadowTop' : 'transparent'}`}
        />
        {data && data.pages.flat().length > 0 ? (
          <section className="space-y-6 -mt-210pxr -mb-208pxr" data-cy="Gathering List">
            {data.pages.flat().map((gathering) => (
              <ProgressCard key={gathering.id} gathering={gathering} />
            ))}
          </section>
        ) : (
          <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
            <p className="h-10 text-sm font-medium text-center text-gray-500">
              아직 모임이 없어요. <br />
              지금 바로 모임을 만들어보세요.
            </p>
          </div>
        )}
        <div
          className={`sticky bottom-0 w-full h-188pxr rounded-b-3xl z-0 ${isScrolling ? 'scrollShadowBottom' : 'transparent'}`}
        />
        <div ref={ref} data-cy="loader" className="w-full h-1pxr" />
      </div>
    </div>
  );
};

export default ProgressCardList;
