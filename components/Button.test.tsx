import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('버튼 렌더링 테스트', () => {
  it('기본 버튼 렌더링', () => {
    render(<Button fillState="full" text="테스트하기1" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[332px] bg-orange-600 text-white hover:brightness-75');
    expect(buttonElement).toHaveTextContent('테스트하기1');
  });
  it('스몰 색상 버튼 렌더링', () => {
    render(<Button variant="gray" fillState="full" size="sm" text="테스트하기2" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('w-[120px] h-10 bg-gray-400 text-white');
    expect(buttonElement).toHaveTextContent('테스트하기2');
  });
  it('라지 빈색상 버튼 렌더링', () => {
    render(<Button variant="red" fillState="empty" size="lg" text="테스트하기3" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      'w-[332px] h-11 border-[1px] border-orange-800 text-orange-800',
    );
    expect(buttonElement).toHaveTextContent('테스트하기3');
  });
  it('스몰 빈색상 버튼 렌더링', () => {
    render(<Button variant="tomato" fillState="empty" size="sm" text="테스트하기4" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      'w-[120px] h-10 border-[1px] border-orange-700 text-orange-700',
    );
    expect(buttonElement).toHaveTextContent('테스트하기4');
  });
  it('버튼 className 처리 및 텍스트 처리 확인', () => {
    render(
      <Button
        className="w-full h-11 md:h-10"
        variant="tomato"
        fillState="empty"
        size="sm"
        text="테스트하기"
      />,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      'w-full h-11 md:h-10 border-[1px] border-orange-700 text-orange-700',
    );
    expect(buttonElement).toHaveTextContent('테스트하기');
  });
});
