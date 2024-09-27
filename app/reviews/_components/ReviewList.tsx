'use client';

import Chip from '@/components/chip/Chip';
import React, { useEffect } from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { reviews } from '../data';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { getInstance } from '@/utils/axios';
import { Review } from '@/lib/definition';

// 클라이언트로 수정하기
export default function ReviewList() {
  const fetcher = getInstance(); // fetcher를 먼저 선언

  // 페이지 매개변수를 통해 리뷰 가져오기
  const getReviews = async ({ pageParam = 0 }): Promise<Review[]> => {
    console.log('pageParam = ', pageParam);
    const limit = 3;
    const offset = pageParam * limit;
    console.log('offset = ', offset);
    const result = await fetcher.get(`reviews?limit=${limit}&offset=${offset}`);
    return result.data; // 필요한 데이터만 반환
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: ({ pageParam = 0 }) => getReviews({ pageParam }), // 페이지 매개변수 처리
    getNextPageParam: (lastPage, allPages) => {
      console.log('allPages length = ', allPages.length);
      return allPages.length;
    },
    initialPageParam: 0, // 첫 페이지는 1로 시작
  });

  const observerRef = useInfiniteObserver(fetchNextPage);

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
        <div className="flex flex-col items-start gap-6 self-stretch">
          {data?.pages.map((page) =>
            page.map((review, idx) => <ReviewCard key={idx} {...review} isMyPage={false} />),
          )}
        </div>
        <div
          className="absolute w-full left-0 bottom-0 -z-10 h-20 border-2"
          ref={observerRef}
        ></div>
      </div>
    </div>
  );
}
