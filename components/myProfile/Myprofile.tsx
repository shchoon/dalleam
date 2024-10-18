'use client';
import React from 'react';
import useUserStore from '@/stores/userStore';
import Profile from '../profile/Profile';
import Modal from '../Modal';
import useModal from '@/hooks/useModal';
import ModifyProfile from '../modal/modifyProfile/ModifyProfile';

import Mobile from '/public/icons/profileBg/mobile.svg';
import Tablet from '/public/icons/profileBg/tablet.svg';
import Desktop from '/public/icons/profileBg/deskTop.svg';
import Edit from '/public/icons/edit.svg';

export default function MyProfile() {
  const { user } = useUserStore();
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <h1 className="w-full text-lg font-semibold text-gray-900 mb-4 md:mb-6">마이 페이지</h1>
      <div className="w-full h-182pxr md:h-176pxr border-2 border-gray-200 rounded-3xl mb-4 bg-white">
        <div className="relative h-66pxr bg-orange-400 rounded-t-[22px]">
          <span className="absolute top-4 left-26pxr md:top-5 md:left-25pxr text-lg font-semibold text-gray-900">
            내 프로필
          </span>
          <Mobile className="absolute left-113pxr top-3 md:hidden" />
          <Tablet className="absolute left-379pxr hidden md:block lg:hidden top-21pxr" />
          <Desktop className="absolute right-155pxr top-11pxr hidden lg:block md:hidden" />
          <Edit
            aria-label="edit"
            className="absolute top-4 right-22pxr md:top-18pxr md:right-25pxr lg:top-14pxr lg:right-6 cursor-pointer"
            onClick={() => {
              handleOpenModal();
            }}
          />
          <span className="absolute w-full h-2pxr bottom-7pxr bg-orange-600" />
          <div className="absolute flex justify-center items-center left-6 top-52pxr md:top-56pxr size-62pxr rounded-full bg-white">
            <Profile usedIn="myPage" image={user && user?.image} />
          </div>
        </div>
        <div className="pl-92pxr pt-15pxr flex flex-col gap-9pxr">
          <span className="text-base font-semibold text-gray-800">{user?.name}</span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-6pxr">
              <span className="text-sm font-medium text-gray-800">company.</span>
              <span className="text-sm font-normal text-gray-700">{user?.companyName}</span>
            </div>
            <div className="flex gap-6">
              <span className="text-sm font-medium text-gray-800">E-mail.</span>
              <span className="text-sm font-normal text-gray-700">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal ref={modalRef}>
        <ModifyProfile closeModal={handleCloseModal} />
      </Modal>
    </>
  );
}
