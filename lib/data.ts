// fetcher 함수 작성 파일
import { getInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import { Gathering } from './definition';

export const fetchDetailGathering = async (id: number) => {
  try {
    const response = await getInstance().get<Gathering>(`gatherings/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching gathering detail:', error.response?.data.message);
    }
    throw new Error('Gathering detail fetch failed');
  }
};

export const fetchDetailReviews = async (id: number) => {
  const response = await getInstance().get('reviews');
  console.log(response.data);
  return response.data;
};
