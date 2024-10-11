import { getInstance } from '@/utils/axios';

import WrittenReviews from '@/components/myPage/writtenReviews/WrittenReviews';

export default async function Written() {
  const instance = getInstance();
  const user = await instance('/auths/user');

  const userId = await user.data.id;

  const initialWrittenReviews = await instance('/reviews', {
    params: {
      userId: userId,
      limit: 10,
    },
  });

  return <WrittenReviews initialWrittenReviews={initialWrittenReviews.data} userId={userId} />;
}
