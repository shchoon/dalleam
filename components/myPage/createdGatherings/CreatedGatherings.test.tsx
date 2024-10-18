import React from 'react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
import CreatedGatherings from './CreatedGatherings';
import { Gathering } from '@/lib/definition';
import 'react-intersection-observer/test-utils';

const createdGatherings: Gathering[] = [
  {
    canceledAt: null,
    capacity: 5,
    createdBy: 764,
    dateTime: '2024-10-13T00:17:29.741Z',
    id: 1343,
    image: '',
    location: '건대입구',
    name: '',
    participantCount: 0,
    registrationEnd: '2024-10-12T00:17:29.741Z',
    teamId: 'FESI3-3',
    type: 'OFFICE_STRETCHING',
  },
];

const queryClient = new QueryClient();

describe('test createdGatherings', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('내가 만든 모임 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreatedGatherings initialCreatedGatherings={createdGatherings} userId={0} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('건대입구')).toBeInTheDocument();
    expect(screen.getByText('OFFICE_STRETCHING')).toBeInTheDocument();
    expect(screen.getByText('10월 13일'));
    expect(screen.getByText('00:17')).toBeInTheDocument();
  });

  it('내가 만든 모임 없는 경우 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreatedGatherings initialCreatedGatherings={[]} userId={0} />
      </QueryClientProvider>,
    );

    expect(screen.getByText('아직 만든 모임이 없어요'));
  });
});
