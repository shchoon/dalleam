'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Close from '/public/icons/close.svg';

type Props = {
  onClose: () => void;
  gatheringId?: number; // gatheringId는 선택적 props로 설정
};

const LoginAlert = ({ onClose, gatheringId }: Props) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onClose();
    // gatheringId가 있으면 해당 값을 사용, 없으면 'alert'를 사용
    const redirectTo = gatheringId
      ? `/login?redirectedFrom=${gatheringId}`
      : '/login?redirectedFrom=alert';
    router.push(redirectTo);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg">
      <Close className="self-end cursor-pointer text-gray-900" onClick={() => onClose()} />
      <div className="text-base font-medium text-center text-gray-900 w-252pxr md:w-402pxr">
        로그인이 필요해요
      </div>
      <Button
        className="self-center md:self-end !w-120pxr"
        fillState="full"
        onClick={handleLoginRedirect}
      >
        확인
      </Button>
    </div>
  );
};

export default LoginAlert;
