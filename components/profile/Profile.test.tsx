import React from 'react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { render, screen } from '@testing-library/react';

describe('Profile 컴포넌트 테스트', () => {
  it('image가 null이며 navbar에서 사용되는 경우', () => {
    render(<Profile usedIn="navbar" image={null} />);

    expect(screen.getByTestId('defaultProfile')).toBeInTheDocument();
  });

  it('image가 null이 아니며 navbar에서 사용되는 경우', () => {
    render(<Profile usedIn="navbar" image={'https://test'} />);

    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });

  it('image가 null이며 container에서 사용되는 경우', () => {
    render(<Profile usedIn="container" image={null} />);

    expect(screen.getByTestId('defaultProfile')).toBeInTheDocument();
  });

  it('image가 null이 아니며 container에서 사용되는 경우', () => {
    render(<Profile usedIn="container" image={'https://test'} />);

    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });

  it('image가 null이며 myPage에서 사용되는 경우', () => {
    render(<Profile usedIn="myPage" image={null} />);

    expect(screen.getByTestId('myPageDefaultProfile')).toBeInTheDocument();
  });

  it('image가 null이 아니며 myPage에서 사용되는 경우', () => {
    render(<Profile usedIn="myPage" image={'https://test'} />);

    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });
});
