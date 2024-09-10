import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChipState from './ChipState';
import React from 'react';

describe('ChipState Component', () => {
  it('status props가 제공되지 않았을때 기본 "이용 예정" 상태 ChipState 컴포넌트 렌더링 ', () => {
    const { container } = render(<ChipState />);
    expect(container.firstChild).toHaveClass('bg-orange-100 text-orange-600');
  });

  it('"이용 완료" 상태 ChipState 컴포넌트 렌더링', () => {
    const { container } = render(<ChipState status="이용 완료" />);
    expect(container.firstChild).toHaveClass('bg-gray-200 text-gray-500');
  });

  it('"개설 확정" 상태 ChipState 컴포넌트 렌더링', () => {
    const { container } = render(<ChipState status="개설 확정" />);
    expect(container.firstChild).toHaveClass(
      'bg-white box-border border border-solid border-orange-100 text-orange-500 gap-1',
    );
  });

  it('"개설 확정" 상태일 경우 Check icon 렌더링', () => {
    const { container } = render(<ChipState status="개설 확정" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('"개설 대기" 상태 ChipState 컴포넌트 렌더링', () => {
    const { container } = render(<ChipState status="개설 대기" />);
    expect(container.firstChild).toHaveClass(
      'bg-white border border-solid border-gray-200 text-gray-500',
    );
  });

  it('"개설 확정" 상태가 아닌 "이용 예정" 상태일 경우 Check icon 렌더링 되지 않음', () => {
    const { container } = render(<ChipState status="이용 예정" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('"개설 확정" 상태가 아닌 "이용 완료" 상태일 경우 Check icon 렌더링 되지 않음', () => {
    const { container } = render(<ChipState status="이용 완료" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('"개설 확정" 상태가 아닌 "개설 대기" 상태일 경우 Check icon 렌더링 되지 않음', () => {
    const { container } = render(<ChipState status="개설 대기" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
