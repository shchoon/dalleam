import { getInstance } from '@/utils/axios';
import CreatedGatherings from '@/components/myPage/createdGatherings/CreatedGatherings';

export default async function Created() {
  const instance = getInstance();

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
