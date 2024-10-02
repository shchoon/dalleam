// fetcher 함수 작성 파일
import { getInstance } from '@/utils/axios';
import axios from 'axios';
import { Gathering, Participant, Review } from './definition';

export const fetchGatherings = async () => {
  try {
    const response = await getInstance().get<Gathering[]>('gatherings', {
      params: { limit: 10 },
    });

    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      let errorMessage = 'Unknown error';
      if (error.response?.status === 400) {
        errorMessage = error.response?.data.message;
      }
      return { data: null, errorMessage: errorMessage };
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
      let errorMessage = 'Unknown error';
      if (error.response?.status === 400) {
        errorMessage = error.response?.data.message;
      } else if (error.response?.status === 404) {
        errorMessage = error.response?.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data.message;
      }

      return { data: null, errorMessage: errorMessage };
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
      let errorMessage = 'Unknown error';
      if (error.response?.status === 400) {
        errorMessage = error.response?.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data.message;
      }
      return { data: null, errorMessage: errorMessage };
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
      let errorMessage = 'Unknown error';
      if (error.response?.status === 400) {
        errorMessage = error.response?.data.message;
      } else if (error.response?.status === 404) {
        errorMessage = error.response?.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data.message;
      }
      return { data: null, errorMessage: errorMessage };
    }
    return { data: null, errorMessage: 'joinedGathering Ids fetch failed' };
  }
};
