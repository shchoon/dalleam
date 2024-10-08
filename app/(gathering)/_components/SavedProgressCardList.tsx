'use client';
import React, { useEffect } from 'react';

import ProgressCard from '@/components/progressCard/ProgressCard';
import { Gathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';

import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import useFilterStore from '@/stores/filterStore';
import useSavedStore from '@/stores/savedStore';
import useUserStore from '@/stores/userStore';
import { buildFilteredParams } from '@/utils/gathering';

const SavedProgressCardList = () => {
  const { location, date, sortBy, type } = useFilterStore(); // 필터링 상태 가져오기
  const { saved, hydrated } = useSavedStore();
  const { user } = useUserStore();

  const savedIds = user ? saved[user.id] : [];
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['saved-gathering', location, date, sortBy, type];
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = buildFilteredParams({
        id: savedIds.join(','),
        location: location !== '지역 선택' ? location : undefined,
        date: date !== '날짜 선택' ? date : undefined,
        sortBy: sortBy === '마감 임박' ? 'dateTime' : 'participantCount',
        type: type !== 'DALLAEMFIT' ? type : undefined,
      });
      const response = await getInstance().get<Gathering[]>('gatherings', {
        params,
      });
      return response.data;
    },
    enabled: savedIds?.length > 0,
  });

  useEffect(() => {
    if (hydrated && savedIds.length > 0) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [savedIds]);

  useEffect(() => {
    if (hydrated) {
      refetch();
    }
  }, [location, date, sortBy, type, hydrated]);

  if (!hydrated) {
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
