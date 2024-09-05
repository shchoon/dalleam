import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('버튼 렌더링 테스트', () => {
  it('기본 버튼 렌더링', () => {
    render(<Button fillState="full" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[332px] bg-orange-600 text-white');
  });
  it('스몰 색상 버튼 렌더링', () => {
    render(<Button variant="gray" fillState="full" size="sm" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[120px] bg-gray-400 text-white');
  });
  it('라지 빈색상 버튼 렌더링', () => {
    render(<Button variant="red" fillState="empty" size="lg" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[332px] border-[1px] border-orange-800 text-orange-800');
  });
  it('스몰 빈색상 버튼 렌더링', () => {
    render(<Button variant="tomato" fillState="empty" size="sm" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[120px] border-[1px] border-orange-700 text-orange-700');
  });
});
