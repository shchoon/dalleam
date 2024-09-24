import React from 'react';
import { render, screen } from '@testing-library/react';
import DeadlineBadge from './DeadlineBadge'; // 테스트할 컴포넌트
import '@testing-library/jest-dom'; // jest-dom 매처 사용

describe('DeadlineBadge Component', () => {
  it('마감 날짜와 24시간 이상 차이나지 않는 경우 N시간 남음 텍스트 표시', () => {
    const registrationEnd = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();
    render(<DeadlineBadge registrationEnd={registrationEnd} />);

    expect(screen.getByText('4시간 남음')).toBeInTheDocument();
  });

  it('마감 날짜와 24시간 이상 차이나는 경우 시간남음 N일 후 마감 텍스트 표시', () => {
    const registrationEnd = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    render(<DeadlineBadge registrationEnd={registrationEnd} />);

    expect(screen.getByText('1일 후 마감')).toBeInTheDocument();
  });
});
