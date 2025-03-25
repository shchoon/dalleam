import { getInstance } from '@/utils/axios';

import NewReview from '@/components/myPage/newReviews/NewReview';
import { reviewData } from '../../mockData';

export default async function New() {
  if (process.env.NEXT_NODE_ENV === 'test') {
    const data = new Array(10).fill(reviewData);

    return <NewReview initialReviews={data} />;
  }
  const instance = getInstance();
  const res = await instance('/gatherings/joined', {
    params: {
      limit: 10,
      reviewed: false,
      completed: true,
      sortOrder: 'desc',
    },
  });

  return <NewReview initialReviews={res.data} />;
}
