'use client';

import { useState, InputHTMLAttributes } from 'react';
import Input from './Input';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  outlineColor?: 'none' | 'yellow' | 'orange';
  placeholderColor?: 'gray' | 'black';
  errorMsg?: string;
};

export default function PasswordInput({
  placeholder,
  placeholderColor = 'gray',
  outlineColor = 'none',
  errorMsg,
  className,
  ...props
}: Props) {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  return (
    <Input
      type={type}
      toggleType={toggleType}
      placeholder={placeholder}
      errorMsg={errorMsg}
      className={className}
      {...props}
    />
  );
}
