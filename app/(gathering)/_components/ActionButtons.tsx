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
    onSuccess: (data) => {
      alert('모임 참여 완료');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    },
  });

  const { mutate: cancelParticipation, isPending: isCanceling } = useMutation({
    mutationFn: async ({ gatheringId }: { gatheringId: number }) => {
      const response = await getInstance().delete(`gatherings/${gatheringId}/leave`);
      return response.data;
    },
    onSuccess: (data) => {
      alert('참여 취소 완료');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) alert(error.response?.data.message);
    },
  });

  const { mutate: cancelGathering, isPending: isGatheringCanceling } = useMutation({
    mutationFn: async ({ gatheringId }: { gatheringId: number }) => {
      const response = await getInstance().put(`gatherings/${gatheringId}/cancel`);
      return response.data;
    },
    onSuccess: (data) => {
      alert('모임 취소 완료');
      router.back();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) alert(error.response?.data.message);
    },
  });

  const handleJoin = () => {
    if (!user) {
      handleOpenModal();
    } else {
      joinGathering({ gatheringId });
    }
  };

  let content;
  if (user && hostId === userId) {
    content = (
      <div className="space-x-2">
        <Button
          className="text-sm !w-110pxr !h-44pxr"
          fillState="full"
          onClick={() => cancelGathering({ gatheringId })}
        >
          {isGatheringCanceling ? '모임 취소중..' : '모임 취소하기'}
        </Button>
        <Button className="text-sm !w-110pxr !h-44pxr" fillState="empty">
          공유하기
        </Button>
      </div>
    );
  } else if (!isJoined && !isFull) {
    content = (
      <Button className="text-sm !w-110pxr !h-44pxr" fillState="full" onClick={handleJoin}>
        {isJoining ? '참여 요청중..' : '참여하기'}
      </Button>
    );
  } else if (user && isJoined) {
    content = (
      <Button
        className="text-sm !w-110pxr !h-44pxr"
        fillState="empty"
        onClick={() => cancelParticipation({ gatheringId })}
      >
        {isCanceling ? '참여 취소중..' : '참여 취소하기'}
      </Button>
    );
  } else if (isFull) {
    content = (
      <Button
        className="text-sm !w-110pxr !h-44pxr disabled:cursor-not-allowed"
        variant="gray"
        fillState="full"
        disabled={true}
      >
        참여하기
      </Button>
    );
  }

  return (
    <div>
      {content}
      <Modal ref={modalRef}>
        <LoginAlert onClose={handleCloseModal} gatheringId={gatheringId} />
      </Modal>
    </div>
  );
};

export default ActionButtons;
