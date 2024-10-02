'use client';

import React, { useEffect } from 'react';

// import GatheringModal from '@/app/reviews/_components/GatheringsModal';
import useUserStore from '@/stores/userStore';
import { useSearchParams } from 'next/navigation';

import LoginAlert from '@/components/loginAlert/LoginAlert';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';

const CreateMeetingButton = () => {
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
      {/* <Modal ref={modalRef}>
        {user ? <GatheringModal /> : <LoginAlert onClose={handleCloseModal} />}
      </Modal> */}
    </>
  );
};

export default CreateMeetingButton;
