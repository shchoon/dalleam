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

const baseClasses = 'w-full rounded-xl px-4 py-[10px] text-sm md:text-base border border-black';

const errorClasses = '!border-red-500 !outline-red-500';

const outlineColors = {
  none: '',
  yellow: 'outline-yellow-500',
  orange: 'outline-orange-500',
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
          className={`${baseClasses} ${outlineColors[outlineColor]} ${placeholderColors[placeholderColor]} ${errorMsg && errorClasses} pr-10`} // 오른쪽 공간 확보
          {...props}
        />
        {toggleType && (
          <button
            type="button"
            onClick={toggleType}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
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
