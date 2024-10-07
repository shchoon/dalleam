import React from 'react';
import MyGatherings from '@/components/myPage/MyGatherings';
import { getInstance } from '@/utils/axios';

export default async function MyGatheringPage() {
  const instance = getInstance();

  const myGatherings = await instance('/gatherings/joined', {
    params: {
      limit: 10,
      // sortOrder: 'desc',
    },
  });

  return <MyGatherings initialMyGatherings={myGatherings.data} />;
}
