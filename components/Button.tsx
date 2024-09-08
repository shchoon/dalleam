'use client';

import { cn } from '@/utils/className';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'gray' | 'orange' | 'tomato' | 'red';
  size?: 'sm' | 'lg';
  fillState: 'full' | 'empty';
};

type ButtonVariantType = VariantProps<typeof buttonVariants>['variant'];

export default function Button({
  className,
  variant = 'orange',
  size = 'lg',
  fillState,
  children,
  ...props
}: ButtonProps) {
  const buttonVariant = (fillState === 'empty' ? 'E' + variant : variant) as ButtonVariantType;

  return (
    <button
      type={props.type ?? 'button'}
      {...props}
      className={cn(
        buttonVariants({
          variant: buttonVariant,
          size,
        }),
        className,
      )}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva(`font-semibold rounded-xl text-base hover:brightness-75`, {
  variants: {
    variant: {
      gray: 'bg-gray-400 text-white',
      Egray: 'border-[1px] border-gray-400 text-gray-400',
      orange: 'bg-orange-600 text-white',
      Eorange: 'border-[1px] border-orange-600 text-orange-600 ',
      tomato: 'bg-orange-700 text-white',
      Etomato: 'border-[1px] border-orange-700 text-orange-700',
      red: 'bg-orange-800 text-white',
      Ered: 'border-[1px] border-orange-800 text-orange-800',
    },
    size: {
      sm: 'w-[120px] h-10',
      lg: 'w-[332px] h-11',
    },
  },
  defaultVariants: {
    variant: 'orange',
    size: 'lg',
  },
});
