import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyGatherings from './MyGatherings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JoinedGathering } from '@/lib/definition';
import 'react-intersection-observer/test-utils';

const queryClient = new QueryClient();

const date = new Date();

const tommorrow = date.setDate(date.getDate() + 1);

const reviewed: JoinedGathering = {
  teamId: 'test',
  id: 1128,
  type: 'OFFICE_STRETCHING',
  name: null,
  dateTime: '2024-10-02T02:33:34.022Z',
  registrationEnd: '2024-10-02T02:33:30.022Z',
  location: '건대입구',
  participantCount: 1,
  capacity: 7,
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727836362241_SmartSelectImage_2022-03-22-22-54-04.png',
  createdBy: 764,
  canceledAt: null,
  joinedAt: '2024-10-02T02:32:58.307Z',
  isCompleted: true,
  isReviewed: true,
};

const unReviewed = { ...reviewed, isReviewed: false };

const ableCancel = {
  ...reviewed,
  dateTime: new Date(tommorrow).toISOString(),
  registrationEnd: new Date(tommorrow).toISOString(),
};

describe('test myGatherings', () => {
  // 매 테스트마다 캐시 초기화
  beforeEach(() => {
    queryClient.clear();
  });

  it('참여한 모임 없는 경우 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyGatherings initialMyGatherings={[]} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('신청한 모임이 아직 없어요')).toBeInTheDocument();
  });

  it('이용 완료 & 리뷰 작성한 모임 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyGatherings initialMyGatherings={[reviewed]} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('이용 완료')).toBeInTheDocument();
    expect(screen.getByText('리뷰 작성하기')).toBeInTheDocument();

    const reviewBtn = screen.getByRole('button', { name: /리뷰 작성하기/i });

    expect(reviewBtn).toHaveClass('bg-gray-400');
  });

  it('이용 완료 & 리뷰 작성 안한 모임 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyGatherings initialMyGatherings={[unReviewed]} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('이용 완료')).toBeInTheDocument();
    expect(screen.getByText('리뷰 작성하기')).toBeInTheDocument();

    const reviewBtn = screen.getByRole('button', { name: /리뷰 작성하기/i });

    expect(reviewBtn).toHaveClass('bg-orange-600');
  });

  it('이용 예정 & 예약 취소 가능 모임 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyGatherings initialMyGatherings={[ableCancel]} />
      </QueryClientProvider>,
    );

    // expect(screen.getByText('이용 예정')).toBeInTheDocument();

    const cancelBtn = screen.getByRole('button', { name: /예약 취소하기/i });
    expect(cancelBtn).toBeInTheDocument();
  });
});
