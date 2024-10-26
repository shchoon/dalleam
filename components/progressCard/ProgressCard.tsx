import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { differenceInHours } from 'date-fns';

import Person from '/public/icons/gathering/person.svg';
import Check from '/public/icons/gathering/ic_check.svg';
import Arrow from '/public/icons/gathering/arrow_right.svg';
import Bye from '/public/icons/gathering/bye.svg';

import { Gathering } from '@/lib/definition';
import ExpandLine from '../animation/expandLine/ExpandLine';
import Saved from '../animation/saved/Saved';
import { formatDateTime } from '@/utils/gathering';
import DeadlineBadge from './DeadlineBadge';

type Props = {
  gathering: Gathering;
  priority: boolean;
};

const ProgressCard = ({ gathering, priority }: Props) => {
  const now = new Date();
  const hoursDiff = differenceInHours(gathering.registrationEnd, now);

  const { formattedDate, formattedTime } = formatDateTime(gathering.dateTime) ?? {
    formattedDate: '',
    formattedTime: '',
  };
  // 개설확정 충족 조건
  const minParticipants = gathering.participantCount >= 5;

  return (
    <div className="relative z-10 overflow-hidden border-2 border-gray-200 border-solid shadow-progressBar-shadow w-343pxr h-320pxr rounded-3xl md:h-auto md:w-699pxr lg:w-1000pxr">
      <div className="flex flex-col h-full w-343pxr md:flex-row md:w-full">
        <Link href={`/gatherings/${gathering.id}`}>
          <div className="relative h-156pxr w-343pxr md:w-280pxr ">
            <Image
              src={gathering.image || '/card-image2.png'}
              alt={`참여할 수 있는 ${gathering.type} 모임`}
              fill
              className="object-cover rounded-t-3xl md:rounded-t-none"
              priority={priority}
            />
            <DeadlineBadge registrationEnd={gathering.registrationEnd} roundedTopRight={false} />
          </div>
        </Link>

        {/* mobile: bottom md: right*/}
        <div className="flex flex-col mt-4 md:h-156pxr md:grow md:mt-0">
          {/* date, time, title, location */}
          <div className="flex items-center justify-between px-4 w-343pxr h-60pxr md:pt-4 md:pr-4 md:pb-21pxr md:pl-6 md:h-97pxr md:w-full">
            <div className="flex flex-col items-center gap-2">
              <Link href={`/gatherings/${gathering.id}`}>
                <div className="flex w-full gap-2">
                  <span className="text-lg font-semibold text-gray-800">{gathering.type}</span>
                  <div className="w-75pxr h-28pxr">
                    <span className="text-lg font-semibold text-gray-900 w-7pxr h-7 mr-7pxr">
                      |
                    </span>
                    <span className="text-sm font-medium text-gray-700 w-61pxr h-20pxr">
                      {gathering.location}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex self-start gap-2">
                <span className="px-2 text-sm font-medium text-white bg-gray-900 rounded-[4px] py-2pxr">
                  {formattedDate}
                </span>
                <span className="px-2 text-sm font-medium text-orange-600 bg-gray-900 rounded-[4px] py-2pxr">
                  {formattedTime}
                </span>
              </div>
            </div>

            <Saved gatheringId={gathering.id} />
          </div>
          {/* progressBar */}
          <div className="flex items-center gap-6 px-4 pt-2 pb-4 mt-5 w-341pxr h-60pxr md:mt-0 md:px-6 md:w-full">
            <div className="flex flex-col gap-2 grow">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Person className="size-4" />
                  <span className="text-sm font-medium text-gray-700">
                    {gathering.participantCount}/{gathering.capacity}
                  </span>
                </div>
                {minParticipants && (
                  <div className="flex items-center gap-1">
                    <Check />
                    <span className="text-sm font-medium text-orange-500">개설 확정</span>
                  </div>
                )}
              </div>
              {/* ProgrssBar */}
              <ExpandLine capacity={gathering.capacity} participant={gathering.participantCount} />
            </div>
            <Link href={`/gatherings/${gathering.id}`}>
              <div className="flex items-center self-end gap-2">
                <span className="text-base font-semibold text-orange-600">join now</span>
                <Arrow />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* 오버레이 */}
      {hoursDiff <= 0 && (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-6 text-sm opacity-100 rounded-xl bg-black/80 md:flex-row md:h-full md:rounded-3xl">
          <div>
            <p className="text-sm font-medium text-center text-white">마감된 챌린지에요,</p>
            <p className="text-sm font-medium text-center text-white">다음 기회에 만나요 🙏</p>
          </div>
          <button className="flex items-center justify-center px-3 gap-2pxr py-6pxr rounded-xl bg-orange-50 md:flex md:absolute top-6 right-6 md:rounded-full md:size-12">
            <Bye />
            <span className="text-xs font-semibold text-orange-600 md:hidden">모임 보내주기</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
