import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Person from '/public/icons/person.svg';
import Bye from '/public/icons/bye.svg';
import Stroke from '/public/icons/line.svg';

import Button from '../Button';
import ChipState from './ChipState';

import { Gathering } from '@/types/types';
import { formatDateTime, isDeadlinePassed } from '@/utils/gathering';
import useGatheringId from '@/stores/useGatheringId';
import useModalType from '@/stores/useModalType';

type Props = {
  normal: boolean;
  gathering: Gathering;
  openModal?: () => void;
  isReviewed?: boolean;
};

const Card = ({ normal, gathering, openModal, isReviewed }: Props) => {
  const { setId } = useGatheringId();
  const { setType } = useModalType();

  const { formattedDate, formattedTime } = formatDateTime(gathering.dateTime) ?? {
    formattedDate: '',
    formattedTime: '',
  };

  const isFinished = isDeadlinePassed(gathering.registrationEnd);

  // 개설확정 충족 조건
  const minParticipants = gathering.participantCount >= 5;

  return (
    <div className="relative flex flex-col gap-6 bg-white w-311pxr md:w-full md:max-w-948pxr">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-311pxr h-156pxr pt-1pxr pl-1pxr md:w-280pxr">
          <Link href="#">
            <Image src="/card-image.png" alt="Image" fill className="object-cover rounded-3xl" />
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-18pxr">
          <div className="flex flex-col gap-3">
            {!normal && (
              <div className="flex items-center gap-2">
                {isFinished ? (
                  <ChipState status="이용 완료" />
                ) : (
                  <>
                    <ChipState status="이용 예정" />
                    <ChipState status={minParticipants ? '개설 확정' : '개설 대기'} />
                  </>
                )}
              </div>
            )}
            <div className="flex flex-col items-start gap-6pxr">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{gathering.type}</span>
                <div className="flex items-center gap-2 w-76pxr h-7">
                  <span className="text-lg font-semibold text-gray-900">|</span>
                  <span className="text-sm font-medium text-gray-700">{gathering.location}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-sm text-gray-700">
                  <span className="font-medium" data-testid="format-date">
                    {formattedDate}
                  </span>
                  <span className="mx-1">·</span>
                  <span className="font-medium" data-testid="format-time">
                    {formattedTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Person className="size-4" />
                  <span className="text-sm font-medium text-gray-700">
                    {gathering.participantCount}/{gathering.capacity}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 버튼 컴포넌트 */}
          <>
            {!normal && !isFinished && (
              <Button
                size="sm"
                fillState="empty"
                variant="orange"
                onClick={() => {
                  setType('cancel');
                  openModal && openModal();
                  setId(gathering.id);
                }}
              >
                예약 취소하기
              </Button>
            )}
            {!normal && isFinished && (
              <Button
                size="sm"
                fillState="full"
                variant={`${isReviewed ? 'gray' : 'orange'}`}
                onClick={() => {
                  if (!isReviewed) {
                    setType('review');
                    openModal && openModal();
                    setId(gathering.id);
                  }
                }}
              >
                리뷰 작성하기
              </Button>
            )}
          </>
        </div>
      </div>
      <Stroke className="w-full" />

      {/* 오버레이 */}
      {gathering.canceledAt && (
        <div className="absolute top-0 left-0 h-[calc(100%-1.5rem)] px-91pxr py-81pxr flex items-center justify-center flex-col gap-6 w-full text-sm opacity-100 rounded-xl bg-black/80 md:flex-row md:h-full  md:rounded-3xl">
          <p className="h-10 text-sm font-medium text-center text-white w-132pxr">
            모집 취소된 모임이에요, 다음 기회에 만나요 🙏
          </p>
          <button className="flex items-center justify-center gap-2 px-3 py-6pxr rounded-xl bg-orange-50 md:flex md:absolute top-6 right-6 md:rounded-full md:size-12">
            <Bye />
            <span className="text-xs font-semibold text-orange-600 md:hidden">모임 보내주기</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
