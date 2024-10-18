'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Close from '/public/icons/gathering/close.svg';

type Props = {
  onClose: () => void;
  gatheringId?: number;
};

const LoginAlert = ({ onClose, gatheringId }: Props) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onClose();
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
        className="self-center md:self-end w-[120px]"
        fillState="full"
        onClick={handleLoginRedirect}
      >
        확인
      </Button>
    </div>
  );
};

export default LoginAlert;
