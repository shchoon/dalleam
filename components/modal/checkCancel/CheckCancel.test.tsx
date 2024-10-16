import React from 'react';
import '@testing-library/jest-dom';
import CheckCancel from './CheckCancel';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockCloseModal = jest.fn();

const queryClient = new QueryClient();

describe('checkCancel component test', () => {
  it('기본 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CheckCancel closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('정말 해당 모임 예약을 취소하시겠습니까?'));

    expect(screen.getByRole('button', { name: /취소/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /확인/i })).toBeInTheDocument();
  });
});
