'use client';
import React, { useEffect } from 'react';

import ProgressCard from '@/components/progressCard/ProgressCard';
import { Gathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import { buildFilteredParams } from '@/components/progressCard/ProgressCardList';

import { useQuery } from '@tanstack/react-query';
import useFilterStore from '@/stores/filterStore';
import useSavedStore from '@/stores/savedStore';
import useUserStore from '@/stores/userStore';

const SavedProgressCardList = () => {
  const { location, date, sortBy, type } = useFilterStore(); // 필터링 상태 가져오기
  const { saved, hydrated } = useSavedStore();
  const { user } = useUserStore();

  const savedIds = user ? saved[user.id] : [];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['saved-gathering', location, date, sortBy, type],
    queryFn: async () => {
      const params = buildFilteredParams({
        id: savedIds.join(','),
        location: location !== '지역 선택' ? location : undefined,
        date: date !== '날짜 선택' ? date : undefined,
        sortBy: sortBy === '마감 임박' ? 'dateTime' : 'participantCount', // 마감임박, 참여 인원 순 기본 값 필요
        type: type !== '전체' ? type : undefined,
      });
      console.log(params);
      const response = await getInstance().get<Gathering[]>('gatherings', {
        params,
      });
      return response.data;
    },
    enabled: savedIds.length > 0, // savedIds가 있을 때만 쿼리 실행
  });

  useEffect(() => {
    if (hydrated) {
      refetch();
    }

    // if (savedIds) refetch();
  }, [location, date, sortBy, type, hydrated]); // hydrated를 의존성 배열에 추가

  if (!hydrated) {
    // hydrated 상태가 아닐 때 로딩 메시지나 스피너 표시
    return (
      <div className="flex items-center justify-center h-full min-h-500pxr">
        <p className="h-10 text-sm font-medium text-center text-gray-500">데이터 로딩 중...</p>
      </div>
    );
  }

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <div>Error: {error?.message}</div>;
  }

  if (data) {
    content = data?.map((gathering) => <ProgressCard gathering={gathering} key={gathering.id} />);
  }

  return <div className="flex flex-col gap-4 mt-6">{content}</div>;
};

export default SavedProgressCardList;
