import { cn } from '@/utils/className';
import { cva } from 'class-variance-authority';
import Check from '/public/icons/check.svg';
import React from 'react';

type ChipStateProps = {
  status?: '이용 예정' | '이용 완료' | '개설 확정' | '개설 대기';
};

// 상태별 스타일 정의
const chipVariants = cva(
  `flex items-center justify-center px-3 py-6pxr h-8 rounded-3xl text-sm font-medium`,
  {
    variants: {
      state: {
        '이용 예정': 'bg-orange-100 text-orange-600',
        '이용 완료': 'bg-gray-200 text-gray-500',
        '개설 확정':
          'bg-white box-border border border-solid border-orange-100 text-orange-500 gap-1',
        '개설 대기': 'bg-white border border-solid border-gray-200 text-gray-500',
      },
    },
    defaultVariants: {
      state: '이용 예정',
    },
  },
);

const ChipState = ({ status = '이용 예정' }: ChipStateProps) => {
  return (
    <div className={cn(chipVariants({ state: status }))}>
      {status === '개설 확정' && <Check />}
      {status}
    </div>
  );
};

export default ChipState;
