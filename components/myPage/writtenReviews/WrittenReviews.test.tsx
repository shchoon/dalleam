import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WrittenReviews from './WrittenReviews';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Review } from '@/lib/definition';
import 'react-intersection-observer/test-utils';

const writtenReview: Review[] = [
  {
    teamId: 'test',
    id: 0,
    score: 3,
    comment: 'good',
    createdAt: '2024-10-11T05:36:09.287Z',
    Gathering: {
      teamId: 'test',
      id: 0,
      type: 'OFFICE_STRETCHING',
      name: 'string',
      dateTime: '2024-10-11T05:36:09.287Z',
      location: '건대입구',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727836362241_SmartSelectImage_2022-03-22-22-54-04.png',
    },
    User: {
      teamId: 'test',
      id: 0,
      name: 'string',
      image: null,
    },
  },
];

const queryClient = new QueryClient();

describe('test writtenReviews', () => {
  it('기본 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WrittenReviews initialWrittenReviews={writtenReview} userId={0} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('good')).toBeInTheDocument();
  });
});
