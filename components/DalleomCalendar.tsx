import { convertDate } from '@/utils/convertDate';
import React, { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export type timeSlotProps = { time: string; date: string }; // date가 ISO 8601 문자열로 변경

type props = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  updateTimeSlots?: (newDate: Date) => void;
};

export default function DalleomCalendar({ date, setDate, updateTimeSlots }: props) {
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
  return (
    <div className="flex flex-col items-center self-stretch rounded-xl pb-4 px-10pxr pt-10pxr border-[1px] border-gray-200">
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
    </div>
  );
}
