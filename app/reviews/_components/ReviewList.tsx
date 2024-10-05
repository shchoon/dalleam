'use client';

import React from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { useReviewsInfiniteQuery } from '@/services/reviews';
import { getReviewsUrl } from '@/services/reviews';
import LocationFilter from '@/components/filter/LocationFilter';
import DateFilter from '@/components/filter/DateFilter';
import SortByFilter from '@/components/filter/SortByFilter';

// 클라이언트로 수정하기
export default function ReviewList() {
  const { type, location, reviewUrl, reviewSortBy, date } = getReviewsUrl();

  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useReviewsInfiniteQuery(
      [['reviews'], { type: type, location: location, sortBy: reviewSortBy, date: date }],
      reviewUrl,
    );

  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.3 });

  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        {/* 리뷰 드롭다운 Tab */}
        <div className="flex justify-between items-start self-stretch">
          <div className="flex items-start gap-2">
            <LocationFilter />
            <DateFilter />
          </div>
          <SortByFilter />
        </div>
        {/* 리뷰 리스트 */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="relative flex flex-col items-start gap-6 self-stretch">
            {data?.pages.map((page) =>
              page.map((review, idx) => <ReviewCard key={idx} {...review} isMyPage={false} />),
            )}
            {isFetchingNextPage && <div className="flex justify-center">Loading...</div>}
          </div>
        )}
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
