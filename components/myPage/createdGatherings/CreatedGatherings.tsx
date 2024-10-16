'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Card from '@/components/card/Card';

import { Gathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';

type Props = {
  initialCreatedGatherings: Gathering[];
  userId: number;
};

export default function CreatedGatherings({ initialCreatedGatherings, userId }: Props) {
  const { ref, inView } = useInView();

  const getCreatedGathering = async (offset: number) => {
    const instance = getInstance();
    const res = await instance('/gatherings', {
      params: {
        limit: 10,
        offset: offset,
        createdBy: userId,
        sortBy: 'dateTime',
        sortOrder: 'desc',
      },
    });

    return res.data;
  };

  const {
    data: createdGatherings,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['getCreatedatherings'],
    queryFn: ({ pageParam }) => getCreatedGathering(pageParam),
    initialPageParam: 0,
    initialData: {
      pages: [initialCreatedGatherings],
      pageParams: [0],
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.flat().length;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="pt-6 min-h-[60vh] flex justify-center">
        {createdGatherings.pages.flat().length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">아직 만든 모임이 없어요</span>
          </div>
        ) : (
          <div aria-label="createdGatherings" className="flex flex-col gap-6">
            {createdGatherings.pages.flat().map((gathering) => {
              return <Card normal gathering={gathering} key={gathering.id} />;
            })}
          </div>
        )}
      </div>
      {!isFetching && hasNextPage && <div ref={ref}></div>}
    </>
  );
}
