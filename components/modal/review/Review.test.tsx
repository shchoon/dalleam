import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ReviewModal from './Review';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Review modal test', () => {
  const mockCloseModal = jest.fn();

  it('기본 레더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReviewModal closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );
    expect(screen.getByText('리뷰 쓰기')).toBeInTheDocument();

    const emptyHearts = screen.getAllByLabelText('emptyHeart');

    expect(emptyHearts.length).toBe(5);

    expect(
      screen.getByPlaceholderText(
        '남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.',
      ),
    );

    expect(screen.getByRole('button', { name: /취소/i }));

    expect(screen.getByRole('button', { name: /리뷰 등록/i }));
  });

  it('별점 클릭 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReviewModal closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );
    const emptyHearts = screen.getAllByLabelText('emptyHeart');

    const fillHearts = screen.getAllByLabelText('fillHeart');
    expect(fillHearts[0]).toHaveClass('hidden');

    fireEvent.click(emptyHearts[0]);
    expect(fillHearts[0]).not.toHaveClass('hidden');
  });

  it('버튼 활성화 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReviewModal closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );
    const emptyHearts = screen.getAllByLabelText('emptyHeart');
    const reviewInput = screen.getByPlaceholderText(
      '남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.',
    );
    const submitBtn = screen.getByRole('button', { name: /리뷰 등록/i });

    fireEvent.click(emptyHearts[0]);

    expect(submitBtn).toBeDisabled();

    fireEvent.change(reviewInput, { target: { value: 'test' } });

    expect(submitBtn).not.toBeDisabled();
  });
});
