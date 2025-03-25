import { Gathering } from '@/lib/definition';
import Card from './Card';
import React from 'react';

const CardList = ({ gatherings }: { gatherings: Gathering[] }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      {gatherings.map((gathering, index) => (
        <Card priority={index === 0} gathering={gathering} normal={false} key={gathering.id} />
      ))}
    </div>
  );
};

export default CardList;
