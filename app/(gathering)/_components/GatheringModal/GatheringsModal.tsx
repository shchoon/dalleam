'use client';

import React from 'react';
import DalleomCalendar from './GatheringCalendar';
import Button from '@/components/Button';
import GatheringImg from './GatheringImg';
import GatheringService from './GatheringService';
import { useForm } from 'react-hook-form';
import GatheringLocation from './GatheringLocation';
import { gatheringSchema } from '@/constants/formSchema';
import { getInstance } from '@/utils/axios';

import CloseIcon from '@/public/icons/close.svg';

export default function GatheringModal({ onClose }: { onClose: () => void }) {
  const fetcher = getInstance();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<gatheringSchema>();
  const onSubmitHandler = async (gathering: gatheringSchema) => {
    console.log('gathering = ', gathering);
    const result = await fetcher.post('/gatherings', gathering, {
      headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
    });
    console.log('result = ', result);
  };

  return (
    <div className="w-full self-stretch md:p-4 lg:p-0 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="md:max-w-520pxr w-full self-stretch flex flex-col p-6 items-start rounded-xl bg-white gap-2 lg:gap-4"
      >
        <div className="w-full flex justify-between mb-3">
          <span className="text-base font-semibold">모임만들기</span>
          <span className="cursor-pointer" onClick={() => onClose()}>
            <CloseIcon />
          </span>
        </div>
        <GatheringLocation control={control} />
        <GatheringImg control={control} />
        <GatheringService control={control} />
        <DalleomCalendar control={control} />
        <Button
          type="submit"
          className="w-full h-10"
          variant={isValid ? 'orange' : 'invalidate'}
          fillState="full"
        >
          확인
        </Button>
      </form>
    </div>
  );
}
