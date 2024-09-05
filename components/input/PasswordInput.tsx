'use client';

import { useState } from 'react';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  outlineColor?: 'none' | 'yellow' | 'orange';
  placeholderColor?: 'gray' | 'black';
  errorMsg?: string;
}

export default function PasswordInput({
  placeholder,
  placeholderColor = 'gray',
  outlineColor = 'none',
  errorMsg,
  ...props
}: Props) {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  return <Input type={type} toggleType={toggleType} placeholder={placeholder} {...props} />;
}
