import { JoinedGathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import { QueryData } from '../modal/checkCancel/CheckCancel';
import { QueryClient } from '@tanstack/react-query';

export const updateGathering = async (
  limit: number,
  isCheck: boolean,
  queryClient: QueryClient,
  id: number,
) => {
  const instance = getInstance();

  const deleteData = await instance.delete(`/gatherings/${id}/leave`);

  if (deleteData.status === 200 && isCheck) {
    const getData = await instance('/gatherings/joined', {
      params: { limit: limit, offset: 0, sortOrder: 'desc' },
    });
    const optimisticData = queryClient.getQueryData(['gatheringJoined']) as { pages: [[]] };
    const updateData = getData.data;
    const successOptomistic =
      JSON.stringify(optimisticData.pages.flat()) == JSON.stringify(updateData);

    if (successOptomistic) {
      return updateData;
    } else {
      throw new Error('fail optimistic');
    }
  }
  return deleteData;
};

export const optimisticUpdateData = (queryClient: QueryClient, id: number) => {
  const preData = queryClient.getQueryData(['gatheringJoined']) as QueryData;
  if (preData.pages.flat().length % 10 === 0) {
    return;
  }

  formatQueryData(preData, queryClient, id);

  return { preData };
};

export const formatQueryData = (preData: QueryData, queryClient: any, id?: number) => {
  let formatData;

  if (id) {
    formatData = preData.pages.flat().filter((data: JoinedGathering) => data.id !== id);
  } else {
    formatData = preData.pages.flat();
  }

  const pages = formatData.reduce((acc: JoinedGathering[][], _: any, i: number) => {
    if (i % 10 === 0) {
      acc.push(formatData.slice(i, i + 10));
    }

    return acc;
  }, []);

  queryClient.setQueryData(['gatheringJoined'], {
    ...preData,
    pages: pages,
  });
};
