'use client';

import React, { useEffect } from 'react';
import { Gathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import ProgressCard from './ProgressCard';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import useFilterStore from '@/stores/filterStore';

const limit = 10;

const ProgressCardList = ({ gatherings }: { gatherings: Gathering[] }) => {
  const { location, date, sortBy, type } = useFilterStore();
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryFn: async ({ pageParam = 0 }) => {
      const axios = getInstance();
      const params = buildFilteredParams({
        offset: pageParam,
        limit,
        location: location !== '지역 선택' ? location : undefined,
        date: date !== '날짜 선택' ? date : undefined,
        sortBy: sortBy === '마감 임박' ? 'dateTime' : 'participantCount',
        type: type !== 'DALLAEMFIT' ? type : undefined,
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
    queryKey: ['gatherings', location, date, sortBy, type],
    initialData: {
      pages: [gatherings],
      pageParams: [0],
    },
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (location === '지역 선택' && date === '' && sortBy === '' && type === 'DALLAEMFIT') {
      refetch();
    } else {
      refetch();
    }
  }, [location, date, sortBy, type]);

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      {data?.pages.flat().length > 0 ? (
        data.pages
          .flat()
          .map((gathering, index) => <ProgressCard key={index} gathering={gathering} />)
      ) : (
        <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
          <p className="h-10 text-sm font-medium text-center text-gray-500">
            아직 모임이 없어요. <br />
            지금 바로 모임을 만들어보세요.
          </p>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default ProgressCardList;

// 필터링된 params 객체를 반환하는 함수
export function buildFilteredParams(params: { [key: string]: string | undefined | number }) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''),
  );
}
