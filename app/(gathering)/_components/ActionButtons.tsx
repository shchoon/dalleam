'use client';

import React from 'react';
import axios from 'axios';

import Button from '@/components/Button';
import LoginAlert from '@/components/loginAlert/LoginAlert';
import Modal from '@/components/Modal';

import { getInstance } from '@/utils/axios';

import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import useUserStore from '@/stores/userStore';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/toast/ToastManager';

type Props = {
  isFull: boolean;
  hostId: number;
  gatheringId: number;
  joinedGatheringIds: number[];
};

const ActionButtons = ({ isFull, hostId, gatheringId, joinedGatheringIds }: Props) => {
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();
  const { user } = useUserStore();
  const router = useRouter();

  const userId = user?.id as number;
  const isJoined = joinedGatheringIds.includes(userId);

  const { mutate: joinGathering, isPending: isJoining } = useMutation({
    mutationFn: async ({ gatheringId }: { gatheringId: number }) => {
      const response = await getInstance().post(`gatherings/${gatheringId}/join`);
      return response.data;
    },
    onSuccess: () => {
      toast('모임 참여 완료');
    },
  });

  const { mutate: cancelParticipation, isPending: isCanceling } = useMutation({
    mutationFn: async ({ gatheringId }: { gatheringId: number }) => {
      const response = await getInstance().delete(`gatherings/${gatheringId}/leave`);
      return response.data;
    },
    onSuccess: () => {
      toast('참여 취소 완료');
    },
  });

  const { mutate: cancelGathering, isPending: isGatheringCanceling } = useMutation({
    mutationFn: async ({ gatheringId }: { gatheringId: number }) => {
      const response = await getInstance().put(`gatherings/${gatheringId}/cancel`);
      return response.data;
    },
    onSuccess: () => {
      toast('모임 취소 완료');
      router.back();
    },
  });

  const handleJoin = () => {
    if (!user) {
      handleOpenModal();
    } else {
      joinGathering({ gatheringId });
    }
  };

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/gatherings/${gatheringId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast('링크가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  let content;
  let text = '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요';
  if (user && hostId === userId) {
    text = '모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요';
    content = (
      <div className="space-x-2 flex">
        <Button
          className="text-sm  sm:w-1/2 md:w-[110px] h-[44px]"
          fillState="full"
          onClick={() => cancelGathering({ gatheringId })}
        >
          {isGatheringCanceling ? '모임 취소중..' : '모임 취소하기'}
        </Button>
        <Button
          className="text-sm sm:w-1/2 md:w-[110px] h-[44px]"
          fillState="empty"
          onClick={handleShare}
        >
          공유하기
        </Button>
      </div>
    );
  } else if (!isJoined && !isFull) {
    content = (
      <Button className="text-sm w-[115px] h-[44px]" fillState="full" onClick={handleJoin}>
        {isJoining ? '참여 요청중..' : '참여하기'}
      </Button>
    );
  } else if (user && isJoined) {
    content = (
      <Button
        className="text-sm w-[115px] h-[44px]"
        fillState="empty"
        onClick={() => cancelParticipation({ gatheringId })}
      >
        {isCanceling ? '참여 취소중..' : '참여 취소하기'}
      </Button>
    );
  } else if (isFull) {
    content = (
      <Button
        className="text-sm w-[115px] h-[44px] disabled:cursor-not-allowed"
        variant="gray"
        fillState="full"
        disabled={true}
      >
        참여하기
      </Button>
    );
  }

  return (
    <>
      <div className="z-10 flex justify-center w-full px-4 bg-white border-t-2 border-gray-900 border-solid pt-20pxr pb-20pxr md:px-6">
        <div
          className={`flex ${hostId === userId ? 'flex-col gap-10pxr md:flex-row md:0' : ''} justify-between w-full max-w-996pxr`}
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">
              더 건강한 나와 팀을 위한 프로그램 🏃‍️️
            </p>
            <p className="text-xs font-medium text-left text-gray-700 w-[178px] md:w-full">
              {text}
            </p>
          </div>
          {content}
        </div>
      </div>
      <Modal ref={modalRef}>
        <LoginAlert onClose={handleCloseModal} gatheringId={gatheringId} />
      </Modal>
    </>
  );
};

export default ActionButtons;
