import React from 'react';

import MyGatherings from '@/components/myPage/myGatherings/MyGatherings';
import { gatheringData } from './mockData';
import { getInstance } from '@/utils/axios';

export default async function MyGatheringPage() {
  if (process.env.NEXT_NODE_ENV === 'test') {
    const data = new Array(10).fill(gatheringData);
    return <MyGatherings initialMyGatherings={data} />;
  }
  const instance = getInstance();

  const myGatherings = await instance('/gatherings/joined', {
    params: {
      limit: 10,
      sortOrder: 'desc',
    },
  });

  return <MyGatherings initialMyGatherings={myGatherings.data} />;
}
