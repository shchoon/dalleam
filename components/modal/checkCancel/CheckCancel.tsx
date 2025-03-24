'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/toast/ToastManager';
import Button from '@/components/Button';
import useGatheringId from '@/stores/useGatheringId';
import { JoinedGathering } from '@/lib/definition';
import {
  optimisticUpdateData,
  updateGathering,
  formatQueryData,
} from '@/components/myPage/myPageUtils';

import Delete from '/public/icons/delete.svg';

type Props = {
  closeModal: () => void;
};

export type QueryData = {
  pageParams: number[];
  pages: JoinedGathering[];
};

export default function CheckCancel({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { id, clearId } = useGatheringId();

  const onClickCancel = () => {
    clearId();
    closeModal();
  };

  const { mutate } = useMutation({
    onMutate: () => {
      // 낙관적 업데이트
      const preData = optimisticUpdateData(queryClient, id);
      closeModal();
      return preData;
    },
    mutationFn: async ({ limit, isCheck }: { limit: number; isCheck: boolean }) => {
      const res = await updateGathering(limit, isCheck, queryClient, id);
      return res;
    },
    onSuccess: (res) => {
      if (res.data) {
        toast('해당 모임 예약이 취소되었습니다.');
        closeModal();
      }
    },
    onError: (err, __, context) => {
      const preData = context?.preData as QueryData;
      // 낙관적 업데이트 실패시 롤백백
      formatQueryData(preData, queryClient);
    },
    onSettled: () => {
      clearId();
    },
  });

  return (
    <form
      className="w-343pxr p-6 rounded-xl flex flex-col gap-6 bg-white"
      onSubmit={(e) => {
        const previousData = queryClient.getQueryData(['gatheringJoined']) as { pages: [] };
        const limit = previousData.pages.length * 10;
        const isCheck = previousData.pages.flat().length % 10 === 0 ? false : true;
        e.preventDefault();
        mutate({ limit, isCheck });
      }}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">예약 취소</span>
        <Delete aria-label="deleteIcon" className="cursor-pointer" onClick={onClickCancel} />
      </div>
      <div className="text-base font-semibold text-gray-800">
        정말 해당 모임 예약을 취소하시겠습니까?
      </div>
      <div className="w-full flex gap-4">
        <Button
          onClick={onClickCancel}
          className="w-full flex justify-center items-center "
          fillState="empty"
          variant="orange"
        >
          취소
        </Button>
        <Button
          type="submit"
          className="w-full flex justify-center items-center "
          fillState="full"
          variant="gray"
        >
          확인
        </Button>
      </div>
    </form>
  );
}
