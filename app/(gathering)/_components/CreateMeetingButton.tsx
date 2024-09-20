'use client';

import React, { Suspense, useEffect } from 'react';

import useUserStore from '@/stores/userStore';
import { useSearchParams } from 'next/navigation';
import LoginAlert from '@/components/loginAlert/LoginAlert';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';
import GatheringModal from './GatheringModal/GatheringsModal';

const CreateMeetingButton1 = () => {
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();

  const searchParams = useSearchParams();

  const isRedirect = searchParams.get('redirectedFrom');

  const { user } = useUserStore();

  useEffect(() => {
    if (isRedirect) {
      handleOpenModal();
    }
  }, []);

  return (
    <>
      <button
        className="text-sm font-semibold text-white bg-orange-600 rounded-xl w-100pxr h-40pxr md:w-115pxr md:h-44pxr hover:brightness-75"
        onClick={handleOpenModal}
      >
        모임 만들기
      </button>
      <Modal ref={modalRef}>
        {user ? (
          <GatheringModal onClose={handleCloseModal} />
        ) : (
          <LoginAlert onClose={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};

const CreateMeetingButton = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateMeetingButton1 />
    </Suspense>
  );
};
export default CreateMeetingButton;