import { getInstance } from '@/utils/axios';
import CreatedGatherings from '@/components/myPage/createdGatherings/CreatedGatherings';
import { createdGatheringData } from '../mockData';

export default async function Created() {
  const instance = getInstance();

  if (process.env.NEXT_NODE_ENV === 'test') {
    const data = new Array(10).fill(createdGatheringData);
    return <CreatedGatherings initialCreatedGatherings={data} userId={1} />;
  }

  const user = await instance('/auths/user');
  const userId = await user.data.id;

  const initialCreatedGatherings = await instance('/gatherings', {
    params: {
      createdBy: userId,
      limit: 10,
      sortBy: 'dateTime',
      sortOrder: 'desc',
    },
  });

  return (
    <CreatedGatherings initialCreatedGatherings={initialCreatedGatherings.data} userId={userId} />
  );
}
