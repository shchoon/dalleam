import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container';
import React from 'react';
import { Gathering } from '@/types/types';

const testGatheringData: Gathering = {
  teamId: 'FESI3-3',
  id: 104,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-25T09:00:00Z',
  registrationEnd: '2024-09-24T09:00:00Z',
  location: '홍대입구',
  participantCount: 5,
  capacity: 20,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

describe('Container Component', () => {
  it('Container 컴포넌트 기본 렌더링', () => {
    render(<Container gatheringDetails={testGatheringData} />);
    // Check if the main title and location are rendered
    expect(screen.getByText('워크케이션 모임')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
  });

  it('참여자 5명 이상인 경우 "개설확정", "chekedIcon" 노출', () => {
    render(<Container gatheringDetails={testGatheringData} />);

    expect(screen.queryByTestId('checkIsOpen')).toBeInTheDocument();
  });

  it('참여자 5명 미만인 경우 "개설확정", "chekedIcon" 노출 안됨', () => {
    const newTestGatheringData = { ...testGatheringData, participantCount: 4 };
    render(<Container gatheringDetails={newTestGatheringData} />);

    expect(screen.queryByTestId('checkIsOpen')).not.toBeInTheDocument();
  });
});
