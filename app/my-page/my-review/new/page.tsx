import { getInstance } from '@/utils/axios';

import NewReview from '@/components/myPage/newReviews/NewReview';

export default async function New() {
  const instance = getInstance();
  const res = await instance('/gatherings/joined', {
    params: {
      limit: 10,
      reviewed: false,
      completed: true,
    },
  });

  return <NewReview initialReviews={res.data} />;
}
