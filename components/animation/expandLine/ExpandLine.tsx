import React from 'react';

type Props = {
  capacity: number;
  participant: number;
};

export default function ExpandLine({ capacity, participant }: Props) {
  return (
    <div className="relative z-0 w-full h-1 overflow-hidden">
      <div className="absolute w-full h-full bg-orange-50" />
      <div
        data-testid="expandLine"
        style={{ width: `${(participant / capacity) * 100}%` }}
        className={`absolute animate-expand-line h-full ${capacity === participant ? 'bg-orange-400' : 'bg-orange-600'} rounded-md`}
      />
    </div>
  );
}
