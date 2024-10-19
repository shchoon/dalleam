'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { useReviewsInfiniteQuery, getReviewsUrl } from '@/services/reviews';
import LocationFilter from '@/components/filter/LocationFilter';
import DateFilter from '@/components/filter/DateFilter';
import SortByFilter from '@/components/filter/SortByFilter';
import SkeletonList from './skeletonComponents/SkeletonList';
import SkeletonCard from './skeletonComponents/SkeletonCard';
import DeferredComponent from '@/components/DeferredComponent';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/utils/className';

export default function ReviewList() {
  const topFog =
    'before:w-full before:sticky before:left-0 before:z-20 before:h-[70px] before:bg-gradient-to-t before:from-listColor-toColor before:to-listColor-fromColor before:top-0';
  const bottomFog =
    'after:w-full after:sticky after:left-0 after:z-20 after:h-[70px] after:bg-gradient-to-t after:from-listColor-fromColor after:to-listColor-toColor after:bottom-0';

  const [topFogOn, setTopFogOn] = useState(false);
  const [bottomFogOn, setBottomFogOn] = useState(false);

  const { ref: topRef } = useInView({
    threshold: 0, // 최소한으로 걸쳤을 때 감지
    onChange: (inView) => {
      if (!inView) {
        setTopFogOn(true);
      } else {
        setTopFogOn(false);
      }
    },
  });

  const { ref: bottomRef } = useInView({
    threshold: 0, // 최소한으로 걸쳤을 때 감지
    onChange: (inView) => {
      if (!inView) {
        setBottomFogOn(true);
      } else {
        setBottomFogOn(false);
      }
    },
  });

  const { reviewUrl, queryKeys } = getReviewsUrl();
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useReviewsInfiniteQuery(queryKeys, reviewUrl);
  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.2 });

  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;
  if (!data?.pages[0].length)
    return (
      <DeferredComponent>
        <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
          불러올 데이터가 없습니다.
        </div>
      </DeferredComponent>
    );
  if (isLoading)
    return (
      <DeferredComponent>
        <SkeletonList />
      </DeferredComponent>
    );

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
        <div
          className={cn(
            `${topFogOn && topFog} ${bottomFogOn && bottomFog} relative flex flex-col items-start gap-6 self-stretch`,
          )}
        >
          {/* inView로 감지할 타겟 요소 */}
          {data?.pages.map((page) =>
            page.map((review, idx) => (
              <div key={idx} className="relative w-full">
                {idx === 0 && (
                  <div ref={topRef} className="w-full absolute z-20 -top-6 left-0 h-6"></div>
                )}
                <ReviewCard {...review} isMyPage={false} />
              </div>
            )),
          )}
          <div ref={bottomRef} className="w-full z-20 bottom-6 left-0 h-6"></div>
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
