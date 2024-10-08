'use client';

import DropdownIcon from '@/public/icons/drop_down.svg';
import clsx from 'clsx';
import { SelectHTMLAttributes, forwardRef, useState } from 'react';
import ErrorMsg from './ErrorMsg';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
  outlineColor?: 'default' | 'yellow' | 'orange';
  errorMsg?: string;
};

const baseClasses =
  'w-full rounded-xl px-16pxr py-10pxr text-sm md:text-base bg-gray-50 appearance-none';

const errorClasses = '!border-red-600 !outline-red-600';

const outlineColors = {
  none: 'outline-none',
  default: 'outline-gray-900',
  yellow: 'outline-orange-300',
  orange: 'outline-orange-600',
};

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ outlineColor = 'default', errorMsg, children, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    const selectClassName = clsx(
      baseClasses,
      outlineColors[outlineColor],
      { [errorClasses]: errorMsg },
      className,
    );

    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="relative">
          <select
            ref={ref}
            className={selectClassName}
            {...props}
            onBlur={closeDropdown}
            onMouseDown={toggleDropdown}
          >
            {children}
          </select>
          <span
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <DropdownIcon />
          </span>
        </div>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
