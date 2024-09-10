import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { Gathering } from '@/types/types';
import { formatDateTime, isDeadlinePassed } from '@/utils/gathering';
import React from 'react';

const mockGathering: Gathering = {
  teamId: 'FESI3-3',
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
  canceledAt: null,
};

jest.mock('@/utils/gathering', () => ({
  formatDateTime: jest.fn(),
  isDeadlinePassed: jest.fn(),
}));

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('카드 컴포넌트 렌더링', () => {
    (formatDateTime as jest.Mock).mockReturnValue({
      formattedDate: '9월 10일',
      formattedTime: '08:40',
    });

    (isDeadlinePassed as jest.Mock).mockReturnValue(false);

    render(<Card normal={true} gathering={mockGathering} />);

    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 10일')).toBeInTheDocument();
    expect(screen.getByText('08:40')).toBeInTheDocument();
    expect(screen.getByText('4/6')).toBeInTheDocument();
  });

  it('날짜와 시간이 null일 때 공백으로 처리되는지 테스트', () => {
    (formatDateTime as jest.Mock).mockReturnValue(null);
    (isDeadlinePassed as jest.Mock).mockReturnValue(false);

    render(<Card normal={false} gathering={mockGathering} />);

    // 구분 기호가 표시되는지 확인
    expect(screen.getByText('·')).toBeInTheDocument();

    // 날짜와 시간이 null일 때 공백으로 처리되는지 테스트
    const dateElement = screen.getByTestId('format-date');
    const timeElement = screen.getByTestId('format-time');

    expect(dateElement).toHaveTextContent(''); // formattedDate가 공백인지 확인
    expect(timeElement).toHaveTextContent(''); // formattedTime이 공백인지 확인
  });

  it('카드 컴포넌트 "이용 완료" 상태 렌더링', () => {
    (formatDateTime as jest.Mock).mockReturnValue({
      formattedDate: '9월 10일',
      formattedTime: '08:40',
    });

    (isDeadlinePassed as jest.Mock).mockReturnValue(true);

    render(<Card normal={false} gathering={mockGathering} />);

    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 10일')).toBeInTheDocument();
    expect(screen.getByText('08:40')).toBeInTheDocument();
    expect(screen.getByText('4/6')).toBeInTheDocument();

    expect(screen.getByText('이용 완료')).toBeInTheDocument();
    expect(screen.getByText('리뷰 작성하기')).toBeInTheDocument();
  });

  it('카드 컴포넌트 "이용 예정" 및 "개설 대기" 상태 렌더링', () => {
    (formatDateTime as jest.Mock).mockReturnValue({
      formattedDate: '9월 10일',
      formattedTime: '08:40',
    });

    (isDeadlinePassed as jest.Mock).mockReturnValue(false);

    render(<Card normal={false} gathering={mockGathering} />);

    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 10일')).toBeInTheDocument();
    expect(screen.getByText('08:40')).toBeInTheDocument();
    expect(screen.getByText('4/6')).toBeInTheDocument();

    expect(screen.getByText('이용 예정')).toBeInTheDocument();
    expect(screen.getByText('개설 대기')).toBeInTheDocument();
    expect(screen.getByText('예약 취소하기')).toBeInTheDocument();
  });

  it('카드 컴포넌트 "이용 예정" 및 "개설 확정" 상태 렌더링', () => {
    (formatDateTime as jest.Mock).mockReturnValue({
      formattedDate: '9월 10일',
      formattedTime: '08:40',
    });

    const updatedMockGathering = {
      ...mockGathering, // 기존 mockGathering 데이터를 복사
      participantCount: 5, // participantCount 값을 5로 수정(개설 확정 조건)
    };

    (isDeadlinePassed as jest.Mock).mockReturnValue(false);

    render(<Card normal={false} gathering={updatedMockGathering} />);

    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 10일')).toBeInTheDocument();
    expect(screen.getByText('08:40')).toBeInTheDocument();
    expect(screen.getByText('5/6')).toBeInTheDocument();

    expect(screen.getByText('이용 예정')).toBeInTheDocument();
    expect(screen.getByText('개설 확정')).toBeInTheDocument();
    expect(screen.getByText('예약 취소하기')).toBeInTheDocument();
  });

  it('카드 컴포넌트 예약한 모임이 취소 됐을 경우 렌더링', () => {
    (formatDateTime as jest.Mock).mockReturnValue({
      formattedDate: '9월 10일',
      formattedTime: '08:40',
    });

    const updatedMockGathering = {
      ...mockGathering, // 기존 mockGathering 데이터를 복사
      participantCount: 5, // participantCount 값을 5로 수정(개설 확정 조건)
      canceledAt: '2024-09-18T07:00:00Z', // 취소인 경우 => canceledAt !== null
    };

    (isDeadlinePassed as jest.Mock).mockReturnValue(false);

    render(<Card normal={false} gathering={updatedMockGathering} />);

    expect(screen.getByText('WORKATION')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
    expect(screen.getByText('9월 10일')).toBeInTheDocument();
    expect(screen.getByText('08:40')).toBeInTheDocument();
    expect(screen.getByText('5/6')).toBeInTheDocument();

    expect(screen.getByText('모집 취소된 모임이에요, 다음 기회에 만나요 🙏')).toBeInTheDocument();
    expect(screen.getByText('개설 확정')).toBeInTheDocument();
    expect(screen.getByText('예약 취소하기')).toBeInTheDocument();
  });
});
