import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

import React from 'react';
import LoginAlert from './LoginAlert';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginAlert Component', () => {
  const mockOnClose = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('컴포넌트 렌더링', () => {
    render(<LoginAlert onClose={mockOnClose} />);

    expect(screen.getByText('로그인이 필요해요')).toBeInTheDocument();
  });

  it('"닫기" 버튼을 클릭 시 모달 창을 닫는 onClose함수 호출', () => {
    const { container } = render(<LoginAlert onClose={mockOnClose} />);

    const closeButton = container.querySelector('svg')!;
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('"확인" 버튼 클릭 시 로그인 페이지 이동 ', () => {
    render(<LoginAlert onClose={mockOnClose} />);

    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/login?redirectedFrom=alert');
  });
});
