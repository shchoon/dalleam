'use client';
import { getInstance } from '@/utils/axios';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';

import CardList from '../card/CardList';
import { Gathering } from '@/types/types';
import Card from '../card/Card';
import { useEffect } from 'react';
import { InView, useInView } from 'react-intersection-observer';

export default function MyGathering({ initialGathering }: { initialGathering: Gathering[] }) {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const instance = getInstance();
  const getGatheringData = async (offetParams: number) => {
    console.log('offset', offetParams);
    const res = await instance('/gatherings', { params: { limit: 5, offset: offetParams } });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.data;
  };

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['infiniteGatherings'],
    initialData: {
      pages: initialGathering,
      pageParams: [5],
    },
    initialPageParam: 5,
    queryFn: ({ pageParam = 5 }) => getGatheringData(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      console.log('all', allPages);
      if (lastPage.length < 5) {
        return undefined;
      }
      return allPages.flat().length;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 5,
  });

  console.log('data', data);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      {
        <div className="flex flex-col gap-6">
          {data?.pages.flat().map((card, i) => {
            return <Card gathering={card} normal={false} key={card.id} />;
          })}
        </div>
      }
      {/* <div onClick={() => fetchNextPage()}>test</div> */}
      {isFetching && <div>loading...</div>}
      {!isFetching && hasNextPage && <div ref={ref}>true</div>}
    </>
  );
}
