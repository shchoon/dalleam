import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NewReview from './NewReview';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JoinedGathering } from '@/lib/definition';
import 'react-intersection-observer/test-utils';

const queryClient = new QueryClient();

const newReview: JoinedGathering[] = [
  {
    canceledAt: null,
    capacity: 5,
    createdBy: 681,
    dateTime: '2024-10-02T09:30:04.231Z',
    id: 1097,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727670982771_SmartSelectImage_2022-03-22-22-52-45.png',
    isCompleted: true,
    isReviewed: false,
    joinedAt: '2024-09-30T04:36:42.335Z',
    location: '건대입구',
    name: null,
    participantCount: 1,
    registrationEnd: '2024-09-30T13:38:04.231Z',
    teamId: 'FESI3-3',
    type: 'OFFICE_STRETCHING',
  },
];

describe('test newreviews', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('기본 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewReview initialReviews={newReview} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('OFFICE_STRETCHING')).toBeInTheDocument();
    expect(screen.getByText('건대입구')).toBeInTheDocument();

    const reviewBtn = screen.getByRole('button', { name: /리뷰 작성하기/i });

    expect(reviewBtn).toBeInTheDocument();
    expect(reviewBtn).toHaveClass('bg-orange-600');
  });

  it('작성 가능한 리뷰가 없는 경우 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewReview initialReviews={[]} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('아직 작성 가능한 리뷰가 없어요')).toBeInTheDocument();
  });
});
