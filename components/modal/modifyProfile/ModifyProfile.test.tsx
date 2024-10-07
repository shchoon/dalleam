import React from 'react';
import ModifyProfile from './ModifyProfile';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('ModifyProfile component test', () => {
  beforeAll(() => {
    // URL.createObjectURL을 mock하여 테스트할 수 있도록 설정, 절대 URL은 HTTP or HTTPS 로 시작해야 됨
    URL.createObjectURL = jest.fn(() => 'http://mocked-url');
  });
  const mockCloseModal = jest.fn();

  it('기본 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModifyProfile closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );
    const title = screen.getByText('프로필 수정하기');
    expect(title).toBeInTheDocument();

    const closeIcon = screen.getByLabelText('closeProfileEditModal');
    expect(closeIcon).toBeInTheDocument();

    const profileInput = screen.getByLabelText('profileImg');
    expect(profileInput).toBeInTheDocument();

    const companyNameInput = screen.getByLabelText('companyName');
    expect(companyNameInput).toBeInTheDocument();

    const cancelBtn = screen.getByLabelText('cancelBtn');
    expect(cancelBtn).toBeInTheDocument();

    const modifyBtn = screen.getByLabelText('modifyBtn');
    expect(modifyBtn).toBeInTheDocument();
  });

  it('프로필 수정 기능 & 버튼 활성화 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModifyProfile closeModal={mockCloseModal} />
      </QueryClientProvider>,
    );

    const modifyBtn = screen.getByLabelText('modifyBtn');

    // 임의의 이미지 파일 생성
    const testFile = new File(['test img'], 'testImg/png', { type: 'image/png' });
    const profileInput = screen.getByLabelText('profileImg');

    fireEvent.change(profileInput, { target: { files: [testFile] } });

    const previewImg = screen.getByLabelText('previewImg');
    expect(previewImg).toBeInTheDocument();

    expect(modifyBtn).toBeDisabled();
    // 화사이름 input
    const companyNameInput = screen.getByLabelText('companyName');

    fireEvent.change(companyNameInput, { target: { value: 'test' } });

    expect(modifyBtn).not.toBeDisabled();
  });
});
