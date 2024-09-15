import React from 'react';
import Saved from './Saved';
import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserStore from '@/stores/userStore';

//useUserStore mocking
jest.mock('@/stores/userStore', () => {
  let mockUser = { id: 1 }; // 테스트에서 사용할 userId 설정

  const mockUseUserStore = jest.fn(() => ({
    //user의 초기값 = {id: 1}로 설정
    user: mockUser,
  }));

  return mockUseUserStore;
});

describe('"Saved" 애니메이션 & localstorage 저장 기능 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('미저장시 svg 렌더링 테스트', () => {
    render(<Saved gatheringId={1} />);

    expect(screen.queryByTestId('unSaved')).toBeInTheDocument();

    expect(screen.queryByTestId('saved')).not.toBeInTheDocument();
  });

  it('저장시 svg 렌더링 테스트', () => {
    localStorage.setItem(
      'saved',
      JSON.stringify({
        1: {
          saved: [1],
        },
      }),
    );

    render(<Saved gatheringId={1} />);

    const savedBtn = screen.queryByTestId('saved');
    expect(savedBtn).toBeInTheDocument();
  });

  it('찜 추가 기능 테스트', async () => {
    render(<Saved gatheringId={1} />);

    const unSavedBtn = screen.getByTestId('unSaved');

    fireEvent.click(unSavedBtn);

    await waitFor(
      () => {
        const saved = localStorage.getItem('saved');
        expect(saved).toEqual(JSON.stringify({ 1: { saved: [1] } }));
        const savedBtn = screen.queryByTestId('saved');
        expect(savedBtn).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it('찜 삭제 기능 테스트', () => {
    localStorage.setItem(
      'saved',
      JSON.stringify({
        1: {
          saved: [1, 2],
        },
      }),
    );

    render(<Saved gatheringId={1} />);

    const savedBtn = screen.getByTestId('saved');

    fireEvent.click(savedBtn);

    const updateSaved = JSON.parse(localStorage.getItem('saved') as string);

    expect(updateSaved).toEqual({
      1: {
        saved: [2],
      },
    });
  });
});
