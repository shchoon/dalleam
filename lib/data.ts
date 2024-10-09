// fetcher 함수 작성 파일
import { getInstance } from '@/utils/axios';
import axios from 'axios';
import { Gathering, Participant, Review } from './definition';
import { gatheringSchema } from '@/constants/formSchema';

export const fetchGatherings = async () => {
  try {
    const response = await getInstance().get<Gathering[]>('gatherings', {
      params: { limit: 10 },
    });

    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, errorMessage: error.response?.data.message ?? 'Unknown error' };
    }
    return { data: null, errorMessage: 'Gathering fetch failed' };
  }
};
export const fetchDetailGathering = async (id: number) => {
  try {
    const response = await getInstance().get<Gathering>(`gatherings/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, errorMessage: error.response?.data.message ?? 'Unknown error' };
    }
    return { data: null, errorMessage: 'Gathering detail fetch failed' };
  }
};

export const fetchDetailReviews = async (id: number) => {
  try {
    const response = await getInstance().get<Review[]>('reviews', {
      params: { gatheringId: id },
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, errorMessage: error.response?.data.message ?? 'Unknown error' };
    }
    return { data: null, errorMessage: 'Gathering detail reviews fetch failed' };
  }
};

export const fetchJoinedGatheringIds = async (gatheringId: number) => {
  try {
    const response = await getInstance().get<Participant[]>(
      `gatherings/${gatheringId}/participants`,
      {
        params: { limit: 100 },
      },
    );
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, errorMessage: error.response?.data.message ?? 'Unknown error' };
    }
    return { data: null, errorMessage: 'joinedGathering Ids fetch failed' };
  }
};

export const postGathering = async ({ gathering }: { gathering: gatheringSchema }) => {
  console.log('gathering = ', gathering);
  const response = await getInstance().post('/gatherings', gathering, {
    headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
  });

  return response.data;
};
