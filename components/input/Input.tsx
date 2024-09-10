import { forwardRef, InputHTMLAttributes } from 'react';
import ErrorMsg from './ErrorMsg';
import VisiblityOff from '@/public/icons/visibility_off.svg';
import VisiblityON from '@/public/icons/visibility_on.svg';
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  outlineColor?: 'none' | 'default' | 'yellow' | 'orange';
  placeholderColor?: 'gray' | 'black';
  errorMsg?: string;
  toggleType?: () => void;
};

const baseClasses =
  'w-full h-10 md:h-11 rounded-xl px-16pxr py-10pxr text-sm md:text-base bg-gray-50';

const errorClasses = '!border-red-600 !outline-red-600';

const outlineColors = {
  none: 'outline-none',
  default: 'outline-gray-900',
  yellow: 'outline-orange-300',
  orange: 'outline-orange-600',
};

const placeholderColors = {
  gray: 'placeholder-gray-400',
  black: 'placeholder-black',
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      placeholder,
      placeholderColor = 'gray',
      outlineColor = 'none',
      errorMsg,
      toggleType,
      className,
      ...props
    },
    ref,
  ) => {
    const computedClassName = clsx(
      baseClasses,
      outlineColors[outlineColor],
      placeholderColors[placeholderColor],
      errorMsg && errorClasses,
      className,
    );

    return (
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={computedClassName}
            {...props}
          />
          {toggleType && (
            <button
              type="button"
              onClick={toggleType}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
            >
              {type === 'password' ? <VisiblityOff /> : <VisiblityON />}
            </button>
          )}
        </div>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
