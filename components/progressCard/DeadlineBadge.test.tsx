import React from 'react';
import { render, screen } from '@testing-library/react';
import DeadlineBadge from './DeadlineBadge';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';

describe('DeadlineBadge Component', () => {
  beforeAll(() => {
    // 테스트를 위한 고정된 날짜 설정
    MockDate.set('2024-09-25T09:29:00.000Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('마감 날짜와 24시간 이상 차이나지 않는 경우 N시간 남음 텍스트 표시', () => {
    // 5시간 후 마감 설정
    const registrationEnd = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();
    console.log('5시간 후 마감 registrationEnd:', registrationEnd); // 로그 추가
    render(<DeadlineBadge registrationEnd={registrationEnd} />);

    expect(screen.getByText('5시간 남음')).toBeInTheDocument();
  });

  it('마감 날짜와 24시간 이상 차이나는 경우 N일 후 마감 텍스트 표시', () => {
    const registrationEnd = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
    render(<DeadlineBadge registrationEnd={registrationEnd} />);

    expect(screen.getByText('2일 후 마감')).toBeInTheDocument();
  });

  it('마감 시간이 지났을 경우 마감 텍스트 표시', () => {
    const registrationEnd = new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toISOString();
    render(<DeadlineBadge registrationEnd={registrationEnd} />);

    expect(screen.getByText('마감')).toBeInTheDocument();
  });
});
