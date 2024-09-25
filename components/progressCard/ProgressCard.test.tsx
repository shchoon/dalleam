import { render, screen } from '@testing-library/react';
import ProgressCard from './ProgressCard';
import { Gathering } from '@/types/types';
import React from 'react';
import '@testing-library/jest-dom';

const mockGathering: Gathering = {
  teamId: 'FESI3-3',
  id: 3,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-25T09:00:00Z',
  registrationEnd: '2024-09-24T09:00:00Z',
  location: '홍대입구',
  participantCount: 4,
  capacity: 6,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

describe('ProgressCard', () => {
  it('gathering 데이터에 대한 기본 정보 렌더링 ', () => {
    render(<ProgressCard gathering={mockGathering} />);

    // 모임 제목이 제대로 렌더링되는지 확인
    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    // 장소와 시간, 날짜가 제대로 렌더링되는지 확인
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 25일')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
  });

  it('참가자가 5명 이상일 경우 개설 확정 텍스트 및 체크 아이콘 렌더링', () => {
    const updatedMockGathering = {
      ...mockGathering, // 기존 mockGathering 데이터를 복사
      participantCount: 5, // participantCount 값을 5로 수정(개설 확정 조건)
    };

    render(<ProgressCard gathering={updatedMockGathering} />);

    // 개설 확정 텍스트와 체크 아이콘이 렌더링되는지 확인
    expect(screen.getByText('개설 확정')).toBeInTheDocument();
  });

  it('참가자가 5명 미만일 경우 개설 확정 텍스트 보이지 않음을 렌더링', () => {
    const mockGatheringLessParticipants = { ...mockGathering, participantCount: 3 };
    render(<ProgressCard gathering={mockGatheringLessParticipants} />);

    expect(screen.queryByText('개설 확정')).toBeNull();
  });

  it('취소시간이 있는 경우 오버레이 텍스트 렌더링', () => {
    const canceledGathering = { ...mockGathering, canceledAt: '2024-09-20T09:00:00Z' };
    render(<ProgressCard gathering={canceledGathering} />);

    expect(screen.getByText('마감된 챌린지에요,')).toBeInTheDocument();
    expect(screen.getByText('다음 기회에 만나요 🙏')).toBeInTheDocument();
  });

  it('취소시간이 없는 경우 오버레이 텍스트가 렌더링되지 않음', () => {
    render(<ProgressCard gathering={mockGathering} />);

    expect(screen.queryByText('마감된 챌린지에요,')).toBeNull();
    expect(screen.queryByText('다음 기회에 만나요 🙏')).toBeNull();
  });
});
