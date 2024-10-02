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
  const { saved } = useSavedStore();
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
      const response = await getInstance().get<Gathering[]>('gatherings', {
        params,
      });
      return response.data;
    },
    enabled: savedIds.length > 0, // savedIds가 있을 때만 쿼리 실행
  });

  useEffect(() => {
    refetch();
  }, [location, date, sortBy, type]);

  if (savedIds.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-500pxr">
        <p className="h-10 text-sm font-medium text-center text-gray-500">
          저장된 모임이 없습니다.
        </p>
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
