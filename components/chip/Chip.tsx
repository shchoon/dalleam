import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/className';

type Props = React.ComponentPropsWithoutRef<'span'> & {
  color: 'white' | 'gray' | 'navy' | 'disabled';
  size: 'lg' | 'md' | 'sm';
};

const Chip = forwardRef<HTMLSpanElement, Props>(
  ({ color, size, className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(chipVariants({ color, size }), className)} {...props}>
        {children}
      </span>
    );
  },
);

// 명시적으로 displayName을 설정하여 디버깅에 도움을 줄 수 있음
Chip.displayName = 'Chip';

export default Chip;

const chipVariants = cva(
  'inline-flex justify-center items-center rounded-xl cursor-pointer hover:brightness-90 text-sm font-medium',
  {
    variants: {
      color: {
        white: 'bg-gray-50 text-gray-900 border border-gray-200',
        gray: 'bg-gray-200 text-gray-900',
        navy: 'bg-gray-900 text-white',
        disabled: 'bg-gray-200 text-gray-400 hover:brightness-100 cursor-default',
      },
      size: {
        lg: 'px-4 py-2.5',
        md: 'px-3 py-2',
        sm: 'px-3 py-1.5',
      },
    },
    defaultVariants: {
      color: 'white',
      size: 'md',
    },
  },
);
