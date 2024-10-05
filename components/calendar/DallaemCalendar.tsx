'use client';

import { convertDate } from '@/utils/convertDate';
import React, { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import useFilterStore from '@/stores/filterStore';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export type timeSlotProps = { time: string; date: string }; // date가 ISO 8601 문자열로 변경

type props = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  updateTimeSlots?: (newDate: Date) => void;
  onClose?: () => void;
  onUpdate?: () => void;
  showButtons?: boolean; // 버튼 표시 여부를 제어하는 props
};

export default function DallaemCalendar({
  date,
  setDate,
  updateTimeSlots,
  showButtons,
  onClose,
  onUpdate,
}: props) {
  const { setDate: resetDate } = useFilterStore();

  const handleDateChange = (newDate: Value): void => {
    if (newDate instanceof Date) {
      const updatedDate = convertDate(newDate);
      setDate(updatedDate);
      updateTimeSlots && updateTimeSlots(new Date(updatedDate));
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const calendarDate = new Date(date);
    calendarDate.setHours(0, 0, 0, 0);
    return calendarDate < todayDate;
  };

  const handleReset = () => {
    if (onClose) onClose();
    {
      resetDate('날짜 선택');
    }
  };

  const handleCheck = () => {
    if (onClose && onUpdate) {
      onClose();
      onUpdate();
    }
  };
  return (
    <div
      className={clsx(
        'flex flex-col items-center self-stretch rounded-xl pb-4 px-10pxr pt-10pxr',
        showButtons ? '' : 'border-[1px] border-gray-200 p-0pxr', // 버튼이 없으면 border를 추가
      )}
    >
      <Calendar
        locale="en-US"
        onChange={handleDateChange}
        value={date}
        tileDisabled={tileDisabled}
        nextLabel="▶"
        prevLabel="◀"
        next2Label={null}
        prev2Label={null}
        className="custom-calendar"
      />

      {/* showButtons가 true일 때만 버튼을 표시 */}
      {showButtons && (
        <div className="flex gap-3 justify-center w-248pxr">
          <button
            className="w-118pxr h-10 rounded-xl bg-white text-orange-600 border border-solid border-orange-600"
            onClick={handleReset}
          >
            초기화
          </button>
          <button
            className="w-118pxr h-10 rounded-xl text-white bg-orange-600"
            onClick={handleCheck}
          >
            적용
          </button>
        </div>
      )}
    </div>
  );
}
