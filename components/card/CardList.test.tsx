import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Gathering } from '@/types/types';

import CardList from './CardList';
import React from 'react';

const mockGatherings: Gathering[] = [
  {
    teamId: 'FESI3-3',
    id: 973,
    type: 'WORKATION',
    name: 'TEST MEETING',
    dateTime: '2024-09-09T22:10:49.888Z',
    registrationEnd: '2024-09-09T21:00:00.888Z',
    location: '신림',
    participantCount: 0,
    capacity: 7,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1725858736260_tv.svg',
    createdBy: 697,
    canceledAt: null,
  },
  {
    teamId: 'WORKATION-004',
    id: 104,
    type: 'WORKATION',
    name: '워크케이션 모임',
    dateTime: '2024-09-25T09:00:00Z',
    registrationEnd: '2024-09-24T09:00:00Z',
    location: '홍대입구',
    participantCount: 4,
    capacity: 6,
    image: 'https://example.com/image4.jpg',
    createdBy: 4,
    canceledAt: '무작위',
  },
];

describe('CardList Component', () => {
  it('카드 컴포넌트 목록을 렌더링', () => {
    render(<CardList gatherings={mockGatherings} />);

    mockGatherings.forEach((gathering) => {
      expect(screen.getByText(gathering.location)).toBeInTheDocument();
    });
  });
});
