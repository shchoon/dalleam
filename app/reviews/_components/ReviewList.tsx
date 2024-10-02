'use client';

import Chip from '@/components/chip/Chip';
import React from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { useReviewsInfiniteQuery } from '@/services/reviews';
import { getReviewsUrl } from '@/services/reviews';

// 클라이언트로 수정하기
export default function ReviewList() {
  const { typeTab, reviewUrl } = getReviewsUrl();

  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } = useReviewsInfiniteQuery(
    ['reviews', { type: typeTab }],
    reviewUrl,
  );

  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.3 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        {/* 리뷰 드롭다운 Tab */}
        <div className="flex justify-between items-start self-stretch">
          <div className="flex items-start gap-2">
            <Chip className="border-2 border-gray-100" color="white" size="sm">
              지역 선택&nbsp; ▼
            </Chip>
            <Chip className="border-2 border-gray-100" color="white" size="sm">
              날짜 선택&nbsp; ▼
            </Chip>
          </div>
          <span className="flex p-6pxr flex-col items-start gap-10pxr rounded-xl border-2 border-gray-100 bg-white">
            ↑↓
          </span>
        </div>
        {/* 리뷰 리스트 */}
        <div className="relative flex flex-col items-start gap-6 self-stretch">
          {data?.pages.map((page) =>
            page.map((review, idx) => <ReviewCard key={idx} {...review} isMyPage={false} />),
          )}
          {isFetchingNextPage && <div className="flex justify-center">Loading...</div>}
        </div>
        <div
          className="absolute w-full left-0 bottom-0 -z-10 h-20 border-2"
          ref={observerRef}
        ></div>
      </div>
    </div>
  );
}
