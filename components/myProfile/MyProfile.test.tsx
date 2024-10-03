import React from 'react';
import MyProfile from './Myprofile';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sub } from 'date-fns/fp';
// import RootLayout from '../../app/layout'

const mockUserStore = {
  user: {
    name: 'cho',
    companyName: 'choCom',
    email: '1234@gmail.com',
  },
};

jest.mock('@/stores/userStore', () => () => mockUserStore);

const queryClient = new QueryClient();

describe('myProfile component test', () => {
  // 모달이 들어갈 DOM 생성
  beforeEach(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'global-modal');
    document.body.appendChild(div);
  });

  it('기본 렌더링 테스트', () => {
    render(<MyProfile />);

    const name = screen.getByText('cho');
    const companyName = screen.getByText('choCom');
    const email = screen.getByText('1234@gmail.com');

    expect(name).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('프로필 수정 버큰 클릭 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyProfile />
      </QueryClientProvider>,
    );

    const editBtn = screen.getByLabelText('edit');
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);

    const editProfileModal = screen.getByLabelText('editProfileModal');
    expect(editProfileModal).toBeInTheDocument();

    const closeProfileEditModal = screen.getByLabelText('closeProfileEditModal');

    fireEvent.click(closeProfileEditModal);

    expect(editProfileModal).not.toBeInTheDocument();
  });

  it.only('프로필 수정 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyProfile />
      </QueryClientProvider>,
    );

    const editBtn = screen.getByLabelText('edit');
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);

    const editProfileModal = screen.getByLabelText('editProfileModal');
    expect(editProfileModal).toBeInTheDocument();

    const submitBtn = screen.getByText('수정하기');

    const imgInput = screen.getByLabelText('profileImg');

    expect(submitBtn).toBeInTheDocument();
    expect(imgInput).toBeInTheDocument();

    const input = screen.getByPlaceholderText('회사명을 입력해주세요.');
    expect(input).toBeInTheDocument();
  });
});
