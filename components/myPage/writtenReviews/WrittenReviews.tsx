'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import ReviewCard from '@/components/card/ReviewCard';

import { Review } from '@/lib/definition';
import { getInstance } from '@/utils/axios';

type Props = {
  initialWrittenReviews: Review[];
  userId: number;
};

export default function WrittenReviews({ initialWrittenReviews, userId }: Props) {
  console.log(initialWrittenReviews);
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData(['writtenReviews']));
  const getWrittenReviews = async (offset: number) => {
    const instance = getInstance();

    const res = await instance('/reviews', {
      params: {
        userId: userId,
        limit: 10,
        offset: offset,
      },
    });

    return res.data;
  };

  const {
    data: writtenReviews,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['writtenReviews'],
    queryFn: ({ pageParam }) => getWrittenReviews(pageParam),
    initialPageParam: 0,
    initialData: {
      pages: initialWrittenReviews,
      pageParams: [0],
    },
    enabled: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined;
      }

      return allPages.flat().length;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex justify-center min-h-[60vh] bg-white">
      {writtenReviews.pages.flat().length === 0 ? (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500">아직 작성한 리뷰가 없어요</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {writtenReviews.pages.flat().map((review, i) => {
            return <ReviewCard key={i} {...review} isMyPage />;
          })}
        </div>
      )}
      {!isFetching && hasNextPage && <div ref={ref}></div>}
    </div>
  );
}
