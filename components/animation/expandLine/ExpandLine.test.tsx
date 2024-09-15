import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ExpandLine from './ExpandLine';

describe('ExpandLine 컴포넌트 테스트', () => {
  it('참여자 < 정원 => line bg == "bg-orange-600"', () => {
    render(
      <div style={{ width: '200px' }}>
        <ExpandLine capacity={20} participant={10} />
      </div>,
    );
    const expandLine = screen.getByTestId('expandLine');
    expect(expandLine).toHaveClass('bg-orange-600');
  });

  it('참여자 == 정원 => line bg == "bg-orange-400"', () => {
    render(
      <div style={{ width: '200px' }}>
        <ExpandLine capacity={20} participant={20} />
      </div>,
    );
    const expandLine = screen.getByTestId('expandLine');
    expect(expandLine).toHaveClass('bg-orange-400');
  });
});
