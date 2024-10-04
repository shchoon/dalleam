import {
  Review,
  Points,
  GatheringType,
  reviewQueryKeys,
  reviewScoresQueryKeys,
} from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import { QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useFilterStore from '@/stores/filterStore';
import { reviewStore } from '@/stores/reviewStore';

const fetcher = getInstance();

export const getReviewsUrl = () => {
  const { type, location, date, reviewSortBy } = useFilterStore();
  let convertSortUrl = 'createdAt';
  switch (reviewSortBy) {
    case '최신 순':
      convertSortUrl = 'createdAt';
      break;
    case '리뷰 높은 순':
      convertSortUrl = 'score';
      break;
    case '참여 인원 순':
      convertSortUrl = 'participantCount';
      break;
  }
  let locationUrl = location === '지역 선택' ? '' : `&location=${location}`;
  let dateUrl = date === '날짜 선택' ? '' : `&date=${date}`;
  let subUrl = `${locationUrl}${dateUrl}`;
  let reviewUrl = `type=${type}&sortOrder=desc&sortBy=${convertSortUrl}${subUrl}`;
  return {
    type,
    location,
    reviewSortBy,
    reviewUrl,
    date,
  };
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
  const queryKeys = {
    type: 'DALLAEMFIT',
    location: '지역 선택',
    sortBy: '최신 순',
    date: '날짜 선택',
  };
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: [['reviews'], queryKeys],
      queryFn: ({ pageParam }) => getReviews({ pageParam }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: [['reviews', 'scores'], queryKeys],
      queryFn: () => getScores(),
    }),
  ]);
  return queryClient;
};

export const useReviewsInfiniteQuery = (queryKey: reviewQueryKeys, reviewUrl: string) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => getReviews({ pageParam, reviewUrl: reviewUrl }), // 페이지 매개변수 처리
    getNextPageParam: (lastPage, allPages) => {
      return allPages[allPages.length - 1].length === 3 ? allPages.length : undefined;
    },
    initialPageParam: 0, // 첫 페이지는 1로 시작
  });
};

export const useScoresQuery = (queryKey: reviewScoresQueryKeys, typeTab: GatheringType) => {
  return useQuery({
    queryKey,
    queryFn: () => getScores(typeTab),
  });
};
