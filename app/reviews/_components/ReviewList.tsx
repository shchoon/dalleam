'use client';

import React from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { useReviewsInfiniteQuery, getReviewsUrl } from '@/services/reviews';
import LocationFilter from '@/components/filter/LocationFilter';
import DateFilter from '@/components/filter/DateFilter';
import SortByFilter from '@/components/filter/SortByFilter';
import SkeletonList from './skeletonComponents/SkeletonList';
import SkeletonCard from './skeletonComponents/SkeletonCard';

export default function ReviewList() {
  const { reviewUrl, queryKeys } = getReviewsUrl();
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useReviewsInfiniteQuery(queryKeys, reviewUrl);
  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.3 });

  if (!data?.pages[0].length)
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        불러올 데이터가 없습니다.
      </div>
    );
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;
  if (isLoading) return <SkeletonList />;

  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        {/* 리뷰 드롭다운 Tab */}
        <div className="flex justify-between items-start self-stretch">
          <div className="flex items-start gap-2">
            <LocationFilter />
            <DateFilter />
          </div>
          <SortByFilter isReviewPage={true} />
        </div>
        <div className="relative flex flex-col items-start gap-6 self-stretch">
          {data?.pages.map((page) =>
            page.map((review, idx) => <ReviewCard key={idx} {...review} isMyPage={false} />),
          )}
          {isFetchingNextPage && <SkeletonCard />}
        </div>
        {hasNextPage && (
          <div
            className="absolute w-full left-0 bottom-0 -z-10 h-20 border-2"
            ref={observerRef}
          ></div>
        )}
      </div>
    </div>
  );
}
