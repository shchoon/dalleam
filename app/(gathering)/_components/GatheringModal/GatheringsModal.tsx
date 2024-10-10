'use client';

import React from 'react';
import GatheringCalendar from './GatheringCalendar';
import Button from '@/components/Button';
import GatheringImg from './GatheringImg';
import GatheringService from './GatheringService';
import { SubmitHandler, useForm } from 'react-hook-form';
import GatheringLocation from './GatheringLocation';
import { gatheringSchema } from '@/constants/formSchema';
import CloseIcon from '@/public/icons/gathering/close.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postGathering } from '@/lib/data';
import { AxiosError } from 'axios';
import useFilterStore from '@/stores/filterStore';

export default function GatheringModal({ onClose }: { onClose: () => void }) {
  const { resetFilters } = useFilterStore();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<gatheringSchema>();
  const onSubmitHandler: SubmitHandler<gatheringSchema> = async (gathering) => {
    mutate.mutate({ gathering });
  };

  const mutate = useMutation({
    mutationFn: postGathering,
    onSuccess: (_, variables) => {
      const { gathering } = variables;
      queryClient.invalidateQueries({
        queryKey: [
          'gatherings',
          '지역 선택',
          '날짜 선택',
          '마감 임박',
          gathering.type === 'WORKATION' ? 'WORKATION' : 'DALLAEMFIT',
        ],
      });
      resetFilters();
      alert('모임이 생성되었습니다.');
      onClose();
    },
    onError: (error: Error) => {
      const defaultMsg = '알 수 없는 오류로 모임 생성에 실패하였습니다.';
      if (error instanceof AxiosError) {
        alert(error.response?.data.message ?? defaultMsg);
        return;
      }

      alert(defaultMsg);
    },
  });

  return (
    <div className="w-dvw h-full md:w-520pxr px-4 pt-6 pb-3 md:pb-6 md:px-6 bg-white overflow-auto flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full flex-grow flex flex-col gap-6"
      >
        <div className="w-full flex justify-between">
          <span className="text-lg font-semibold">모임만들기</span>
          <span className="cursor-pointer" onClick={() => onClose()}>
            <CloseIcon />
          </span>
        </div>
        <GatheringLocation control={control} />
        <GatheringImg control={control} />
        <GatheringService control={control} />
        <GatheringCalendar control={control} />
        {/* 버튼 영역 */}
        <div className="w-full mt-auto">
          <Button
            type="submit"
            className="w-full h-10 min-h-10"
            variant={isValid ? 'orange' : 'invalidate'}
            fillState="full"
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
