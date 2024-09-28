import React from 'react';
import Saved from './Saved';
import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('@/stores/userStore', () => {
  let mockUser = { id: 1 }; // 테스트에서 사용할 userId 설정

  const mockUseUserStore = jest.fn(() => ({
    //user의 초기값 = {id: 1}로 설정
    user: mockUser,
  }));

  return mockUseUserStore;
});

const mockSavedStore = {
  saved: { 1: [10] },
  setSaved: jest.fn(),
  cancelSaved: jest.fn(),
};

jest.mock('@/stores/savedStore', () => () => mockSavedStore);

describe('"Saved" 애니메이션 & localstorage 저장 기능 테스트', () => {
  it('미저장시 svg 렌더링 테스트', () => {
    render(<Saved gatheringId={1} />);

    expect(screen.queryByTestId('unSaved')).toBeInTheDocument();

    expect(screen.queryByTestId('saved')).not.toBeInTheDocument();
  });

  it('저장시 svg 렌더링 테스트', () => {
    render(<Saved gatheringId={10} />);

    const savedBtn = screen.queryByTestId('saved');
    expect(savedBtn).toBeInTheDocument();
  });

  it('찜 추가 기능 테스트', async () => {
    render(<Saved gatheringId={1} />);

    const unSavedBtn = screen.getByTestId('unSaved');
    expect(unSavedBtn).toBeInTheDocument();
    fireEvent.click(unSavedBtn);

    await waitFor(
      () => {
        const savedBtn = screen.getByTestId('saved');
        expect(savedBtn).toBeInTheDocument();
        expect(unSavedBtn).not.toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it('찜 삭제 기능 테스트', async () => {
    render(<Saved gatheringId={10} />);
    const savedBtn = await screen.getByTestId('saved');
    expect(savedBtn).toBeInTheDocument();

    fireEvent.click(savedBtn);

    await waitFor(() => {
      const unSavedBtn = screen.getByTestId('unSaved');
      expect(unSavedBtn).toBeInTheDocument();
      expect(savedBtn).not.toBeInTheDocument();
    });
  });
});
