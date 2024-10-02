import { Review, Points, GatheringType } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/types/types';
import { reviewStore } from '@/stores/reviewStore';

const fetcher = getInstance();

export const getReviewsUrl = () => {
  const { typeTab, locationTab, dateTab, sortTab } = reviewStore();
  let locationUrl = !!locationTab ? `&location=${locationTab}` : '';
  let dateUrl = !!dateTab ? `&date=${dateTab}` : '';
  let subUrl = `${locationUrl}${dateUrl}`;
  let reviewUrl = `type=${typeTab}&sortOrder=desc&sortBy=${sortTab}${subUrl}`;
  return { typeTab, reviewUrl };
};

export const getReviews = async ({
  pageParam,
  reviewUrl = '&type=DALLAEMFIT&sortOrder=desc&sortBy=createdAt',
}: {
  pageParam: number;
  reviewUrl?: string;
}): Promise<Review[]> => {
  const limit = 3;
  const offset = pageParam * limit;
  const result = await fetcher.get(`reviews?limit=${limit}&offset=${offset}&${reviewUrl}`);
  return result.data; // 필요한 데이터만 반환
};

export const getScores = async (typeTab: GatheringType = 'DALLAEMFIT'): Promise<Points[]> => {
  const result = await fetcher.get(`reviews/scores?type=${typeTab}`);
  return result.data; //
};

export const useReviewPrefetchQuery = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['reviews', { type: 'DALLAEMFIT' }],
      queryFn: ({ pageParam }) => getReviews({ pageParam }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ['reviews', 'scores'],
      queryFn: () => getScores(),
    }),
  ]);
  return queryClient;
};

export const useReviewsInfiniteQuery = (queryKeys: reviewQueryKeys, reviewUrl: string) => {
  return useInfiniteQuery({
    queryKey: queryKeys,
    queryFn: ({ pageParam = 0 }) => getReviews({ pageParam, reviewUrl: reviewUrl }), // 페이지 매개변수 처리
    getNextPageParam: (lastPage, allPages) => {
      return allPages[allPages.length - 1].length === 3 ? allPages.length : undefined;
    },
    initialPageParam: 0, // 첫 페이지는 1로 시작
  });
};
