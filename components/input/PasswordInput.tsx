import { useState, forwardRef, InputHTMLAttributes } from 'react';
import Input from './Input';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  outlineColor?: 'none' | 'yellow' | 'orange';
  placeholderColor?: 'gray' | 'black';
  errorMsg?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      placeholderColor = 'gray',
      outlineColor = 'none',
      errorMsg,
      className,
      ...props
    },
    ref,
  ) => {
    const [type, setType] = useState<'text' | 'password'>('password');

    const toggleType = () => {
      setType((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    return (
      <Input
        ref={ref}
        type={type}
        toggleType={toggleType}
        placeholder={placeholder}
        errorMsg={errorMsg}
        className={className}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
