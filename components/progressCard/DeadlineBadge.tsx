import React from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
import Alarm from '/public/icons/gathering/alarm.svg';

type Props = {
  registrationEnd: string;
  roundedTopRight?: boolean;
};

const DeadlineBadge = ({ registrationEnd, roundedTopRight = true }: Props) => {
  const now = new Date();

  const daysDiff = differenceInDays(registrationEnd, now);
  const hoursDiff = differenceInHours(registrationEnd, now);

  // 24시간 이상 남으면 일수로, 그렇지 않으면 시간으로 표시
  let remainingTime;
  if (hoursDiff <= 0) {
    remainingTime = '마감';
  } else if (hoursDiff <= 23) {
    remainingTime = `${hoursDiff}시간 남음`;
  } else {
    remainingTime = `${daysDiff}일 후 마감`;
  }

  return (
    <div
      className={`absolute top-0 right-0 flex items-center gap-1 py-1 pl-2 pr-4 bg-orange-600 rounded-bl-xl ${
        roundedTopRight ? 'rounded-tr-[22px]' : 'rounded-tr-none'
      }`}
    >
      <div className="pr-1 pt-5pxr pb-5pxr pl-5pxr">
        <Alarm />
      </div>
      <span className="text-xs font-medium text-white">{remainingTime}</span>
    </div>
  );
};

export default DeadlineBadge;
