import React, { forwardRef } from 'react';
import ErrorMsg from './ErrorMsg';
import VisiblityOff from '@/public/icon/visibility_off.svg';
import VisiblityON from '@/public/icon/visibility_on.svg';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  outlineColor?: 'none' | 'yellow' | 'orange';
  placeholderColor?: 'gray' | 'black';
  errorMsg?: string;
  toggleType?: () => void;
}

const baseClasses = 'w-full rounded-xl px-4 py-[10px] text-sm md:text-base border border-gray-900';

const errorClasses = '!border-red-600 !outline-red-600';

const outlineColors = {
  none: 'outline-gray-900',
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
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${outlineColors[outlineColor]} ${placeholderColors[placeholderColor]} ${errorMsg && errorClasses}`}
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
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
