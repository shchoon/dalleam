// fetcher 함수 작성 파일
import { getInstance } from '@/utils/axios';
import axios from 'axios';
import { Gathering, Participant, Review, User } from './definition';
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
  const response = await getInstance().post('/gatherings', gathering, {
    headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
  });

  return response.data;
};

export const login = async (body: { email: string; password: string }) => {
  const instance = getInstance();
  const res = await instance.post<{
    token: string;
  }>('auths/signin', body);

  return res.data;
};

export const register = async (body: {
  email: string;
  password: string;
  name: string;
  companyName: string;
}) => {
  const instance = getInstance();
  const res = await instance.post<{
    message: string;
  }>('auths/signup', body);

  return res.data;
};

export const getUser = async () => {
  const instance = getInstance();
  const res = await instance.get<User>('/auths/user');

  return res.data;
};
