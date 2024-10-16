import React from 'react';
import MyProfile from './Myprofile';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  it('프로필 수정 버튼 클릭에 따른 모달 노출 여부 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyProfile />
      </QueryClientProvider>,
    );

    const editBtn = screen.getByLabelText('edit');
    expect(editBtn).toBeInTheDocument();

    // 모달 열림
    fireEvent.click(editBtn);

    const editProfileModal = screen.getByText('프로필 수정하기');
    expect(editProfileModal).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('closeBtn');

    // 모달 닫힘
    fireEvent.click(closeBtn);

    expect(editProfileModal).not.toBeInTheDocument();
  });
});
