import React from 'react';
import MainTab from '@/components/tab/MainTab';
import SubTab from '@/components/tab/SubTab';

export default function ReviewsTabs() {
  return (
    <div className="inline-flex flex-col w-full gap-3 items-start md:mb-2">
      <MainTab />
      <SubTab />
    </div>
  );
}
