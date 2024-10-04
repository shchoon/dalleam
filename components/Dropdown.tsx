'use client';

import clsx from 'clsx';
import { Children, forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  ulClassName?: string;
  liClassName?: string;
}

export interface DropdownHandles {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Dropdown = forwardRef<DropdownHandles, Props>(
  ({ children, ulClassName, liClassName }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
      toggle: () => {
        setIsOpen((prev) => !prev);
      },
    }));

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const targetElement = event.target as HTMLElement;

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !targetElement.closest('.dropdown-toggle')
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div ref={dropdownRef} className="relative">
        {isOpen && (
          <ul
            className={clsx(
              'border-var-gray-6 absolute z-10 w-110pxr list-none rounded-xl border bg-white shadow-md transition-all duration-300',
              ulClassName,
            )}
          >
            {Children.map(children, (child, index) => (
              <li
                className={clsx(
                  'w-full text-sm lg:text-base text-gray-800 duration-300 hover:bg-var-gray7 md:text-18pxr h-40pxr flex items-center justify-left pl-3 lg:pl-4',
                  index < Children.count(children) - 1 && 'border-var-gray-6 border-b',
                  liClassName,
                )}
                key={index}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {child}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
