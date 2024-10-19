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
  const { location, date, sortBy, type } = useFilterStore();
  const { saved, hydrated } = useSavedStore();
  const { user } = useUserStore();

  const savedIds = user ? saved[user.id] || [] : [];
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['saved-gathering', location, date, sortBy, type];
  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (savedIds.length === 0) return [];
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
    enabled: hydrated,
  });

  useEffect(() => {
    if (savedIds.length >= 0) {
      queryClient.invalidateQueries({
        queryKey: ['saved-gathering'],
      });
    }
  }, [savedIds]);

  if (!hydrated || isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-500pxr">
        <p className="h-10 text-sm font-medium text-center text-gray-500">
          찜 목록을 가져오는 중...
        </p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  let content;

  if (data && data.length > 0) {
    content = (
      <div data-cy="SavedGathering List" className="space-y-6">
        {data.map((gathering, index) => (
          <ProgressCard key={gathering.id} gathering={gathering} priority={index === 0} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
        <p className="h-10 text-sm font-medium text-center text-gray-500">
          아직 모임이 없어요. <br />
          지금 바로 모임을 만들어보세요. <br />
        </p>
      </div>
    );
  }

  return <>{content}</>;
};

export default SavedProgressCardList;
